export const site = {
  name: "Ranamese",
  tagline: "Golo Loni · Watu Mori",
  email: "posko@satyawatuloni.id",
  whatsapp: "+62 812-3456-7890",
  whatsappHref: "https://wa.me/6281234567890",
  address: ["Balai Desa Golo Loni, Ranamese,", "Manggarai Timur, NTT"],
  hours: "Sen–Sab, 08.00–17.00",
  emergency: "Hubungi 112 dahulu",
  copyright: "© 2026 KKN Universitas Gadjah Mada · Tim Ranamese",
};

export type NavId = "beranda" | "tentang" | "program" | "kontak";

export const navItems: { id: NavId; label: string }[] = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "program", label: "Program" },
  { id: "kontak", label: "Kontak" },
];

export const footerLinks = {
  jelajahi: [
    { label: "Mitigasi Bencana", href: "#program", filter: "Mitigasi Bencana" },
    { label: "Pengelolaan Sampah", href: "#program", filter: "Pengelolaan Sampah" },
    { label: "Pariwisata", href: "#program", filter: "Pariwisata" },
    { label: "Semua Program", href: "#program", filter: "Semua" },
  ],
  desa: [
    { label: "Profil Desa", href: "#tentang" },
    { label: "Data Desa", href: "#tentang" },
    { label: "Peta Ranamese", href: "#tentang" },
  ],
} as const;

export const reportCategories = [
  "Retakan tanah / longsor",
  "Saluran air tersumbat",
  "Tumpukan sampah liar",
  "Jalur atau rambu rusak",
  "Lainnya",
];

export const villages = ["Golo Loni", "Watu Mori"];
