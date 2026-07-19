import { interests, ctf, covidStory, photos, contactLinks } from "../data/content";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function StoryCards() {
  return (
    <section id="stories" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="section-label">side-quests</div>
      <h2 className="section-title">Side Quests</h2>
      <p className="section-subtitle">那些不按剧本走的章节</p>

      <div className="grid md:grid-cols-3 gap-5">
        {/* COVID */}
        <div className="story-card">
          <img
            src={asset(covidStory.image)}
            alt={covidStory.title}
            className="story-card-img"
          />
          <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-2">
              {covidStory.emoji} {covidStory.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {covidStory.description}
            </p>
          </div>
        </div>

        {/* CTF */}
        <div className="story-card">
          <img
            src={asset(ctf.image)}
            alt={ctf.title}
            className="story-card-img"
          />
          <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-2">
              {ctf.emoji} {ctf.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {ctf.description}
            </p>
          </div>
        </div>

        {/* Train */}
        <div className="story-card">
          <img
            src={asset("/pic/回新疆飞机天山景色.jpg")}
            alt="天山"
            className="story-card-img"
          />
          <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-2">
              🚂 归途
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              70多个小时的绿皮火车，上海到新疆。辛苦，但在火车上和同学们在一起，是另一种自由。飞过天山的时候，知道快到家了。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Interests() {
  const items = [
    {
      ...interests.tennis,
      color: "#4dabf7",
    },
    {
      ...interests.drinking,
      color: "#f0883e",
    },
    {
      ...interests.music,
      color: "#a78bfa",
      highlights: interests.music.highlights,
      playlistUrl: interests.music.playlistUrl,
      playlistName: interests.music.playlistName,
      playlistCreator: interests.music.playlistCreator,
    },
  ];

  return (
    <section id="interests" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="section-label">/etc/interests</div>
      <h2 className="section-title">Runtime Modules</h2>
      <p className="section-subtitle">加载中的人格组件</p>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div key={i} className="interest-card group">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ background: `${item.color}18` }}
              >
                {item.emoji}
              </span>
              <div>
                <h3 className="text-white font-bold">{item.title}</h3>
                <div
                  className="w-8 h-0.5 rounded mt-1"
                  style={{ background: item.color }}
                />
              </div>
            </div>

            <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line mb-4">
              {item.story}
            </p>

            {item.images && (
              <div className="flex gap-2 mb-4">
                {item.images.map((src, j) => (
                  <img
                    key={j}
                    src={asset(src)}
                    alt={`${item.title}`}
                    className="interest-img"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            {item.highlights && (
              <div className="space-y-0.5 mb-3">
                {item.highlights.map((h, j) => (
                  <p key={j} className="text-text-dim text-xs font-mono truncate">
                    {h}
                  </p>
                ))}
              </div>
            )}

            {item.playlistUrl && (
              <a
                href={item.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity"
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

export function PhotoGallery() {
  return (
    <section id="gallery" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="section-label">gallery</div>
      <h2 className="section-title">Fragments</h2>
      <p className="section-subtitle">时间的碎片</p>

      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`gallery-item ${i === 0 ? "featured" : ""}`}
          >
            <img
              src={asset(photo.src)}
              alt={photo.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 text-center">
      <div className="section-label">contact</div>
      <h2 className="section-title" style={{ marginBottom: 16 }}>
        ssh ilyar@wherever
      </h2>

      <div className="flex justify-center gap-4 mt-8">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-6 py-3 font-mono text-sm text-text-primary hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
          >
            {link.label === "GitHub" && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            )}
            {link.label === "Email" && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            )}
            {link.label}
          </a>
        ))}
      </div>

      <p className="mt-16 text-text-dim text-xs font-mono opacity-40">
        Built from scratch. No templates. No AI slop.
      </p>
    </section>
  );
}
