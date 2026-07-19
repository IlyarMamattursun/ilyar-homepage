import { useState, useRef, useCallback, useEffect } from "react";
import Terminal from "./components/Terminal";
import ChinaMap from "./components/ChinaMap";
import { StoryCards, Interests, PhotoGallery, Contact } from "./components/Sections";
import { personal, places } from "./data/content";

/* ====== Particle Background ====== */
function Particles() {
  useEffect(() => {
    const c = document.getElementById("particles");
    if (!c) return;
    const ctx = c.getContext("2d");
    let id;
    const pts = [];

    function resize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      pts.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.3 + 0.05,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = c.width;
        if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height;
        if (p.y > c.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,190,240,${p.o})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(130,170,230,${0.04 * (1 - d / 130)})`;
            ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="particles" />;
}

/* ====== Nav ====== */
function Nav() {
  const links = ["$", "map", "quests", "modules", "photos", "ssh"];
  const hrefs = ["#terminal", "#journey", "#stories", "#interests", "#gallery", "#contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06060b]/75 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-accent-green hover:text-white transition-colors">
          ~/ilyar
        </a>
        <div className="hidden md:flex gap-0">
          {links.map((label, i) => (
            <a
              key={label}
              href={hrefs[i]}
              className="px-3 py-1.5 text-xs font-mono text-text-dim hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <span className="md:hidden text-text-dim text-xs font-mono">↓</span>
      </div>
    </nav>
  );
}

/* ====== Scroll Hint ====== */
function ScrollHint() {
  return (
    <div className="flex flex-col items-center gap-3 mt-12 scroll-hint">
      <p className="text-text-dim font-mono text-xs tracking-[0.3em]">SCROLL OR TYPE</p>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" className="text-text-dim">
        <path d="M8 3v10M4 9l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ====== CMD Chips ====== */
function CommandChips({ onCommand }) {
  const cmds = ["whoami", "journey", "drink", "tennis", "music", "contact"];
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {cmds.map((cmd) => (
        <button key={cmd} className="cmd-chip" onClick={() => onCommand(cmd)}>
          $ {cmd}
        </button>
      ))}
    </div>
  );
}

/* ====== Journey Map Section ====== */
function JourneyMapSection({ onCityClick, selectedPlace }) {
  return (
    <section id="journey" className="py-32 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="font-mono text-xs tracking-[0.3em] text-text-dim mb-3">/PLACES</p>
        <h2 className="font-serif text-5xl md:text-6xl text-white mb-3">The Migration</h2>
        <p className="font-mono text-sm text-text-dim">喀什 → 乌鲁木齐 → 上海 → 南京 → ？</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Map */}
        <div className="flex-1 w-full bg-[#0a0b12] rounded-2xl border border-white/[0.06] p-4 md:p-8">
          <ChinaMap activeCity={selectedPlace?.id} onCityClick={onCityClick} />
        </div>

        {/* Detail Panel */}
        <div className="lg:w-72 shrink-0 w-full">
          {selectedPlace ? (
            <div className="bg-[#0d0f17] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedPlace.emoji}</span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: selectedPlace.color, boxShadow: `0 0 8px ${selectedPlace.color}` }} />
                  <span className="text-white font-bold">{selectedPlace.name}</span>
                </div>
                <button onClick={() => onCityClick(null)} className="text-text-dim hover:text-white font-mono text-lg">×</button>
              </div>
              <p className="text-text-dim font-mono text-xs mb-3">{selectedPlace.period}</p>
              <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line mb-4">
                {selectedPlace.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedPlace.keywords.map((kw) => (
                  <span key={kw} className="px-2.5 py-1 text-xs rounded-full bg-white/[0.04] border border-white/[0.06] text-text-dim">{kw}</span>
                ))}
              </div>
              {selectedPlace.extras && (
                <div className="space-y-2">
                  {selectedPlace.extras.map((extra, j) => (
                    <div key={j} className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]">
                      <p className="text-text-dim font-mono text-xs mb-1">{extra.label}</p>
                      <p className="text-text-muted text-xs leading-relaxed">{extra.story}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#0d0f17] border border-white/[0.06] rounded-2xl p-6 text-center">
              <p className="text-text-dim font-mono text-xs mb-4">Select a city</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: "kashgar", emoji: "🏔️", name: "喀什", color: "#f5a623" },
                  { id: "urumqi", emoji: "🏫", name: "乌鲁木齐", color: "#f0883e" },
                  { id: "shanghai", emoji: "🌆", name: "上海", color: "#4dabf7" },
                  { id: "nanjing", emoji: "🎓", name: "南京", color: "#a78bfa" },
                ].map((c) => {
                  const place = places.find((p) => p.id === c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => onCityClick(place)}
                      className="px-3 py-1.5 text-xs font-mono rounded-full border transition-all hover:scale-105"
                      style={{ borderColor: `${c.color}30`, color: c.color, background: `${c.color}08` }}
                    >
                      {c.emoji} {c.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ====== Divider ====== */
function Divider() {
  return <div className="max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />;
}

/* ====== App ====== */
export default function App() {
  const [externalCommand, setExternalCommand] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const journeyRef = useRef(null);

  const handleActivateJourney = useCallback(() => {
    setTimeout(() => journeyRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
  }, []);

  const handleCommandFromChip = useCallback(
    (cmd) => {
      setExternalCommand({ cmd, ts: Date.now() });
      if (cmd === "journey") handleActivateJourney();
      else window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [handleActivateJourney]
  );

  const handleCityClick = useCallback((place) => {
    setSelectedPlace(place);
    if (place) {
      setTimeout(() => journeyRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary relative text-sans">
      <Particles />
      <div className="relative z-10">
        <Nav />

        {/* Hero + Terminal */}
        <section id="terminal" className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-text-dim font-mono text-xs tracking-[0.3em] mb-5">ILYAR MAMATTURSUN</p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight">{personal.name}</h1>
              <p className="text-text-muted font-mono text-sm md:text-base mb-1.5">{personal.tagline}</p>
              <p className="text-text-dim font-mono text-xs">{personal.role}</p>
            </div>
            <Terminal onActivateJourney={handleActivateJourney} externalCommand={externalCommand} />
            <CommandChips onCommand={handleCommandFromChip} />
            <ScrollHint />
          </div>
        </section>

        {/* Journey Map */}
        <div ref={journeyRef}>
          <JourneyMapSection onCityClick={handleCityClick} selectedPlace={selectedPlace} />
        </div>

        <Divider />
        <StoryCards onCityClick={handleCityClick} />
        <Divider />
        <Interests />
        <Divider />
        <PhotoGallery />
        <Divider />
        <Contact />

        <footer className="py-12 text-center">
          <p className="text-text-dim text-xs font-mono opacity-25">
            © 2026 Ilyar · <a href="https://github.com/IlyarMamattursun" className="hover:text-accent-blue transition-colors">GitHub</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
