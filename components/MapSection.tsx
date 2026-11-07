"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  Binoculars,
  Check,
  CircleExclamationPoint,
  Clock,
  Copy,
  Cross,
  Database,
  House,
  Layers,
  MapPin,
  Mountain,
  Recycle,
  Route as RouteIcon,
  School,
  ShieldAlert,
  ShieldCheck,
  TriangleExclamationPoint,
  UserCheck,
  Users,
  WavesHorizontal,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SelectedMapItem } from "@/components/MapView";
import SectionHeading from "@/components/SectionHeading";
import {
  PLACE_STYLE,
  RISK_STYLE,
  formatCoord,
  places as allPlaces,
  routes as allRoutes,
  zones as allZones,
  type PlaceKind,
  type RiskLevel,
} from "@/data/map";
import { EASE, VIEWPORT, revealUp } from "@/lib/motion";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Memuat peta Ranamese"
      className="h-[400px] w-full animate-pulse rounded-[20px] bg-map sm:h-[470px] lg:h-[500px]"
    />
  ),
});

function PlaceBadge({
  kind,
  size = "md",
}: {
  kind: PlaceKind;
  size?: "sm" | "md";
}) {
  const s = PLACE_STYLE[kind];
  const dim = size === "sm" ? "h-6 w-6" : "h-9 w-9";
  const ico = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <span
      aria-hidden
      style={{
        backgroundColor: s.bg,
        color: s.fg,
        border: s.ring ? `2px solid ${s.ring}` : undefined,
      }}
      className={`inline-grid shrink-0 place-items-center rounded-full ${dim}`}
    >
      {kind === "kantor" && <House className={ico} />}
      {kind === "danau" && <WavesHorizontal className={ico} />}
      {kind === "sekolah" && <School className={ico} />}
      {kind === "klinik" && <Cross className={ico} />}
      {kind === "kumpul" && <Users className={ico} />}
      {kind === "bank" && <Recycle className={ico} />}
      {kind === "pandang" && <Binoculars className={ico} />}
    </span>
  );
}

function ZoneSwatch({
  level,
  size = "md",
}: {
  level: RiskLevel;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-5 w-5 rounded-[6px]" : "h-8 w-8 rounded-[9px]";
  if (level === "tinggi") {
    return (
      <span
        aria-hidden
        className={`inline-block shrink-0 border-2 border-danger bg-danger/5 ${dim}`}
      />
    );
  }
  if (level === "sedang") {
    return (
      <span
        aria-hidden
        className={`inline-block shrink-0 border-2 border-dashed border-[#8a6800] bg-warn-fill/10 ${dim}`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 border-2 border-dotted border-green bg-green/5 ${dim}`}
    />
  );
}

export default function MapSection() {
  const [query, setQuery] = useState("");
  const [showPlaces, setShowPlaces] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [selected, setSelected] = useState<SelectedMapItem | null>(null);
  const [bottomMode, setBottomMode] = useState<"legend" | "database">("legend");
  const [copiedCoord, setCopiedCoord] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const initialAnchorRef = useRef<HTMLButtonElement | null>(null);
  const didInitialScrollRef = useRef(false);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const q = query.trim().toLowerCase();

  const filteredPlaces = useMemo(
    () =>
      allPlaces.filter(
        (p) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.typeLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.db.code.toLowerCase().includes(q) ||
          p.db.village.toLowerCase().includes(q),
      ),
    [q],
  );

  const filteredZones = useMemo(
    () =>
      allZones.filter(
        (z) =>
          !q ||
          z.name.toLowerCase().includes(q) ||
          z.hazard.toLowerCase().includes(q) ||
          RISK_STYLE[z.level].label.toLowerCase().includes(q) ||
          z.db.code.toLowerCase().includes(q),
      ),
    [q],
  );

  const filteredRoutes = useMemo(
    () =>
      allRoutes.filter(
        (r) =>
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.distance.toLowerCase().includes(q) ||
          r.duration.toLowerCase().includes(q) ||
          r.db.code.toLowerCase().includes(q),
      ),
    [q],
  );

  // Setel posisi awal scroll daftar kanan agar tampilan awal identik dengan desain
  useEffect(() => {
    if (didInitialScrollRef.current || selected) return;
    const container = listRef.current;
    const target = initialAnchorRef.current;
    if (container && target) {
      container.scrollTop = Math.max(0, target.offsetTop - 10);
      didInitialScrollRef.current = true;
    }
  }, [selected]);

  // Bila pengguna mengetik pencarian, kembali ke tampilan daftar & gulir ke atas
  useEffect(() => {
    if (!q) return;
    setSelected(null);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [q]);

  const handleSelect = useCallback((item: SelectedMapItem) => {
    setSelected(item);
    setBottomMode("database");
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, []);

  const handleClearSelection = () => {
    setSelected(null);
    setBottomMode("legend");
  };

  const handleCopyCoord = async (coordText: string) => {
    try {
      await navigator.clipboard.writeText(coordText);
    } catch {}
    setCopiedCoord(true);
    window.setTimeout(() => setCopiedCoord(false), 1800);
  };

  const totalVisible =
    (showPlaces ? filteredPlaces.length : 0) +
    (showZones ? filteredZones.length : 0) +
    (showRoutes ? filteredRoutes.length : 0);

  return (
    <section
      id="tentang"
      ref={sectionRef}
      aria-labelledby="heading-peta"
      className="relative mx-auto max-w-[1220px] px-4 pt-6 pb-16 sm:px-6 sm:pt-10 sm:pb-24"
    >
      <div id="heading-peta">
        <SectionHeading
          eyebrow="TENTANG KAWASAN"
          sansText="Peta"
          serifText="RANAMESE"
        />
      </div>

      {/* Kartu besar peta + panel daftar/database */}
      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-8 rounded-[28px] bg-surface p-4 shadow-panel ring-1 ring-ink/5 sm:mt-10 sm:p-6"
      >
        {/* Baris atas: pencarian + filter chip */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="relative w-full sm:w-[270px]">
            <label htmlFor="map-search" className="sr-only">
              Cari tempat, zona bahaya, atau jalur evakuasi
            </label>
            <input
              id="map-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tempat..."
              className="w-full rounded-full border border-line bg-bg px-5 py-2.5 text-[14px] text-ink placeholder:text-muted/85 focus:border-blue focus:bg-white focus:outline-none"
            />
          </div>

          <div
            role="group"
            aria-label="Filter layer peta"
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            {[
              {
                key: "places",
                label: "Tempat",
                active: showPlaces,
                toggle: () => setShowPlaces((v) => !v),
              },
              {
                key: "zones",
                label: "Zona bahaya",
                active: showZones,
                toggle: () => setShowZones((v) => !v),
              },
              {
                key: "routes",
                label: "Jalur evakuasi",
                active: showRoutes,
                toggle: () => setShowRoutes((v) => !v),
              },
            ].map((chip) => (
              <button
                key={chip.key}
                type="button"
                aria-pressed={chip.active}
                onClick={chip.toggle}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-[13.5px] ${
                  chip.active
                    ? "border-blue-line bg-blue-soft text-navy"
                    : "border-line bg-bg text-muted hover:border-blue-line/50 hover:text-ink"
                }`}
              >
                <Check
                  className={`h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 ${
                    chip.active ? "scale-100 opacity-100" : "scale-75 opacity-40"
                  }`}
                  aria-hidden
                />
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid utama: Peta + Legenda/Ringkasan DB (kiri) dan Panel Daftar/Database (kanan) */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* Kolom kiri: Peta + Kotak Bawah (Legenda <-> Ringkasan Database) */}
          <div className="flex flex-col">
            <MapView
              places={filteredPlaces}
              zones={filteredZones}
              routes={filteredRoutes}
              showPlaces={showPlaces}
              showZones={showZones}
              showRoutes={showRoutes}
              selected={selected}
              onSelect={handleSelect}
              inView={inView}
            />

            {/* Kotak Bawah Peta: Berubah menjadi Ringkasan Database saat titik diklik, atau Legenda */}
            <div
              aria-live="polite"
              className="mt-3 rounded-[18px] border border-[#e2eae5] bg-bg px-4 py-3.5 text-[12.5px] text-ink sm:px-5 sm:py-4 sm:text-[13px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {selected && bottomMode === "database" ? (
                  <motion.div
                    key={`db-bar-${selected.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.24, ease: EASE }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/80 pb-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 font-bold text-navy">
                          <Database className="h-4 w-4 text-blue" aria-hidden />
                          <span>Database Lokasi</span>
                        </span>
                        <span className="rounded-full bg-blue-soft px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-navy">
                          {selected.db.code}
                        </span>
                        <span className="font-bold text-ink">
                          · {selected.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setBottomMode("legend")}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-semibold text-muted transition-colors hover:border-blue hover:text-ink"
                        >
                          <Layers className="h-3 w-3 text-blue" aria-hidden />
                          <span>Lihat Legenda</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleClearSelection}
                          aria-label="Tutup informasi database lokasi"
                          className="grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-white text-muted ring-1 ring-line transition-colors hover:text-ink"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
                      <div>
                        <span className="block text-[10.5px] font-semibold tracking-wide text-muted uppercase">
                          Wilayah / Desa
                        </span>
                        <span className="font-semibold text-ink">
                          {selected.db.village}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-semibold tracking-wide text-muted uppercase">
                          Elevasi
                        </span>
                        <span className="font-semibold text-ink">
                          {selected.db.elevation}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-semibold tracking-wide text-muted uppercase">
                          Kapasitas / Cakupan
                        </span>
                        <span className="font-semibold text-ink">
                          {selected.db.capacityOrArea}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10.5px] font-semibold tracking-wide text-muted uppercase">
                          Status Data
                        </span>
                        <span className="font-semibold text-green">
                          {selected.db.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="legend-bar"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE }}
                  >
                    {/* Baris 1: Zona risiko */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="inline-flex items-center gap-1.5 font-bold text-ink">
                          <Layers className="h-4 w-4 text-blue" aria-hidden />
                          <span>Legenda</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <ZoneSwatch level="tinggi" size="sm" />
                          <TriangleExclamationPoint
                            className="h-3.5 w-3.5 text-danger"
                            aria-hidden
                          />
                          <span>Risiko tinggi (garis diagonal)</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <ZoneSwatch level="sedang" size="sm" />
                          <CircleExclamationPoint
                            className="h-3.5 w-3.5 text-warn"
                            aria-hidden
                          />
                          <span>Risiko sedang (titik-titik)</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <ZoneSwatch level="aman" size="sm" />
                          <ShieldCheck
                            className="h-3.5 w-3.5 text-green"
                            aria-hidden
                          />
                          <span>Zona aman (silang)</span>
                        </span>
                      </div>

                      {selected && (
                        <button
                          type="button"
                          onClick={() => setBottomMode("database")}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-blue-soft px-2.5 py-1 text-[11.5px] font-semibold text-navy"
                        >
                          <Database className="h-3 w-3" aria-hidden />
                          <span>Info Database</span>
                        </button>
                      )}
                    </div>

                    {/* Baris 2: Jalur & Tempat */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <span className="inline-flex items-center gap-2">
                        <span
                          aria-hidden
                          className="inline-flex items-center gap-1 text-green"
                        >
                          <i className="h-1.5 w-1.5 rounded-full bg-green" />
                          <i className="h-1.5 w-1.5 rounded-full bg-green" />
                          <i className="h-1.5 w-1.5 rounded-full bg-green" />
                          <i className="h-1.5 w-1.5 rounded-full bg-green" />
                        </span>
                        <span>Jalur evakuasi</span>
                      </span>

                      {(
                        [
                          "kantor",
                          "danau",
                          "sekolah",
                          "klinik",
                          "kumpul",
                        ] as PlaceKind[]
                      ).map((k) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1.5"
                        >
                          <PlaceBadge kind={k} size="sm" />
                          <span>{PLACE_STYLE[k].label}</span>
                        </span>
                      ))}
                    </div>

                    {/* Baris 3: Bank sampah & Titik pandang */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {(["bank", "pandang"] as PlaceKind[]).map((k) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1.5"
                        >
                          <PlaceBadge kind={k} size="sm" />
                          <span>{PLACE_STYLE[k].label}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Kolom kanan: Berubah menjadi Panel Informasi Database Lokasi saat titik dipilih */}
          <div
            ref={listRef}
            data-lenis-prevent
            aria-label="Panel daftar dan informasi database lokasi"
            className="thin-scroll relative max-h-[540px] overflow-y-auto rounded-[20px] border border-[#e2eae5] bg-white p-3.5 lg:max-h-[630px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {selected ? (
                <motion.div
                  key={`detail-${selected.id}`}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="space-y-4"
                >
                  {/* Bar atas: Tombol kembali ke daftar + Kode Database */}
                  <div className="sticky top-0 z-10 -mx-3.5 -mt-3.5 flex items-center justify-between border-b border-line/80 bg-white/95 px-3.5 py-2.5 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-bg px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-blue-soft hover:text-navy"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                      <span>Kembali ke Daftar</span>
                    </button>

                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-soft px-2.5 py-1 text-[11px] font-extrabold tracking-wider text-navy">
                      <Database className="h-3 w-3 text-blue" aria-hidden />
                      <span>{selected.db.code}</span>
                    </span>
                  </div>

                  {/* Header Lokasi */}
                  <div className="flex items-start gap-3 pt-1">
                    {selected.kind === "place" && selected.placeKind && (
                      <PlaceBadge kind={selected.placeKind} />
                    )}
                    {selected.kind === "zone" && selected.riskLevel && (
                      <span className="mt-0.5">
                        <ZoneSwatch level={selected.riskLevel} />
                      </span>
                    )}
                    {selected.kind === "route" && (
                      <span
                        aria-hidden
                        className="mt-0.5 inline-grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#1e6b4e] text-white"
                      >
                        <RouteIcon className="h-4 w-4" />
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded-full bg-bg px-2.5 py-0.5 text-[11px] font-semibold text-green">
                        {selected.db.status}
                      </span>
                      <h3 className="mt-1 font-display text-[17px] leading-snug font-extrabold text-ink">
                        {selected.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-muted">
                        {selected.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Deskripsi Lokasi */}
                  {selected.description && (
                    <p className="rounded-xl bg-bg p-3 text-[12.5px] leading-relaxed text-ink">
                      {selected.description}
                    </p>
                  )}

                  {/* Tabel Atribut Database Spasial */}
                  <div className="rounded-xl border border-line/85 bg-white p-3">
                    <p className="text-[10.5px] font-bold tracking-[0.14em] text-muted uppercase">
                      Atribut Basis Data Lokasi
                    </p>

                    <dl className="mt-2.5 space-y-2 text-[12.5px]">
                      <div className="flex items-start justify-between gap-2 border-b border-line/50 pb-1.5">
                        <dt className="inline-flex items-center gap-1.5 text-muted">
                          <MapPin className="h-3.5 w-3.5 text-blue" aria-hidden />
                          <span>Desa / Sektor</span>
                        </dt>
                        <dd className="text-right font-semibold text-ink">
                          {selected.db.village}
                          <span className="block text-[11px] font-normal text-muted">
                            {selected.db.sector}
                          </span>
                        </dd>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-b border-line/50 pb-1.5">
                        <dt className="inline-flex items-center gap-1.5 text-muted">
                          <Mountain
                            className="h-3.5 w-3.5 text-green"
                            aria-hidden
                          />
                          <span>Elevasi</span>
                        </dt>
                        <dd className="font-semibold text-ink">
                          {selected.db.elevation}
                        </dd>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-b border-line/50 pb-1.5">
                        <dt className="inline-flex items-center gap-1.5 text-muted">
                          <Layers
                            className="h-3.5 w-3.5 text-orange"
                            aria-hidden
                          />
                          <span>Cakupan / Kapasitas</span>
                        </dt>
                        <dd className="text-right font-semibold text-ink">
                          {selected.db.capacityOrArea}
                        </dd>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-b border-line/50 pb-1.5">
                        <dt className="inline-flex items-center gap-1.5 text-muted">
                          <Clock className="h-3.5 w-3.5 text-blue" aria-hidden />
                          <span>Jam / Akses</span>
                        </dt>
                        <dd className="text-right font-semibold text-ink">
                          {selected.db.operatingHours}
                        </dd>
                      </div>

                      <div className="flex items-start justify-between gap-2 border-b border-line/50 pb-1.5">
                        <dt className="inline-flex items-center gap-1.5 text-muted">
                          <UserCheck
                            className="h-3.5 w-3.5 text-green"
                            aria-hidden
                          />
                          <span>Pengelola</span>
                        </dt>
                        <dd className="text-right font-semibold text-ink">
                          {selected.db.manager}
                        </dd>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <dt className="text-muted">Koordinat GPS</dt>
                        <dd className="flex items-center gap-1.5">
                          <code className="rounded bg-bg px-1.5 py-0.5 text-[11.5px] font-semibold text-navy">
                            {formatCoord(selected.position)}
                          </code>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyCoord(formatCoord(selected.position))
                            }
                            aria-label="Salin koordinat GPS"
                            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-line px-1.5 py-0.5 text-[11px] font-semibold text-muted transition-colors hover:border-blue hover:text-ink"
                          >
                            {copiedCoord ? (
                              <span className="text-green">Tersalin ✓</span>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" aria-hidden />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Fasilitas & Inventaris Tercatat */}
                  <div className="rounded-xl border border-line/85 bg-white p-3">
                    <p className="text-[10.5px] font-bold tracking-[0.14em] text-muted uppercase">
                      Fasilitas & Inventaris Tercatat
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[12.5px] text-ink">
                      {selected.db.facilities.map((fac, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span
                            aria-hidden
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                          />
                          <span>{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Catatan Mitigasi & Lapangan */}
                  <div className="rounded-xl border border-orange/40 bg-[#fff9ec] p-3 text-[12px] leading-relaxed text-ink">
                    <p className="inline-flex items-center gap-1.5 font-bold text-[#7a5200]">
                      <ShieldAlert className="h-3.5 w-3.5 text-orange" aria-hidden />
                      <span>Catatan Mitigasi & Pembaruan ({selected.db.updatedAt})</span>
                    </p>
                    <p className="mt-1 text-ink/90">
                      {selected.db.mitigationNote}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="list-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {totalVisible === 0 && (
                    <p className="py-12 text-center text-sm text-muted">
                      Tidak ada lokasi yang cocok dengan pencarian Anda.
                    </p>
                  )}

                  {/* Daftar Tempat */}
                  {showPlaces && filteredPlaces.length > 0 && (
                    <div className="space-y-1">
                      {filteredPlaces.map((p) => {
                        const subtitle = `${p.typeLabel} · ${formatCoord(p.position)}`;
                        return (
                          <button
                            key={p.id}
                            ref={
                              p.id === "titik-kumpul-b"
                                ? initialAnchorRef
                                : undefined
                            }
                            type="button"
                            onClick={() => {
                              if (!showPlaces) setShowPlaces(true);
                              handleSelect({
                                kind: "place",
                                id: p.id,
                                position: p.position,
                                title: p.name,
                                subtitle,
                                description: p.description,
                                placeKind: p.kind,
                                db: p.db,
                                ts: Date.now(),
                              });
                            }}
                            className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-bg"
                          >
                            <PlaceBadge kind={p.kind} />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[14px] font-bold text-ink">
                                {p.name}
                              </span>
                              <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                                {subtitle}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Daftar Zona Bahaya */}
                  {showZones && filteredZones.length > 0 && (
                    <div
                      className={
                        showPlaces && filteredPlaces.length > 0 ? "mt-3" : ""
                      }
                    >
                      <p className="px-2.5 pb-1.5 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                        ZONA BAHAYA
                      </p>
                      <div className="space-y-1">
                        {filteredZones.map((z) => {
                          const rs = RISK_STYLE[z.level];
                          const subtitle = `${rs.label} · ${z.hazard}`;
                          return (
                            <button
                              key={z.id}
                              type="button"
                              onClick={() =>
                                handleSelect({
                                  kind: "zone",
                                  id: z.id,
                                  position: z.center,
                                  title: z.name,
                                  subtitle,
                                  description: z.description,
                                  riskLevel: z.level,
                                  db: z.db,
                                  ts: Date.now(),
                                })
                              }
                              className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-bg"
                            >
                              <span className="mt-0.5">
                                <ZoneSwatch level={z.level} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[14px] font-bold text-ink">
                                  {z.name}
                                </span>
                                <span
                                  style={{ color: rs.text }}
                                  className="mt-0.5 block text-[12px] leading-snug font-medium"
                                >
                                  {subtitle}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Daftar Jalur Evakuasi */}
                  {showRoutes && filteredRoutes.length > 0 && (
                    <div
                      className={
                        (showPlaces && filteredPlaces.length > 0) ||
                        (showZones && filteredZones.length > 0)
                          ? "mt-2"
                          : ""
                      }
                    >
                      <div className="space-y-1">
                        {filteredRoutes.map((r) => {
                          const subtitle = `${r.distance} · ${r.duration}`;
                          const mid = r.path[Math.floor(r.path.length / 2)];
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() =>
                                handleSelect({
                                  kind: "route",
                                  id: r.id,
                                  position: mid,
                                  title: r.name,
                                  subtitle,
                                  description: r.description,
                                  db: r.db,
                                  ts: Date.now(),
                                })
                              }
                              className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-bg"
                            >
                              <span
                                aria-hidden
                                className="mt-0.5 inline-grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#1e6b4e] text-white"
                              >
                                <RouteIcon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[14px] font-bold text-ink">
                                  {r.name}
                                </span>
                                <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                                  {subtitle}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
