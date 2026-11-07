"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ImagePlus, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { reportCategories, villages } from "@/data/site";
import { EASE, VIEWPORT, revealUp } from "@/lib/motion";

interface FormErrors {
  name?: string;
  village?: string;
  category?: string;
  detail?: string;
}

export default function ReportForm() {
  const reduced = useReducedMotion();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [photo, setPhoto] = useState<{ name: string; url: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [mag, setMag] = useState({ x: 0, y: 0 });

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Mohon isi nama Anda.";
    if (!village) next.village = "Pilih desa lokasi laporan.";
    if (!category) next.category = "Pilih jenis laporan.";
    if (detail.trim().length < 10)
      next.detail = "Jelaskan kondisi dan lokasi singkat (minimal 10 karakter).";
    return next;
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast("Mohon pilih file gambar (JPG, PNG, atau WEBP).");
      window.setTimeout(() => setToast(null), 3200);
      return;
    }
    if (photo?.url) URL.revokeObjectURL(photo.url);
    const url = URL.createObjectURL(file);
    setPhoto({ name: file.name, url });
  };

  const removePhoto = () => {
    if (photo?.url) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitted(true);
    setToast(
      `Laporan dari ${name.trim()} (${village}) telah dicatat di simulasi posko.`,
    );
    window.setTimeout(() => setToast(null), 4500);
  };

  const handleReset = () => {
    setName("");
    setVillage("");
    setCategory("");
    setDetail("");
    removePhoto();
    setErrors({});
    setSubmitted(false);
  };

  const onBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMag({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.2,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.26,
    });
  };

  return (
    <motion.div
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="relative rounded-[28px] bg-surface p-6 shadow-panel ring-1 ring-ink/5 sm:p-8 lg:p-9"
    >
      <h3 className="font-display text-[21px] font-extrabold tracking-[-0.02em] text-navy sm:text-[24px]">
        Formulir Laporan Warga
      </h3>
      <p className="mt-1 text-[13.5px] text-muted">
        Formulir simulasi — tidak ada data yang dikirim pada prototipe ini.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            role="status"
            aria-live="polite"
            className="mt-6 rounded-[20px] border border-green/25 bg-bg p-6 text-center"
          >
            {/* Centang beranimasi */}
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green text-white shadow-md">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                />
              </svg>
            </div>
            <h4 className="mt-4 font-display text-lg font-extrabold text-ink">
              Laporan Simulasi Diterima
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Terima kasih, <strong className="text-ink">{name}</strong>. Laporan{" "}
              <span className="font-semibold text-ink">{category}</span> untuk desa{" "}
              <span className="font-semibold text-ink">{village}</span> telah
              tersimpan pada simulasi ini.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-full bg-orange px-5 py-2.5 text-xs font-bold text-ink shadow-glow-orange transition-transform hover:scale-[1.02]"
            >
              Kirim Laporan Lain
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-4"
          >
            {/* Nama Anda */}
            <div>
              <label
                htmlFor="report-name"
                className="block text-[13.5px] font-bold text-ink"
              >
                Nama Anda
              </label>
              <input
                id="report-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name)
                    setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "err-name" : undefined}
                className={`mt-1.5 w-full rounded-[14px] border bg-white px-4 py-3 text-[14px] text-ink transition-colors focus:outline-none ${
                  errors.name
                    ? "border-danger focus:border-danger"
                    : "border-line focus:border-blue"
                }`}
              />
              <AnimatePresence initial={false}>
                {errors.name && (
                  <motion.p
                    id="err-name"
                    role="alert"
                    initial={{ opacity: 0, height: 0, y: -4 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="mt-1.5 text-xs font-medium text-danger"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Desa & Jenis laporan */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="report-village"
                  className="block text-[13.5px] font-bold text-ink"
                >
                  Desa
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="report-village"
                    value={village}
                    onChange={(e) => {
                      setVillage(e.target.value);
                      if (errors.village)
                        setErrors((prev) => ({ ...prev, village: undefined }));
                    }}
                    aria-invalid={Boolean(errors.village)}
                    aria-describedby={errors.village ? "err-village" : undefined}
                    className={`w-full cursor-pointer appearance-none rounded-[14px] border bg-white px-4 py-3 pr-9 text-[14px] text-ink transition-colors focus:outline-none ${
                      errors.village
                        ? "border-danger focus:border-danger"
                        : "border-line focus:border-blue"
                    }`}
                  >
                    <option value="">Pilih desa...</option>
                    {villages.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-ink"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <AnimatePresence initial={false}>
                  {errors.village && (
                    <motion.p
                      id="err-village"
                      role="alert"
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="mt-1.5 text-xs font-medium text-danger"
                    >
                      {errors.village}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label
                  htmlFor="report-category"
                  className="block text-[13.5px] font-bold text-ink"
                >
                  Jenis laporan
                </label>
                <div className="relative mt-1.5">
                  <select
                    id="report-category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (errors.category)
                        setErrors((prev) => ({ ...prev, category: undefined }));
                    }}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={
                      errors.category ? "err-category" : undefined
                    }
                    className={`w-full cursor-pointer appearance-none rounded-[14px] border bg-white px-4 py-3 pr-9 text-[14px] text-ink transition-colors focus:outline-none ${
                      errors.category
                        ? "border-danger focus:border-danger"
                        : "border-line focus:border-blue"
                    }`}
                  >
                    <option value="">Pilih kategori...</option>
                    {reportCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-ink"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <AnimatePresence initial={false}>
                  {errors.category && (
                    <motion.p
                      id="err-category"
                      role="alert"
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="mt-1.5 text-xs font-medium text-danger"
                    >
                      {errors.category}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Detail laporan */}
            <div>
              <label
                htmlFor="report-detail"
                className="block text-[13.5px] font-bold text-ink"
              >
                Apa yang Anda lihat dan di mana lokasinya?
              </label>
              <textarea
                id="report-detail"
                rows={4}
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                  if (errors.detail)
                    setErrors((prev) => ({ ...prev, detail: undefined }));
                }}
                placeholder="Contoh: Ada retakan tanah sepanjang ±2 meter di belakang kapela Dusun Roe."
                aria-invalid={Boolean(errors.detail)}
                aria-describedby={errors.detail ? "err-detail" : undefined}
                className={`mt-1.5 w-full resize-y rounded-[14px] border bg-white px-4 py-3 text-[14px] leading-relaxed text-ink placeholder:text-muted/75 transition-colors focus:outline-none ${
                  errors.detail
                    ? "border-danger focus:border-danger"
                    : "border-line focus:border-blue"
                }`}
              />
              <AnimatePresence initial={false}>
                {errors.detail && (
                  <motion.p
                    id="err-detail"
                    role="alert"
                    initial={{ opacity: 0, height: 0, y: -4 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="mt-1.5 text-xs font-medium text-danger"
                  >
                    {errors.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Dropzone foto opsional */}
            <div>
              <label
                htmlFor="report-photo"
                className="block text-[13.5px] font-bold text-ink"
              >
                Foto pendukung (opsional)
              </label>
              <input
                ref={fileInputRef}
                id="report-photo"
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="sr-only"
              />

              {!photo ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFile(e.dataTransfer.files?.[0]);
                  }}
                  className={`mt-1.5 flex w-full cursor-pointer items-center gap-3 rounded-[14px] border-[1.5px] border-dashed px-4 py-3.5 text-[13.5px] text-muted transition-colors ${
                    dragActive
                      ? "border-blue bg-blue-soft/40 text-navy"
                      : "border-[#b7c8be] bg-bg hover:border-blue hover:text-ink"
                  }`}
                >
                  <ImagePlus
                    className="h-5 w-5 shrink-0 stroke-[1.9] text-blue"
                    aria-hidden
                  />
                  <span>Lampirkan foto kondisi lapangan</span>
                </div>
              ) : (
                <div className="mt-1.5 flex items-center justify-between gap-3 rounded-[14px] border border-line bg-bg px-3.5 py-2.5">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={`Pratinjau ${photo.name}`}
                      className="h-11 w-11 shrink-0 rounded-lg object-cover ring-1 ring-black/10"
                    />
                    <span className="truncate text-xs font-semibold text-ink">
                      {photo.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removePhoto}
                    aria-label="Hapus foto pendukung"
                    className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-white hover:text-danger"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              )}
            </div>

            {/* Tombol Kirim Laporan */}
            <div className="pt-1.5">
              <motion.button
                ref={btnRef}
                type="submit"
                onMouseMove={onBtnMove}
                onMouseLeave={() => setMag({ x: 0, y: 0 })}
                animate={{ x: mag.x, y: mag.y }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  mass: 0.5,
                }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-orange px-6 py-3 text-[14px] font-bold text-ink shadow-glow-orange transition-shadow duration-300 hover:shadow-[0_14px_28px_-6px_rgba(245,165,36,0.75)]"
              >
                <Send
                  aria-hidden
                  className="h-4 w-4 stroke-[2.1] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span>Kirim Laporan</span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Toast notifikasi */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed right-5 bottom-5 z-[80] max-w-sm rounded-2xl bg-footer px-4 py-3 text-xs font-medium text-white shadow-xl ring-1 ring-white/15 sm:text-[13px]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
