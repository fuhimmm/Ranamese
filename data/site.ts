export const site = {
  name: "Sambelia",
  tagline: "Sugian · Labuhan Pandan",
  email: "posko@melukisambelia.id",
  whatsapp: "+62 812-3456-7890",
  whatsappHref: "https://wa.me/6281234567890",
  address: ["Posko KKN Desa Labuhan Pandan, Sambelia,", "Lombok Timur, NTB"],
  hours: "Sen–Sab, 08.00–17.00",
  emergency: "Hubungi 112 dahulu",
  copyright: "© 2026 KKN Universitas Gadjah Mada · Tim Melukis Sambelia",
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
    { label: "Peta Sambelia", href: "#tentang" },
  ],
} as const;

export const reportCategories = [
  "Abrasi pantai / rob pesisir",
  "Saluran air / irigasi tersumbat",
  "Tumpukan sampah liar / pesisir",
  "Jalur atau rambu evakuasi rusak",
  "Lainnya",
];

export const villages = ["Sugian", "Labuhan Pandan"];
