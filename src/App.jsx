import { useState, useRef, useCallback } from "react";
import Terminal from "./components/Terminal";
import {
  JourneyMap,
  InterestCard,
  PhotoGallery,
  Contact,
  StoryCards,
} from "./components/JourneyMap";
import { personal, interests } from "./data/content";

function Nav() {
  const links = [
    { href: "#terminal", label: "$ terminal" },
    { href: "#journey", label: "journey" },
    { href: "#stories", label: "side-quests" },
    { href: "#interests", label: "interests" },
    { href: "#gallery", label: "gallery" },
    { href: "#contact", label: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur border-b border-border-subtle">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-accent-green hover:text-accent-blue transition-colors">
          ~/ilyar
        </a>
        <div className="hidden md:flex gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-mono text-text-muted hover:text-text-primary hover:bg-bg-card rounded transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
        <span className="md:hidden text-text-dim text-xs font-mono">scroll ↓</span>
      </div>
    </nav>
  );
}

function ScrollHint() {
  return (
    <div className="flex flex-col items-center gap-2 mt-8 scroll-hint">
      <p className="text-text-dim font-mono text-xs">scroll or type 'journey'</p>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        className="text-text-dim"
      >
        <path
          d="M8 3v10M4 9l4 4 4-4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CommandChips({ onCommand }) {
  const quickCommands = ["whoami", "journey", "drink", "tennis", "music", "contact"];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {quickCommands.map((cmd) => (
        <button
          key={cmd}
          className="cmd-chip"
          onClick={() => onCommand(cmd)}
        >
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

  const handleCommandFromChip = useCallback((cmd) => {
    // Set external command with a timestamp to ensure uniqueness
    setExternalCommand({ cmd, ts: Date.now() });

    if (cmd === "journey") {
      handleActivateJourney();
    }
  }, [handleActivateJourney]);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />

      {/* Hero / Terminal Section */}
      <section
        id="terminal"
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8"
      >
        <div className="w-full max-w-2xl">
          <div className="text-center mb-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3">
              {personal.name}
            </h1>
            <p className="text-text-muted font-mono text-sm md:text-base">
              {personal.tagline}
            </p>
            <p className="text-text-dim font-mono text-xs mt-2">
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

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Side Quests */}
      <StoryCards />

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Interests */}
      <section id="interests" className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-center font-serif text-3xl md:text-4xl text-white mb-16">
          /etc/interests
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <InterestCard
            title={interests.tennis.title}
            emoji={interests.tennis.emoji}
            story={interests.tennis.story}
          />
          <InterestCard
            title={interests.drinking.title}
            emoji={interests.drinking.emoji}
            story={interests.drinking.story}
            images={interests.drinking.images}
          />
          <InterestCard
            title={interests.music.title}
            emoji={interests.music.emoji}
            story={interests.music.story}
            highlights={interests.music.highlights}
            playlistUrl={interests.music.playlistUrl}
            playlistName={interests.music.playlistName}
            playlistCreator={interests.music.playlistCreator}
          />
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Photo Gallery */}
      <PhotoGallery />

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border-subtle">
        <p className="text-text-dim text-xs font-mono">
          © 2026 Ilyar · 逃离确定性中 ·{" "}
          <a
            href="https://github.com/IlyarMamattursun"
            className="hover:text-accent-blue transition-colors"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
