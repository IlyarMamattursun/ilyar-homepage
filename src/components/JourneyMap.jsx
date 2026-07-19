import { useState, useRef, useEffect } from "react";
import { places, interests, ctf, covidStory, photos, contactLinks } from "../data/content";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function JourneyMap() {
  const [activePlace, setActivePlace] = useState(null);
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative py-24 px-6 max-w-4xl mx-auto"
    >
      <h2 className="text-center font-serif text-3xl md:text-4xl text-white mb-4">
        The Migration
      </h2>
      <p className="text-center text-text-muted font-mono text-sm mb-16">
        喀什 → 乌鲁木齐 → 上海 → 南京 → ？
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Central line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500 via-blue-500 to-purple-500" />

        {places.map((place, index) => {
          const isLeft = index % 2 === 0;
          const isActive = activePlace === place.id;

          return (
            <div key={place.id} className="relative mb-12 md:mb-20">
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                <button
                  onClick={() =>
                    setActivePlace(isActive ? null : place.id)
                  }
                  className="w-4 h-4 rounded-full border-3 transition-all duration-300 hover:scale-150"
                  style={{
                    borderColor: place.color,
                    background: isActive ? place.color : "#0a0a0f",
                    boxShadow: isActive
                      ? `0 0 16px ${place.color}40`
                      : "none",
                  }}
                  aria-label={`View ${place.name}`}
                />
              </div>

              {/* Content card */}
              <div
                className={`relative md:w-[42%] ${
                  isLeft
                    ? "md:mr-auto md:pr-8 md:text-right"
                    : "md:ml-auto md:pl-8 md:text-left"
                }`}
              >
                <button
                  onClick={() =>
                    setActivePlace(isActive ? null : place.id)
                  }
                  className="w-full text-left"
                >
                  <div
                    className="bg-bg-card border border-border-subtle rounded-lg p-6 transition-all duration-300 hover:border-opacity-50 cursor-pointer"
                    style={{
                      borderColor: isActive
                        ? `${place.color}40`
                        : undefined,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2 md:flex-row-reverse">
                      <span className="text-2xl">{place.emoji}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {place.name}
                          <span className="text-text-muted font-mono text-sm ml-2">
                            {place.period}
                          </span>
                        </h3>
                        <p className="text-text-muted font-mono text-xs">
                          {place.nameEn}
                        </p>
                      </div>
                    </div>

                    {/* Expanded content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isActive
                          ? "max-h-[600px] mt-4 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-text-primary text-sm leading-relaxed whitespace-pre-line">
                        {place.description}
                      </p>

                      {place.keywords && (
                        <div className="flex flex-wrap gap-2 mt-3 md:flex-row-reverse">
                          {place.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="px-2 py-1 text-xs rounded bg-bg-primary border border-border-subtle text-text-muted"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      {place.extras && (
                        <div className="mt-4 space-y-3">
                          {place.extras.map((extra, i) => (
                            <div
                              key={i}
                              className="bg-bg-primary rounded p-3 border border-border-subtle"
                            >
                              <p className="text-text-muted font-mono text-xs mb-1">
                                {extra.label}
                              </p>
                              <p className="text-text-primary text-xs leading-relaxed">
                                {extra.story}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {/* Mobile dot */}
              <div className="md:hidden absolute left-0 top-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: place.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function InterestCard({ title, emoji, story, images, playlistUrl, playlistName, playlistCreator, highlights }) {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-lg p-6 hover:border-border-muted transition-all">
      <h3 className="text-xl font-bold text-white mb-4">
        {emoji} {title}
      </h3>
      <p className="text-text-primary text-sm leading-relaxed whitespace-pre-line mb-4">
        {story}
      </p>

      {images && images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {images.map((src, i) => (
            <img
              key={i}
              src={asset(src)}
              alt={`${title} ${i + 1}`}
              className="w-20 h-20 object-cover rounded border border-border-subtle gallery-img"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {highlights && (
        <div className="space-y-1 mb-3">
          {highlights.map((h, i) => (
            <p key={i} className="text-text-muted text-xs font-mono">
              {h}
            </p>
          ))}
        </div>
      )}

      {playlistUrl && (
        <a
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-blue text-xs font-mono hover:underline"
        >
          {playlistName} by {playlistCreator} →
        </a>
      )}
    </div>
  );
}

function PhotoGallery() {
  return (
    <section id="gallery" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-center font-serif text-3xl md:text-4xl text-white mb-16">
        Fragments
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg border border-border-subtle ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <img
              src={asset(photo.src)}
              alt={photo.alt}
              className="w-full h-full object-cover gallery-img"
              style={{ minHeight: i === 0 ? 300 : 160 }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 text-center">
      <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
        Get in Touch
      </h2>
      <p className="text-text-muted mb-8 font-mono text-sm">
        $ ssh ilyar@wherever
      </p>

      <div className="flex justify-center gap-6">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-bg-card border border-border-subtle rounded-lg text-text-primary hover:border-accent-blue hover:text-accent-blue transition-all font-mono text-sm"
          >
            {link.label === "GitHub" && (
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            )}
            {link.label === "Email" && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            )}
            {link.label}
          </a>
        ))}
      </div>

      <p className="mt-12 text-text-dim text-xs font-mono">
        Built with terminal aesthetics. No templates, no BS.
      </p>
    </section>
  );
}

function StoryCards() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-center font-serif text-3xl md:text-4xl text-white mb-16">
        Side Quests
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* COVID Story */}
        <div className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden hover:border-border-muted transition-all">
          {covidStory.image && (
            <img
              src={asset(covidStory.image)}
              alt={covidStory.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          )}
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
        <div className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden hover:border-border-muted transition-all">
          {ctf.image && (
            <img
              src={asset(ctf.image)}
              alt={ctf.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          )}
          <div className="p-5">
            <h3 className="text-lg font-bold text-white mb-2">
              {ctf.emoji} {ctf.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {ctf.description}
            </p>
          </div>
        </div>
      </div>

      {/* Train story */}
      <div className="mt-6 bg-bg-card border border-border-subtle rounded-lg overflow-hidden hover:border-border-muted transition-all">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={asset("/pic/回新疆飞机天山景色.jpg")}
              alt="天山"
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6 md:w-1/2 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white mb-2">
              🚂 归途
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              70多个小时的绿皮火车，从上海回新疆。很辛苦，但和同学们在一起的火车上，是另一种自由。飞过天山的时候，知道快到家了。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { JourneyMap, InterestCard, PhotoGallery, Contact, StoryCards };
