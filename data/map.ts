export type MapId = "irigasi" | "kebencanaan" | "penggunaan-lahan";

export interface LegendGroup {
  title: string;
  items: {
    label: string;
    color: string;
    border?: string;
    line?: boolean;
  }[];
}

export interface GisMapItem {
  id: MapId;
  tabLabel: string;
  shortTitle: string;
  fullTitle: string;
  village: string;
  year: string;
  scale: string;
  datum: string;
  projection: string;
  grid: string;
  /** Kosongkan bila gambar peta sedang dalam tahap penyusunan */
  imageSrc: string | null;
  width: number;
  height: number;
  orientation: "portrait" | "landscape";
  author: string;
  sources: string[];
  summary: string;
  legendGroups: LegendGroup[];
}

export const gisMaps: GisMapItem[] = [
  {
    id: "irigasi",
    tabLabel: "Peta Irigasi",
    shortTitle: "Peta Irigasi & Orde Sungai",
    fullTitle: "Peta Jaringan Irigasi dan Aliran Sungai Kecamatan Sambelia Tahun 2026",
    village: "Desa Sugian & Labuhan Pandan, Kec. Sambelia",
    year: "2026",
    scale: "1 : 50.000",
    datum: "WGS 1984",
    projection: "Universal Transverse Mercator (UTM)",
    grid: "Grid UTM Zona 50S",
    imageSrc: null,
    width: 1200,
    height: 900,
    orientation: "landscape",
    author: "Tim Bidding KKN-PPM UGM Melukis Sambelia",
    sources: [
      "Data Citra Satelit Landsat-8 / Sentinel-2 Tahun 2026",
      "Data SHP Wilayah Kabupaten Lombok Timur",
      "Data Jaringan Irigasi & DAS Lereng Timur Rinjani – Sambelia",
    ],
    summary:
      "Memetakan jaringan saluran irigasi, daerah aliran sungai (DAS) dari lereng timur Gunung Rinjani menuju pesisir Selat Alas, serta distribusi air bagi lahan pertanian di Desa Sugian dan Desa Labuhan Pandan.",
    legendGroups: [
      {
        title: "Jaringan Sungai & Irigasi",
        items: [
          { label: "Orde Sungai 1", color: "#F2EB2E", line: true },
          { label: "Orde Sungai 2", color: "#E629B5", line: true },
          { label: "Orde Sungai 3", color: "#F59E0B", line: true },
          { label: "Saluran Irigasi Primer", color: "#0284C7", line: true },
          { label: "Muara & Garis Pantai", color: "#1E40AF", line: true },
        ],
      },
      {
        title: "Penggunaan Lahan Non-Terbangun",
        items: [
          { label: "Hutan & Mangrove Pesisir", color: "#17805F" },
          { label: "Sawah & Pertanian", color: "#BAE6FD", border: "#0284C7" },
          { label: "Tegalan / Lahan Kering", color: "#F3F199", border: "#9A9748" },
          { label: "Perkebunan Rakyat", color: "#84EE69", border: "#3B8F29" },
        ],
      },
      {
        title: "Terbangun & Transportasi",
        items: [
          { label: "Pemukiman Pesisir", color: "#F59E0B" },
          { label: "Jalan Lintas Sambelia", color: "#B45309", line: true },
          { label: "Jalan Desa / Lingkungan", color: "#9CA3AF", line: true },
        ],
      },
    ],
  },
  {
    id: "kebencanaan",
    tabLabel: "Peta Kebencanaan",
    shortTitle: "Peta Kebencanaan Pesisir",
    fullTitle: "Peta Kerawanan Bencana Pesisir & Jalur Evakuasi Kecamatan Sambelia",
    village: "Desa Labuhan Pandan & Sugian, Kec. Sambelia",
    year: "2026",
    scale: "1 : 38.000",
    datum: "WGS 1984",
    projection: "Universal Transverse Mercator (UTM)",
    grid: "Grid UTM Zona 50S",
    imageSrc: null,
    width: 1200,
    height: 900,
    orientation: "landscape",
    author: "Tim Bidding KKN-PPM UGM Melukis Sambelia",
    sources: [
      "InaRISK BNPB & BPBD Kabupaten Lombok Timur, 2026",
      "Pemetaan Spasial Tim KKN-PPM UGM Melukis Sambelia",
    ],
    summary:
      "Menampilkan zonasi multi-risiko bencana di kawasan pesisir Sambelia (gempa bumi, gelombang pasang/tsunami, banjir bandang, dan abrasi) beserta lokasi Titik Kumpul darurat dan rute Jalur Evakuasi menuju dataran tinggi.",
    legendGroups: [
      {
        title: "Tingkat Risiko Bencana",
        items: [
          { label: "Risiko Rendah", color: "#F7C58E", border: "#B88752" },
          { label: "Risiko Sedang", color: "#C6E0A8", border: "#7C9B5B" },
          { label: "Risiko Tinggi", color: "#2D7BB6", border: "#1D5682" },
        ],
      },
      {
        title: "Mitigasi & Permukiman",
        items: [
          { label: "Titik Kumpul Evakuasi", color: "#C81E1E", border: "#111827" },
          { label: "Jalur Evakuasi", color: "#18E618", line: true },
          { label: "Permukiman Warga", color: "#F5F21B", border: "#A3A100" },
        ],
      },
      {
        title: "Jaringan Jalan & Perairan",
        items: [
          { label: "Jalan Kolektor", color: "#0F172A", line: true },
          { label: "Jalan Lokal", color: "#334155", line: true },
          { label: "Alur Sungai & Muara", color: "#2563EB", line: true },
        ],
      },
    ],
  },
  {
    id: "penggunaan-lahan",
    tabLabel: "Peta Penggunaan Lahan",
    shortTitle: "Peta Penggunaan Lahan",
    fullTitle: "Peta Penggunaan Lahan Kawasan Pesisir Kecamatan Sambelia Tahun 2026",
    village: "Desa Sugian & Labuhan Pandan, Kec. Sambelia",
    year: "2026",
    scale: "1 : 50.000",
    datum: "WGS 1984",
    projection: "Universal Transverse Mercator (UTM)",
    grid: "Grid UTM Zona 50S",
    imageSrc: null,
    width: 1200,
    height: 900,
    orientation: "landscape",
    author: "Tim Bidding KKN-PPM UGM Melukis Sambelia",
    sources: [
      "Data Citra Satelit Landsat-8 Tahun 2026",
      "Data SHP Desa Wilayah Kabupaten Lombok Timur",
      "Data Tata Guna Lahan Kecamatan Sambelia",
    ],
    summary:
      "Menggambarkan tutupan lahan Kecamatan Sambelia mulai dari sabuk hutan mangrove dan pesisir penyeberangan Gili Kondo, lahan pertanian dan perkebunan warga, hingga koridor permukiman di Desa Sugian dan Labuhan Pandan.",
    legendGroups: [
      {
        title: "Penggunaan Lahan Non-Terbangun",
        items: [
          { label: "Hutan & Mangrove", color: "#28A70F" },
          { label: "Perkebunan", color: "#84EE69", border: "#3B8F29" },
          { label: "Sawah & Ladang", color: "#BAE6FD", border: "#0284C7" },
          { label: "Lahan Terbuka / Pasir", color: "#F3F199", border: "#9A9748" },
          { label: "Semak Belukar", color: "#C7E9C0" },
        ],
      },
      {
        title: "Penggunaan Lahan Terbangun",
        items: [
          { label: "Pemukiman", color: "#F59E0B" },
          { label: "Fasilitas Umum & Dermaga", color: "#FACC15" },
          { label: "Pekarangan", color: "#9CA3AF" },
        ],
      },
      {
        title: "Perairan & Transportasi",
        items: [
          { label: "Perairan Selat Alas", color: "#0B5ED7" },
          { label: "Sungai", color: "#2563EB", line: true },
          { label: "Jalan Utama Desa", color: "#D97706", line: true },
        ],
      },
    ],
  },
];
