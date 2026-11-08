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
  imageSrc: string;
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
    fullTitle: "Peta Orde Sungai dan Penggunaan Lahan Desa Watu Mori Tahun 2026",
    village: "Desa Watu Mori, Kec. Rana Mese",
    year: "2026",
    scale: "1 : 50.000",
    datum: "WGS 1984",
    projection: "Universal Transverse Mercator (UTM)",
    grid: "Grid UTM",
    imageSrc: "/images/maps/peta-irigasi.jpeg",
    width: 904,
    height: 1280,
    orientation: "portrait",
    author: "Tim Bidding KKN-PPM UGM Karsa Nitya",
    sources: [
      "Data Citra Landsat-8 Tahun 2026",
      "Data SHP Desa Wilayah Kabupaten Manggarai",
      "Data Penggunaan Lahan Wilayah Desa Watu Mori",
      "Data Orde Sungai Wilayah Ranamese",
    ],
    summary:
      "Memetakan jaringan alur irigasi dan hierarki orde sungai (Orde 1 hingga Orde 5) yang mengaliri kawasan persawahan, perkebunan, serta permukiman warga di Desa Watu Mori.",
    legendGroups: [
      {
        title: "Orde Sungai (Jaringan Irigasi)",
        items: [
          { label: "Orde Sungai 1", color: "#F2EB2E", line: true },
          { label: "Orde Sungai 2", color: "#E629B5", line: true },
          { label: "Orde Sungai 3", color: "#F59E0B", line: true },
          { label: "Orde Sungai 4", color: "#1F2937", line: true },
          { label: "Orde Sungai 5", color: "#1E40AF", line: true },
        ],
      },
      {
        title: "Penggunaan Lahan Non-Terbangun",
        items: [
          { label: "Hutan Rakyat", color: "#A7D99B", border: "#4D8B43" },
          { label: "Lahan Terbuka", color: "#F3F199", border: "#9A9748" },
          { label: "Pekarangan", color: "#9CA3AF" },
          { label: "Perkebunan", color: "#84EE69", border: "#3B8F29" },
          { label: "Sawah", color: "#BAE6FD", border: "#0284C7" },
          { label: "Semak Belukar", color: "#C7E9C0" },
        ],
      },
      {
        title: "Terbangun & Transportasi",
        items: [
          { label: "Pemukiman", color: "#F59E0B" },
          { label: "Olahraga", color: "#FACC15" },
          { label: "Pemakaman", color: "#4B5563" },
          { label: "Jalan Kolektor", color: "#B45309", line: true },
          { label: "Jalan Setapak", color: "#D1D5DB", line: true },
        ],
      },
    ],
  },
  {
    id: "kebencanaan",
    tabLabel: "Peta Kebencanaan",
    shortTitle: "Peta Kebencanaan Desa",
    fullTitle: "Peta Kebencanaan Desa Golo Loni",
    village: "Desa Golo Loni, Kec. Rana Mese",
    year: "2026",
    scale: "1 : 38.000",
    datum: "WGS 1984",
    projection: "Universal Transverse Mercator (UTM)",
    grid: "Grid UTM",
    imageSrc: "/images/maps/peta-kebencanaan.png",
    width: 3507,
    height: 2480,
    orientation: "landscape",
    author: "Tim Bidding KKN PPM UGM Periode II Ranamese Manise 2027",
    sources: [
      "InaRISK BNPB, 2026",
      "Pemetaan Spasial Tim KKN-PPM UGM Ranamese",
    ],
    summary:
      "Menampilkan zonasi tingkat risiko bencana (Rendah, Sedang, Tinggi) di Desa Golo Loni beserta sebaran Titik Kumpul darurat, rute Jalur Evakuasi, jaringan jalan, dan alur sungai.",
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
          { label: "Perumahan", color: "#F5F21B", border: "#A3A100" },
        ],
      },
      {
        title: "Jaringan Jalan & Perairan",
        items: [
          { label: "Jalan Kolektor", color: "#0F172A", line: true },
          { label: "Jalan Lokal", color: "#1E293B", line: true },
          { label: "Jalan Lingkungan", color: "#334155", line: true },
          { label: "Sungai", color: "#2563EB", line: true },
        ],
      },
    ],
  },
  {
    id: "penggunaan-lahan",
    tabLabel: "Peta Penggunaan Lahan",
    shortTitle: "Peta Penggunaan Lahan",
    fullTitle: "Peta Penggunaan Lahan Desa Golo Loni Tahun 2026",
    village: "Desa Golo Loni, Kec. Rana Mese",
    year: "2026",
    scale: "1 : 50.000",
    datum: "WGS 1984",
    projection: "Universal Transverse Mercator (UTM)",
    grid: "Grid UTM",
    imageSrc: "/images/maps/peta-penggunaan-lahan.jpeg",
    width: 904,
    height: 1280,
    orientation: "portrait",
    author: "Tim Bidding KKN-PPM UGM Karsa Nitya",
    sources: [
      "Data Citra Landsat-8 Tahun 2026",
      "Data SHP Desa Wilayah Kabupaten Manggarai",
      "Data Penggunaan Lahan Wilayah Desa Golo Loni",
    ],
    summary:
      "Menggambarkan tata guna lahan Desa Golo Loni yang mencakup bentang Hutan Lahan Tinggi di sisi barat, kawasan Danau di utara, serta hamparan sawah, perkebunan, dan pemukiman warga.",
    legendGroups: [
      {
        title: "Penggunaan Lahan Non-Terbangun",
        items: [
          { label: "Hutan Lahan Tinggi", color: "#28A70F" },
          { label: "Hutan Rakyat", color: "#A7D99B", border: "#4D8B43" },
          { label: "Lahan Terbuka", color: "#F3F199", border: "#9A9748" },
          { label: "Pekarangan", color: "#9CA3AF" },
          { label: "Perkebunan", color: "#84EE69", border: "#3B8F29" },
          { label: "Sawah", color: "#BAE6FD", border: "#0284C7" },
          { label: "Semak Belukar", color: "#C7E9C0" },
        ],
      },
      {
        title: "Penggunaan Lahan Terbangun",
        items: [
          { label: "Pemukiman", color: "#F59E0B" },
          { label: "Olahraga", color: "#FACC15" },
          { label: "Pemakaman", color: "#4B5563" },
        ],
      },
      {
        title: "Perairan & Transportasi",
        items: [
          { label: "Danau", color: "#0B5ED7" },
          { label: "Sungai", color: "#2563EB", line: true },
          { label: "Jalan Kolektor", color: "#D97706", line: true },
          { label: "Jalan Setapak", color: "#D1D5DB", line: true },
        ],
      },
    ],
  },
];
