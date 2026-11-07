"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  MAP_CENTER,
  MAP_ZOOM,
  PLACE_STYLE,
  RISK_STYLE,
  formatCoord,
  type LatLng,
  type LocationDatabaseRecord,
  type Place,
  type PlaceKind,
  type RiskLevel,
  type Route,
  type Zone,
} from "@/data/map";

export interface SelectedMapItem {
  kind: "place" | "zone" | "route";
  id: string;
  position: LatLng;
  title: string;
  subtitle: string;
  description?: string;
  placeKind?: PlaceKind;
  riskLevel?: RiskLevel;
  db: LocationDatabaseRecord;
  /** Timestamp agar klik ulang item yang sama tetap memicu flyTo */
  ts: number;
}

interface MapViewProps {
  places: Place[];
  zones: Zone[];
  routes: Route[];
  showPlaces: boolean;
  showZones: boolean;
  showRoutes: boolean;
  selected: SelectedMapItem | null;
  onSelect: (item: SelectedMapItem) => void;
  inView: boolean;
}

/** Ikon SVG string untuk pin Leaflet */
function placeIconSvg(kind: PlaceKind): string {
  switch (kind) {
    case "kantor":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;
    case "danau":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;
    case "sekolah":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10"/><path d="M18 5v17"/><path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>`;
    case "klinik":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>`;
    case "kumpul":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
    case "bank":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/></svg>`;
    case "pandang":
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10h4"/><path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/><path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"/><path d="M 22 16 L 2 16"/><path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"/><path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/></svg>`;
  }
}

function makePlaceDivIcon(kind: PlaceKind, delayMs: number) {
  const s = PLACE_STYLE[kind];
  const borderStyle = s.ring
    ? `background:${s.bg};color:${s.fg};border:3px solid ${s.ring};box-shadow:0 0 0 2px #fff, 0 6px 14px -4px rgba(15,42,33,.45);`
    : `background:${s.bg};color:${s.fg};`;
  return L.divIcon({
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
    html: `<div class="rm-marker" style="--d:${delayMs}ms"><div class="rm-pin" style="${borderStyle}">${placeIconSvg(
      kind,
    )}</div></div>`,
  });
}

function makeZoneDivIcon(level: "tinggi" | "sedang", delayMs: number) {
  const isHigh = level === "tinggi";
  const bg = isHigh ? "#C93B3B" : "#E6B93D";
  const fg = isHigh ? "#ffffff" : "#0F2A21";
  const ring = isHigh ? "2.5px solid #fff" : "2px solid #0F2A21";
  const svg = isHigh
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
  return L.divIcon({
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
    html: `<div class="rm-marker" style="--d:${delayMs}ms"><div class="rm-zone-pin" style="background:${bg};color:${fg};border:${ring};box-shadow:0 0 0 2px #fff,0 4px 10px rgba(0,0,0,.3)">${svg}</div></div>`,
  });
}

function makeArrowDivIcon(angleDeg: number, delayMs: number) {
  return L.divIcon({
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    html: `<div class="rm-marker" style="--d:${delayMs}ms"><div class="rm-arrow"><svg style="transform:rotate(${angleDeg}deg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div></div>`,
  });
}

function popupHtml(title: string, subtitle: string, code?: string) {
  return `<div style="min-width:185px">
    ${
      code
        ? `<div style="display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.08em;color:#1A70D4;background:#DCEBFA;padding:2px 7px;border-radius:99px;margin-bottom:4px">${code}</div>`
        : ""
    }
    <div style="font-weight:700;font-size:13.5px;color:#0F2A21">${title}</div>
    <div style="font-size:11.5px;color:#3E5A4E;margin-top:2px">${subtitle}</div>
    <div style="font-size:11px;font-weight:600;color:#17805F;margin-top:6px">Lihat detail database di panel →</div>
  </div>`;
}

export default function MapView({
  places,
  zones,
  routes,
  showPlaces,
  showZones,
  showRoutes,
  selected,
  onSelect,
  inView,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const placeLayerRef = useRef<L.LayerGroup | null>(null);
  const zoneLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Layer | null>(null);
  const [locNotice, setLocNotice] = useState<string | null>(null);

  // Inisialisasi peta Leaflet sekali
  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      zoomSnap: 0.25,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
        opacity: 0.35,
      },
    ).addTo(map);

    L.control
      .scale({
        position: "bottomleft",
        imperial: false,
        maxWidth: 90,
      })
      .addTo(map);

    placeLayerRef.current = L.layerGroup().addTo(map);
    zoneLayerRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Render ulang layer saat filter atau daftar berubah
  useEffect(() => {
    const map = mapRef.current;
    const placeLayer = placeLayerRef.current;
    const zoneLayer = zoneLayerRef.current;
    const routeLayer = routeLayerRef.current;
    if (!map || !placeLayer || !zoneLayer || !routeLayer) return;

    placeLayer.clearLayers();
    zoneLayer.clearLayers();
    routeLayer.clearLayers();

    let order = 0;

    // 1. Zona bahaya (poligon + pin peringatan)
    if (showZones) {
      zones.forEach((z) => {
        const cls =
          z.level === "tinggi"
            ? "zone-high"
            : z.level === "sedang"
              ? "zone-medium"
              : "zone-safe";
        const poly = L.polygon(z.polygon, {
          className: cls,
        });
        const subtitle = `${RISK_STYLE[z.level].label} · ${z.hazard}`;
        const itemData: Omit<SelectedMapItem, "ts"> = {
          kind: "zone",
          id: z.id,
          position: z.center,
          title: z.name,
          subtitle,
          description: z.description,
          riskLevel: z.level,
          db: z.db,
        };
        poly.bindPopup(popupHtml(z.name, subtitle, z.db.code), {
          className: "rm-popup",
        });
        poly.on("click", () => onSelect({ ...itemData, ts: Date.now() }));
        poly.addTo(zoneLayer);

        if (z.pin && (z.level === "tinggi" || z.level === "sedang")) {
          const pin = L.marker(z.center, {
            icon: makeZoneDivIcon(z.level, order++ * 45),
            title: z.name,
            alt: z.name,
          });
          pin.bindPopup(popupHtml(z.name, subtitle, z.db.code), {
            className: "rm-popup",
          });
          pin.on("click", () => onSelect({ ...itemData, ts: Date.now() }));
          pin.addTo(zoneLayer);
        }
      });
    }

    // 2. Jalur evakuasi (garis putus-putus + panah arah)
    if (showRoutes) {
      routes.forEach((r) => {
        const line = L.polyline(r.path, {
          className: "route-line",
        });
        const subtitle = `${r.distance} · ${r.duration}`;
        const mid = r.path[Math.floor(r.path.length / 2)];
        const itemData: Omit<SelectedMapItem, "ts"> = {
          kind: "route",
          id: r.id,
          position: mid,
          title: r.name,
          subtitle,
          description: r.description,
          db: r.db,
        };
        line.bindPopup(popupHtml(r.name, subtitle, r.db.code), {
          className: "rm-popup",
        });
        line.on("click", () => onSelect({ ...itemData, ts: Date.now() }));
        line.addTo(routeLayer);

        r.arrows.forEach((idx) => {
          const p0 = r.path[idx];
          const p1 = r.path[Math.min(r.path.length - 1, idx + 1)];
          if (!p0 || !p1) return;
          const dy = p1[0] - p0[0];
          const dx = p1[1] - p0[1];
          const deg = -Math.atan2(dy, dx) * (180 / Math.PI);
          L.marker(p0, {
            icon: makeArrowDivIcon(deg, order++ * 45),
            interactive: false,
            keyboard: false,
          }).addTo(routeLayer);
        });
      });
    }

    // 3. Tempat penting
    if (showPlaces) {
      places.forEach((p) => {
        const marker = L.marker(p.position, {
          icon: makePlaceDivIcon(p.kind, order++ * 50),
          title: p.name,
          alt: p.name,
        });
        const subtitle = `${p.typeLabel} · ${formatCoord(p.position)}`;
        const itemData: Omit<SelectedMapItem, "ts"> = {
          kind: "place",
          id: p.id,
          position: p.position,
          title: p.name,
          subtitle,
          description: p.description,
          placeKind: p.kind,
          db: p.db,
        };
        marker.bindPopup(popupHtml(p.name, subtitle, p.db.code), {
          className: "rm-popup",
        });
        if (p.showLabel) {
          marker.bindTooltip(p.name, {
            permanent: true,
            direction: "right",
            offset: [18, 0],
            className: "rm-label",
          });
        }
        marker.on("click", () => onSelect({ ...itemData, ts: Date.now() }));
        marker.addTo(placeLayer);
      });
    }
  }, [places, zones, routes, showPlaces, showZones, showRoutes, onSelect]);

  // Saat item dipilih → flyTo halus + buka popup
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selected) return;

    map.flyTo(selected.position, 15.25, {
      duration: 0.85,
    });

    const popup = L.popup({ className: "rm-popup", offset: [0, -14] })
      .setLatLng(selected.position)
      .setContent(popupHtml(selected.title, selected.subtitle, selected.db?.code));
    popup.openOn(map);
  }, [selected]);

  const handleZoom = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.setZoom(map.getZoom() + delta);
  };

  const handleResetNorth = () => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo(MAP_CENTER, MAP_ZOOM, { duration: 0.75 });
  };

  const handleMyLocation = () => {
    const map = mapRef.current;
    if (!map) return;

    const showAt = (pos: LatLng, label: string, note?: string) => {
      if (userMarkerRef.current) {
        map.removeLayer(userMarkerRef.current);
      }
      const m = L.circleMarker(pos, {
        radius: 9,
        color: "#ffffff",
        weight: 3,
        fillColor: "#1A70D4",
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px"><div style="font-weight:700;font-size:13.5px;color:#0F2A21">${label}</div><div style="font-size:11.5px;color:#3E5A4E;margin-top:2px">${formatCoord(pos)}</div>${note ? `<div style="font-size:12px;color:#0F2A21;margin-top:6px">${note}</div>` : ""}</div>`,
          { className: "rm-popup" },
        );
      userMarkerRef.current = m;
      map.flyTo(pos, 15.25, { duration: 0.85 });
      m.openPopup();
    };

    if (!("geolocation" in navigator)) {
      showAt(
        [-8.6389, 120.5615],
        "Lokasi Simulasi · Danau Ranamese",
        "Perangkat tidak mendukung geolokasi; menampilkan titik kawasan Ranamese.",
      );
      return;
    }

    setLocNotice("Mencari lokasi…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocNotice(null);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const inRanamese =
          Math.abs(lat - MAP_CENTER[0]) < 0.08 &&
          Math.abs(lng - MAP_CENTER[1]) < 0.08;
        if (inRanamese) {
          showAt([lat, lng], "Lokasi Anda saat ini");
        } else {
          showAt(
            [-8.6389, 120.5615],
            "Titik Kawasan Ranamese",
            `Anda berada di luar kawasan (${lat.toFixed(2)}, ${lng.toFixed(2)}). Menampilkan Danau Ranamese.`,
          );
        }
      },
      () => {
        setLocNotice(null);
        showAt(
          [-8.6389, 120.5615],
          "Lokasi Simulasi · Danau Ranamese",
          "Izin lokasi tidak diaktifkan; menampilkan titik Danau Ranamese.",
        );
      },
      { timeout: 5000 },
    );
  };

  return (
    <div
      className={`relative h-[400px] w-full overflow-hidden rounded-[20px] bg-map sm:h-[470px] lg:h-[500px] ${
        inView ? "markers-in" : ""
      }`}
    >
      {/* Pola SVG untuk poligon zona risiko (diagonal merah, titik kuning, silang hijau) */}
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
        <defs>
          <pattern
            id="rm-hatch-high"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="10" height="10" fill="rgba(217,71,74,0.16)" />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="#A32A2A"
              strokeWidth="2.4"
            />
          </pattern>
          <pattern
            id="rm-dots-medium"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <rect width="10" height="10" fill="rgba(242,193,78,0.16)" />
            <circle cx="3" cy="3" r="1.3" fill="#8A6800" />
            <circle cx="8" cy="8" r="1.3" fill="#8A6800" />
          </pattern>
          <pattern
            id="rm-cross-safe"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <rect width="12" height="12" fill="rgba(23,128,95,0.12)" />
            <path
              d="M3 3L9 9M9 3L3 9"
              stroke="#17805F"
              strokeWidth="1.2"
              strokeOpacity="0.55"
            />
          </pattern>
        </defs>
      </svg>

      {/* Kanvas Leaflet */}
      <div
        ref={containerRef}
        role="region"
        aria-label="Peta interaktif kawasan Ranamese, Golo Loni, dan Watu Mori"
        className="ranamese-map h-full w-full"
      />

      {/* Kontrol kanan atas: Kompas + Lokasi saya */}
      <div className="pointer-events-none absolute top-3.5 right-3.5 z-[400] flex flex-col items-end gap-2.5">
        <button
          type="button"
          onClick={handleResetNorth}
          title="Arah Utara (reset tampilan peta)"
          aria-label="Arah Utara, atur ulang tampilan peta"
          className="pointer-events-auto flex h-11 w-11 cursor-pointer flex-col items-center justify-center rounded-xl bg-white text-ink shadow-[0_6px_18px_-4px_rgba(15,42,33,0.28)] ring-1 ring-black/5 transition-transform hover:scale-105"
        >
          <span className="text-[9px] leading-none font-extrabold tracking-tight text-ink">
            U
          </span>
          <svg viewBox="0 0 16 20" className="mt-0.5 h-4 w-3.5" aria-hidden>
            <polygon points="8,0 13,11 8,9 3,11" fill="#D23B3B" />
            <polygon points="8,20 13,11 8,13 3,11" fill="#0F2A21" />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleMyLocation}
          className="pointer-events-auto inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_6px_18px_-4px_rgba(15,42,33,0.28)] ring-1 ring-black/5 transition-colors hover:bg-bg sm:text-[13px]"
        >
          <LocateFixed className="h-4 w-4 text-blue" aria-hidden />
          <span>{locNotice ?? "Lokasi saya"}</span>
        </button>
      </div>

      {/* Kontrol kanan bawah: Zoom + / - */}
      <div className="pointer-events-auto absolute right-3.5 bottom-3.5 z-[400] flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_6px_18px_-4px_rgba(15,42,33,0.28)] ring-1 ring-black/10">
        <button
          type="button"
          onClick={() => handleZoom(1)}
          aria-label="Perbesar peta"
          className="grid h-9 w-9 cursor-pointer place-items-center text-ink transition-colors hover:bg-bg"
        >
          <Plus className="h-4 w-4 stroke-[2.2]" aria-hidden />
        </button>
        <span aria-hidden className="h-px w-full bg-line" />
        <button
          type="button"
          onClick={() => handleZoom(-1)}
          aria-label="Perkecil peta"
          className="grid h-9 w-9 cursor-pointer place-items-center text-ink transition-colors hover:bg-bg"
        >
          <Minus className="h-4 w-4 stroke-[2.2]" aria-hidden />
        </button>
      </div>
    </div>
  );
}
