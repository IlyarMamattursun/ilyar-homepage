import { useState } from "react";
import { interests, ctf, covidStory, photos, contactLinks, places } from "../data/content";

const ASSET = import.meta.env.BASE_URL;
const img = (p) => `${ASSET}${p.replace(/^\//, "")}`;

/* ====== Story Cards ====== */
export function StoryCards({ onCityClick }) {
  return (
    <section id="stories" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-mono text-xs tracking-[0.3em] text-text-dim mb-3">SIDE QUESTS</p>
        <h2 className="font-serif text-5xl md:text-6xl text-white mb-3">Side Quests</h2>
        <p className="font-mono text-sm text-text-dim">不按剧本的章节</p>
      </div>

      <div className="grid md:grid-cols-12 gap-5 auto-rows-min">
        {/* COVID - spans 7 cols */}
        <div className="md:col-span-7 group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0d0f17] hover:border-white/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
          <img
            src={img(covidStory.image)}
            alt={covidStory.title}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <h3 className="text-xl font-bold text-white mb-1">{covidStory.emoji} {covidStory.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed max-w-md">{covidStory.description}</p>
          </div>
        </div>

        {/* CTF - spans 5 cols */}
        <div className="md:col-span-5 group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0d0f17] hover:border-white/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
          <img
            src={img(ctf.image)}
            alt={ctf.title}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <h3 className="text-xl font-bold text-white mb-1">{ctf.emoji} {ctf.title}</h3>
            <p className="text-sm text-white/60">{ctf.description}</p>
          </div>
        </div>

        {/* Train - full width with places quick links */}
        <div className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0d0f17] hover:border-white/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <img
            src={img("/pic/在返回新疆的火车上.jpg")}
            alt="火车"
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <h3 className="text-xl font-bold text-white mb-1">🚂 归途</h3>
            <p className="text-sm text-white/60 max-w-sm">
              70小时绿皮火车，上海回新疆。天山脚下，知道快到家了。
            </p>
          </div>
        </div>

        {/* Quick jump to cities */}
        <div className="md:col-span-4 flex flex-col gap-3 justify-center">
          {places.map((p) => (
            <button
              key={p.id}
              onClick={() => onCityClick?.(p)}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#0d0f17] hover:border-white/10 transition-all group text-left"
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: p.color, boxShadow: `0 0 10px ${p.color}60` }}
              />
              <div>
                <span className="text-white text-sm font-medium">{p.emoji} {p.name}</span>
                <span className="text-text-dim font-mono text-xs ml-2">{p.period}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== Interests ====== */
export function Interests() {
  const items = [
    { ...interests.tennis, color: "#4dabf7", tag: "SPORT" },
    { ...interests.drinking, color: "#f0883e", tag: "RITUAL", images: interests.drinking.images },
    { ...interests.music, color: "#a78bfa", tag: "SOUNDTRACK", highlights: interests.music.highlights, playlistUrl: interests.music.playlistUrl, playlistName: interests.music.playlistName, playlistCreator: interests.music.playlistCreator },
  ];

  return (
    <section id="interests" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-mono text-xs tracking-[0.3em] text-text-dim mb-3">/ETC/INTERESTS</p>
        <h2 className="font-serif text-5xl md:text-6xl text-white mb-3">Runtime Modules</h2>
        <p className="font-mono text-sm text-text-dim">加载中的人格组件</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="group relative rounded-2xl border border-white/5 bg-[#0d0f17] p-7 hover:border-white/10 transition-all duration-500"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] mb-4" style={{ color: item.color }}>
              {item.tag}
            </p>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{item.emoji}</span>
              <h3 className="text-white text-xl font-bold">{item.title}</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line mb-5">
              {item.story}
            </p>

            {item.images && (
              <div className="flex gap-2 mb-4">
                {item.images.map((src, j) => (
                  <img
                    key={j}
                    src={img(src)}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-lg border border-white/5"
                  />
                ))}
              </div>
            )}

            {item.highlights && (
              <div className="space-y-0.5 mb-4">
                {item.highlights.slice(0, 4).map((h, j) => (
                  <p key={j} className="text-text-dim text-xs font-mono truncate">{h}</p>
                ))}
              </div>
            )}

            {item.playlistUrl && (
              <a
                href={item.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono hover:underline"
                style={{ color: item.color }}
              >
                {item.playlistName} by {item.playlistCreator} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ====== Photo Gallery - Masonry with overlays ====== */
export function PhotoGallery() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="gallery" className="py-32 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-mono text-xs tracking-[0.3em] text-text-dim mb-3">GALLERY</p>
        <h2 className="font-serif text-5xl md:text-6xl text-white mb-3">Fragments</h2>
        <p className="font-mono text-sm text-text-dim">时间的切片</p>
      </div>

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => {
          const isLandscape = i % 3 === 0;
          const isTall = i % 4 === 2;
          return (
            <div
              key={i}
              className="break-inside-avoid relative group overflow-hidden rounded-xl border border-white/5 bg-[#0d0f17] cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={img(photo.src)}
                alt={photo.alt}
                className="w-full h-auto block transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                loading="lazy"
                style={{ minHeight: isLandscape ? 200 : isTall ? 320 : 240, background: '#0d0f17' }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 transition-opacity duration-300 ${
                  hovered === i ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                }`}
              >
                <p className="text-white/80 text-sm font-mono">{photo.alt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ====== Contact ====== */
export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-text-dim mb-3">CONTACT</p>
      <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">ssh ilyar@wherever</h2>

      <div className="flex justify-center gap-4 mt-10">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-text-primary hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all font-mono text-sm backdrop-blur"
          >
            {link.label === "GitHub" && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            )}
            {link.label === "Email" && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
            )}
            {link.label}
          </a>
        ))}
      </div>

      <p className="mt-16 text-text-dim text-xs font-mono opacity-30">Built from scratch. No templates.</p>
    </section>
  );
}
