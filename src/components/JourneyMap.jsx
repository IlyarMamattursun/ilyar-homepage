import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { places } from "../data/content";

// Fix default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

function createIcon(color) {
  return L.divIcon({
    className: "city-marker",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 16px ${color}80;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });
}

function MapAnimator() {
  const map = useMap();
  useEffect(() => {
    const coords = places.map((p) => p.coords);
    const lats = coords.map((c) => c[0]);
    const lngs = coords.map((c) => c[1]);
    const bounds = L.latLngBounds(
      [Math.min(...lats) - 3, Math.min(...lngs) - 5],
      [Math.max(...lats) + 3, Math.max(...lngs) + 5]
    );
    map.fitBounds(bounds, { padding: [40, 40], animate: true, duration: 1.2 });
  }, [map]);
  return null;
}

function RouteLine() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(1), 500);
    return () => clearTimeout(timer);
  }, []);

  const coords = places.map((p) => p.coords);
  const dashArray = "10 6";

  return (
    <>
      {/* Glow line */}
      <Polyline
        positions={coords}
        pathOptions={{ color: "rgba(255,255,255,0.08)", weight: 6 }}
      />
      {/* Animated progress line */}
      <Polyline
        positions={coords}
        pathOptions={{
          color: "#f5a623",
          weight: 3,
          dashArray,
          opacity: 0.9,
        }}
      />
    </>
  );
}

function JourneyDetail({ place, onClose }) {
  if (!place) return null;
  return (
    <div
      className="glass-card p-5 text-left max-h-[400px] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-2xl mr-2">{place.emoji}</span>
          <span
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ background: place.color, boxShadow: `0 0 8px ${place.color}` }}
          />
          <span className="text-white font-bold text-lg">{place.name}</span>
          <span className="text-text-dim font-mono text-xs ml-2">{place.period}</span>
        </div>
        <button
          onClick={onClose}
          className="text-text-dim hover:text-white font-mono text-sm px-2"
        >
          ×
        </button>
      </div>
      <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line mb-3">
        {place.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {place.keywords.map((kw) => (
          <span
            key={kw}
            className="px-2 py-0.5 text-xs rounded-full bg-white/5 border border-white/5 text-text-muted"
          >
            {kw}
          </span>
        ))}
      </div>
      {place.extras && (
        <div className="space-y-2">
          {place.extras.map((extra, i) => (
            <div key={i} className="bg-white/3 rounded-lg p-3 border border-white/5">
              <p className="text-text-dim font-mono text-xs mb-1">{extra.label}</p>
              <p className="text-text-muted text-xs leading-relaxed">{extra.story}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JourneyMap() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const detailRef = useRef(null);

  return (
    <section id="journey" className="relative py-24 px-4 max-w-6xl mx-auto">
      <div className="section-label">/places</div>
      <h2 className="section-title">The Migration</h2>
      <p className="section-subtitle">
        喀什 → 乌鲁木齐 → 上海 → 南京 → ？
      </p>

      {/* Map + Detail layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map */}
        <div className="journey-map-container flex-1 min-h-[450px] lg:min-h-[550px]">
          <MapContainer
            center={[39, 95]}
            zoom={5}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%", minHeight: 450 }}
            zoomControl={true}
          >
            <TileLayer
              attribution=""
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapAnimator />
            <RouteLine />
            {places.map((place) => (
              <Marker
                key={place.id}
                position={place.coords}
                icon={createIcon(place.color)}
                eventHandlers={{
                  click: () => setSelectedPlace(place),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {/* Detail panel */}
        <div className="lg:w-80 shrink-0" ref={detailRef}>
          {selectedPlace ? (
            <JourneyDetail
              place={selectedPlace}
              onClose={() => setSelectedPlace(null)}
            />
          ) : (
            <div className="glass-card p-6 text-center h-full flex flex-col items-center justify-center min-h-[200px]">
              <p className="text-text-dim font-mono text-sm mb-3">
                Click a city on the map
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {places.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlace(p)}
                    className="px-3 py-1.5 text-xs font-mono rounded-full border transition-all hover:scale-105"
                    style={{
                      borderColor: `${p.color}40`,
                      color: p.color,
                      background: `${p.color}10`,
                    }}
                  >
                    {p.emoji} {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { JourneyMap };
