import { useState, useEffect, useRef } from "react";
import { places } from "../data/content";

// Simplified China outline SVG path (mercator-ish projection, centered)
// Coordinates roughly mapped to a 800x700 viewBox
const chinaPath =
  "M580,180 L590,160 L610,150 L630,145 L650,140 L670,135 L690,130 L710,128 L730,125 L745,120 L755,115 L760,110 L750,105 L735,100 L720,95 L700,90 L680,85 L660,82 L640,80 L620,78 L600,80 L580,85 L560,90 L540,95 L520,100 L500,108 L480,115 L460,120 L440,125 L420,128 L400,130 L380,128 L360,125 L340,120 L320,118 L300,120 L280,125 L260,132 L240,140 L220,150 L200,160 L185,170 L175,180 L165,195 L158,210 L155,225 L155,240 L158,255 L165,268 L175,280 L185,290 L195,300 L205,310 L210,325 L212,340 L210,355 L205,368 L195,380 L185,390 L175,398 L168,408 L165,420 L165,435 L168,448 L175,458 L185,465 L198,470 L212,472 L228,470 L242,465 L255,458 L265,448 L272,438 L278,425 L282,412 L285,400 L290,388 L298,378 L310,370 L325,365 L340,362 L355,360 L370,360 L385,362 L398,366 L410,372 L420,380 L428,390 L435,402 L440,415 L445,428 L450,440 L458,450 L468,458 L480,462 L495,462 L510,458 L522,450 L532,440 L540,428 L548,415 L555,400 L562,385 L568,370 L572,355 L575,340 L578,325 L580,310 L582,295 L583,280 L585,265 L586,250 L587,235 L586,220 L584,205 L582,190";

// City positions on the SVG (x, y in viewBox coords)
const cityPositions = {
  kashgar: { x: 130, y: 290, label: "喀什" },
  urumqi: { x: 245, y: 150, label: "乌鲁木齐" },
  shanghai: { x: 660, y: 340, label: "上海" },
  nanjing: { x: 590, y: 310, label: "南京" },
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getRoutePath(from, to, steps = 30) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Ease-in-out for natural feel
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    points.push({
      x: lerp(from.x, to.x, eased),
      y: lerp(from.y, to.y, eased) + Math.sin(t * Math.PI) * (1 - Math.abs(t - 0.5) * 2) * 30,
    });
  }
  return points;
}

function Particle({ x, y, color, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;
  return (
    <circle
      cx={x}
      cy={y}
      r="2"
      fill={color}
      opacity="0.7"
    >
      <animate
        attributeName="opacity"
        values="0.7;0;0.7"
        dur={`${1.5 + Math.random()}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

export default function ChinaMap({ activeCity, onCityClick }) {
  const [animProgress, setAnimProgress] = useState(0);
  const [showRoute, setShowRoute] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowRoute(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showRoute) return;
    const start = Date.now();
    const duration = 2500;
    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setAnimProgress(p);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [showRoute]);

  // Build route segments
  const routePoints = [];
  const cityIds = ["kashgar", "urumqi", "shanghai", "nanjing"];
  for (let i = 0; i < cityIds.length - 1; i++) {
    const from = cityPositions[cityIds[i]];
    const to = cityPositions[cityIds[i + 1]];
    routePoints.push(...getRoutePath(from, to, 25));
  }

  const totalSegments = routePoints.length - 1;
  const visibleSegments = Math.floor(animProgress * totalSegments);

  return (
    <svg
      ref={svgRef}
      viewBox="60 60 680 450"
      className="w-full h-auto"
      style={{ filter: "drop-shadow(0 0 30px rgba(80,130,200,0.15))" }}
    >
      {/* China outline - subtle */}
      <path
        d={chinaPath}
        fill="rgba(30,35,50,0.6)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Route line - base (subtle) */}
      <polyline
        points={routePoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Route line - animated glow */}
      {showRoute && (
        <polyline
          points={routePoints
            .slice(0, visibleSegments + 1)
            .map((p) => `${p.x},${p.y}`)
            .join(" ")}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5a623" />
          <stop offset="30%" stopColor="#f0883e" />
          <stop offset="60%" stopColor="#4dabf7" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Traveling dot */}
      {showRoute && animProgress > 0 && (() => {
        const idx = Math.min(visibleSegments, routePoints.length - 1);
        const pos = routePoints[idx];
        return (
          <circle
            cx={pos.x}
            cy={pos.y}
            r="6"
            fill="white"
            filter="url(#glow)"
            opacity="0.9"
          >
            <animate
              attributeName="r"
              values="6;10;6"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        );
      })()}

      {/* Particle trail particles */}
      {showRoute && routePoints
        .filter((_, i) => i % 3 === 0 && i <= visibleSegments)
        .map((p, i) => (
          <Particle
            key={i}
            x={p.x + (Math.random() - 0.5) * 20}
            y={p.y + (Math.random() - 0.5) * 20}
            color={["#f5a623", "#4dabf7", "#a78bfa", "#f0883e"][i % 4]}
            delay={i * 40}
          />
        ))}

      {/* City markers */}
      {cityIds.map((id, index) => {
        const pos = cityPositions[id];
        const place = places.find((p) => p.id === id);
        const isActive = activeCity === id;
        const showLabel = animProgress > (index / cityIds.length) * 0.8;

        return (
          <g
            key={id}
            className="cursor-pointer"
            onClick={() => onCityClick(place)}
            style={{ transition: "transform 0.3s ease" }}
          >
            {/* Outer ring */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isActive ? 16 : 10}
              fill="none"
              stroke={place.color}
              strokeWidth={isActive ? 2 : 1}
              opacity={isActive ? 0.8 : 0.4}
            >
              {isActive && (
                <animate
                  attributeName="r"
                  values="10;18;10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            {/* Core dot */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r="5"
              fill={place.color}
              filter="url(#glow)"
            />
            {/* Label */}
            {showLabel && (
              <text
                x={pos.x + 14}
                y={pos.y + 4}
                fill="rgba(255,255,255,0.7)"
                fontFamily="var(--font-mono)"
                fontSize="11"
                opacity={isActive ? 1 : 0.5}
              >
                {pos.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Distance markers */}
      {showRoute && animProgress > 0.3 && (
        <>
          <text
            x={190}
            y={240}
            fill="rgba(255,255,255,0.2)"
            fontFamily="var(--font-mono)"
            fontSize="8"
          >
            ~1500km · 72h
          </text>
          <text
            x={450}
            y={270}
            fill="rgba(255,255,255,0.2)"
            fontFamily="var(--font-mono)"
            fontSize="8"
          >
            ~3900km · 70h
          </text>
          <text
            x={560}
            y={360}
            fill="rgba(255,255,255,0.2)"
            fontFamily="var(--font-mono)"
            fontSize="8"
          >
            ~300km
          </text>
        </>
      )}
    </svg>
  );
}
