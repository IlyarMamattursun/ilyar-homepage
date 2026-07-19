import { useState, useRef, useCallback, useEffect } from "react";
import Terminal from "./components/Terminal";
import JourneyMap from "./components/JourneyMap";
import { StoryCards, Interests, PhotoGallery, Contact } from "./components/Sections";
import { personal } from "./data/content";

function Particles() {
  useEffect(() => {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.08,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,190,240,${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(130,170,230,${0.05 * (1 - dist / 130)})`;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="particles" />;
}

function Nav() {
  const links = [
    { href: "#terminal", label: "$" },
    { href: "#journey", label: "map" },
    { href: "#stories", label: "quests" },
    { href: "#interests", label: "modules" },
    { href: "#gallery", label: "photos" },
    { href: "#contact", label: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-accent-green hover:text-white transition-colors">
          ~/ilyar
        </a>
        <div className="hidden md:flex gap-0">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-mono text-text-dim hover:text-text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <span className="md:hidden text-text-dim text-xs font-mono">↓</span>
      </div>
    </nav>
  );
}

function ScrollHint() {
  return (
    <div className="flex flex-col items-center gap-3 mt-10 scroll-hint">
      <p className="text-text-dim font-mono text-xs tracking-[0.3em]">
        SCROLL OR TYPE
      </p>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" className="text-text-dim">
        <path d="M8 3v10M4 9l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function CommandChips({ onCommand }) {
  const quickCommands = ["whoami", "journey", "drink", "tennis", "music", "contact"];
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {quickCommands.map((cmd) => (
        <button key={cmd} className="cmd-chip" onClick={() => onCommand(cmd)}>
          $ {cmd}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [externalCommand, setExternalCommand] = useState(null);
  const journeyRef = useRef(null);

  const handleActivateJourney = useCallback(() => {
    setTimeout(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  const handleCommandFromChip = useCallback(
    (cmd) => {
      setExternalCommand({ cmd, ts: Date.now() });
      if (cmd === "journey") handleActivateJourney();
      else window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [handleActivateJourney]
  );

  return (
    <div className="min-h-screen bg-bg-primary relative">
      <Particles />

      <div className="relative z-10">
        <Nav />

        {/* Hero / Terminal */}
        <section
          id="terminal"
          className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10"
        >
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <p className="text-text-dim font-mono text-xs tracking-[0.3em] mb-5">
                ILYAR MAMATTURSUN
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight">
                {personal.name}
              </h1>
              <p className="text-text-muted font-mono text-sm md:text-base mb-1.5">
                {personal.tagline}
              </p>
              <p className="text-text-dim font-mono text-xs">
                {personal.role}
              </p>
            </div>
            <Terminal
              onActivateJourney={handleActivateJourney}
              externalCommand={externalCommand}
            />
            <CommandChips onCommand={handleCommandFromChip} />
            <ScrollHint />
          </div>
        </section>

        {/* Journey Map */}
        <div ref={journeyRef}>
          <JourneyMap />
        </div>

        <div className="section-divider" />
        <StoryCards />
        <div className="section-divider" />
        <Interests />
        <div className="section-divider" />
        <PhotoGallery />
        <div className="section-divider" />
        <Contact />

        <footer className="py-10 text-center">
          <p className="text-text-dim text-xs font-mono opacity-30">
            © 2026 Ilyar ·{" "}
            <a
              href="https://github.com/IlyarMamattursun"
              className="hover:text-accent-blue transition-colors"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
