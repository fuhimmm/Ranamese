export type LatLng = [number, number];

export type PlaceKind = "kantor" | "danau" | "sekolah" | "klinik" | "kumpul" | "bank" | "pandang";
export type RiskLevel = "tinggi" | "sedang" | "aman";

export interface LocationDatabaseRecord {
  /** Kode unik pada basis data spasial desa */
  code: string;
  village: string;
  sector: string;
  elevation: string;
  status: string;
  capacityOrArea: string;
  operatingHours: string;
  manager: string;
  updatedAt: string;
  facilities: string[];
  mitigationNote: string;
}

export interface Place {
  id: string;
  kind: PlaceKind;
  name: string;
  /** Tipe yang ditampilkan di subjudul daftar, mis. "Titik kumpul" */
  typeLabel: string;
  position: LatLng;
  /** Label permanen di peta (seperti pada desain) */
  showLabel?: boolean;
  description: string;
  db: LocationDatabaseRecord;
}

export interface Zone {
  id: string;
  name: string;
  level: RiskLevel;
  hazard: string;
  center: LatLng;
  polygon: LatLng[];
  /** Zona aman tidak memiliki pin pada desain */
  pin: boolean;
  description: string;
  db: LocationDatabaseRecord;
}

export interface Route {
  id: string;
  name: string;
  distance: string;
  duration: string;
  path: LatLng[];
  /** indeks titik pada path yang diberi panah arah */
  arrows: number[];
  description: string;
  db: LocationDatabaseRecord;
}

export const MAP_CENTER: LatLng = [-8.6453, 120.5785];
export const MAP_ZOOM = 14.5;

export const PLACE_STYLE: Record<PlaceKind, { label: string; bg: string; fg: string; ring?: string }> = {
  kantor: { label: "Kantor desa", bg: "#1A62D6", fg: "#ffffff" },
  danau: { label: "Danau", bg: "#1F8A68", fg: "#ffffff" },
  sekolah: { label: "Sekolah", bg: "#F5A524", fg: "#0F2A21" },
  klinik: { label: "Klinik", bg: "#ffffff", fg: "#D23B3B", ring: "#D23B3B" },
  kumpul: { label: "Titik kumpul", bg: "#1E6B4E", fg: "#ffffff" },
  bank: { label: "Bank sampah", bg: "#0B3B2E", fg: "#F5D04A" },
  pandang: { label: "Titik pandang", bg: "#072F73", fg: "#ffffff" },
};

export const RISK_STYLE: Record<RiskLevel, { label: string; text: string }> = {
  tinggi: { label: "Risiko tinggi", text: "#A32A2A" },
  sedang: { label: "Risiko sedang", text: "#7A5C00" },
  aman: { label: "Zona aman", text: "#17805F" },
};

/** Membuat poligon tak beraturan (deterministik) di sekitar titik pusat. */
function blob(center: LatLng, radiusDeg: number, seed: number, stretch = 1.25): LatLng[] {
  const pts: LatLng[] = [];
  const n = 11;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const wobble = 0.78 + 0.32 * Math.abs(Math.sin(seed * 12.9898 + i * 78.233));
    const r = radiusDeg * wobble;
    pts.push([center[0] + Math.sin(a) * r, center[1] + Math.cos(a) * r * stretch]);
  }
  return pts;
}

export const places: Place[] = [
  {
    id: "kantor-golo-loni",
    kind: "kantor",
    name: "Kantor Desa Golo Loni",
    typeLabel: "Kantor desa",
    position: [-8.6548, 120.5613],
    showLabel: true,
    description:
      "Pusat administrasi pemerintahan Desa Golo Loni, lokasi Sekretariat Posko Siaga Bencana Desa, serta tempat pemasangan Peta Risiko Desa hasil pemetaan partisipatif bersama warga.",
    db: {
      code: "DB-GL-KTR01",
      village: "Desa Golo Loni",
      sector: "Dusun Golo Loni Tengah · Kec. Rana Mese",
      elevation: "1.145 mdpl",
      status: "Aktif · Posko Utama Desa",
      capacityOrArea: "Aula & Halaman ±180 Orang",
      operatingHours: "Senin–Sabtu, 08.00–16.00 WITA",
      manager: "Pemerintah Desa Golo Loni & Tim Siaga Desa",
      updatedAt: "Juli 2026",
      facilities: [
        "Papan Peta Risiko & Jalur Evakuasi Desa Cetak (A0)",
        "Perangkat Komunikasi Radio HT & Kentongan Peringatan",
        "Kotak P3K Terpadu & Tandu Darurat",
        "Gudang Logistik Dasar & Genset Cadangan",
      ],
      mitigationNote:
        "Berada di zona lereng landai yang stabil; berfungsi sebagai pusat komando lapangan dan titik koordinasi relawan dusun saat cuaca ekstrem.",
    },
  },
  {
    id: "kantor-watu-mori",
    kind: "kantor",
    name: "Kantor Desa Watu Mori",
    typeLabel: "Kantor desa",
    position: [-8.6408, 120.5871],
    showLabel: true,
    description:
      "Pusat pelayanan masyarakat Desa Watu Mori yang menjadi simpul informasi jalur evakuasi sektor timur dan pusat koordinasi kelompok tani kopi serta perajin tenun Songke.",
    db: {
      code: "DB-WM-KTR02",
      village: "Desa Watu Mori",
      sector: "Dusun Watu Mori Satu · Kec. Rana Mese",
      elevation: "1.190 mdpl",
      status: "Aktif · Posko Koordinasi Timur",
      capacityOrArea: "Balai Pertemuan ±150 Orang",
      operatingHours: "Senin–Sabtu, 08.00–16.00 WITA",
      manager: "Pemerintah Desa Watu Mori",
      updatedAt: "Agustus 2026",
      facilities: [
        "Papan Informasi Geospasial & Data Kependudukan Dusun",
        "Pos Koordinasi Relawan Pemuda Pendamping Lansia",
        "Pojok Katalog Wisata Kopi & Tenun Songke Watu Mori",
        "Saluran Drainase Keliling & Penampung Air Hujan",
      ],
      mitigationNote:
        "Terhubung langsung dengan Jalur Evakuasi B menuju Titik Kumpul B di Halaman Gereja Watu Mori (jarak tempuh berjalan ±4 menit).",
    },
  },
  {
    id: "danau-ranamese",
    kind: "danau",
    name: "Danau Ranamese",
    typeLabel: "Danau",
    position: [-8.6389, 120.5615],
    showLabel: true,
    description:
      "Danau kawah vulkanik seluas ±11,5 hektare dengan kedalaman mencapai 43 meter yang dikelilingi hutan hujan pegunungan basah, habitat anggrek hutan dan burung endemik Flores.",
    db: {
      code: "DB-RNM-WTR01",
      village: "Kawasan TWAL Danau Ranamese",
      sector: "Perbatasan Golo Loni – Watu Mori",
      elevation: "1.220 mdpl",
      status: "Kawasan Konservasi & Ekowisata Aktif",
      capacityOrArea: "Luas Danau ±11,5 Ha · Jalur 2,4 km",
      operatingHours: "Setiap Hari, 07.00–17.30 WITA",
      manager: "BKSDA NTT & Kelompok Pemandu Lokal Ranamese",
      updatedAt: "September 2026",
      facilities: [
        "Jalur Trekking Melingkar 2,4 km dengan Rambu Dwibahasa",
        "3 Titik Dek Istirahat & Papan Interpretasi Kode QR",
        "Pos Jaga Gerbang & Titik Kantong Sampah Terpilah",
        "Rambu Peringatan Tebing Rawan Longsor di Tepi Timur",
      ],
      mitigationNote:
        "Sisi barat daya cenderung landai namun berisiko genangan saat hujan lebat, sedangkan tebing timur memiliki kemiringan curam (>40°). Pengunjung diarahkan ke Jalur Evakuasi A bila turun hujan deras berkepanjangan.",
    },
  },
  {
    id: "sdk-golo-loni",
    kind: "sekolah",
    name: "SDK Golo Loni",
    typeLabel: "Sekolah",
    position: [-8.6533, 120.5633],
    description:
      "Sekolah Dasar Katolik Golo Loni yang menjadi mitra utama pelaksanaan Kelas Membaca Peta & Kesiapsiagaan Bencana bagi siswa kelas 4 hingga kelas 6 setiap hari Rabu.",
    db: {
      code: "DB-GL-EDU01",
      village: "Desa Golo Loni",
      sector: "Dusun Golo Loni · Koridor Selatan",
      elevation: "1.152 mdpl",
      status: "Sekolah Siaga Bencana (SSB)",
      capacityOrArea: "6 Ruang Kelas · 165 Siswa & Guru",
      operatingHours: "Senin–Sabtu, 07.00–13.30 WITA",
      manager: "Kepala Sekolah & Tim Guru SDK Golo Loni",
      updatedAt: "Agustus 2026",
      facilities: [
        "Sudut Literasi Peta, Kompas, & Modul Siaga Bencana",
        "Rambu Panah Evakuasi Kelas & Lonceng Tanda Bahaya",
        "Lapangan Halaman Sekolah untuk Titik Berkumpul Sementara",
        "Tempat Sampah Terpilah Organik & Anorganik",
      ],
      mitigationNote:
        "Memiliki akses langsung ke jalan poros desa menuju Titik Kumpul A di Lapangan Desa Golo Loni tanpa melewati lereng curam.",
    },
  },
  {
    id: "pustu-watu-mori",
    kind: "klinik",
    name: "Pustu Watu Mori",
    typeLabel: "Klinik",
    position: [-8.6426, 120.5856],
    description:
      "Puskesmas Pembantu (Pustu) Watu Mori yang melayani pemeriksaan kesehatan dasar warga sekaligus menjadi pos medis rujukan pertama saat simulasi dan kondisi darurat desa.",
    db: {
      code: "DB-WM-HLT01",
      village: "Desa Watu Mori",
      sector: "Dusun Watu Mori Tengah",
      elevation: "1.182 mdpl",
      status: "Aktif · Pos Kesehatan Siaga 24 Jam",
      capacityOrArea: "Ruang Periksa, Tindakan & 4 Tempat Tidur",
      operatingHours: "Pelayanan 08.00–14.00 WITA (Darurat 24 Jam)",
      manager: "Bidan Desa & Perawat Pustu Watu Mori",
      updatedAt: "September 2026",
      facilities: [
        "Perlengkapan Pertolongan Pertama & Stabilisasi Cedera",
        "Obat-obatan Esensial, Oksigen Portabel, & Tandu Lipat",
        "Pos Pemeriksaan Kesehatan Ibu-Anak & Lansia",
        "Jalur Akses Prioritas menuju Titik Kumpul B",
      ],
      mitigationNote:
        "Saat terjadi peringatan dini longsor, tenaga kesehatan Pustu membawa tas medis darurat (emergency kit) untuk membuka pos triase di Titik Kumpul B Halaman Gereja.",
    },
  },
  {
    id: "titik-kumpul-a",
    kind: "kumpul",
    name: "Titik Kumpul A · Lapangan Desa Golo Loni",
    typeLabel: "Titik kumpul",
    position: [-8.6503, 120.5674],
    description:
      "Lokasi berkumpul darurat utama bagi warga Desa Golo Loni dan pengunjung kawasan Danau Ranamese, terletak di dataran tinggi terbuka yang bebas dari ancaman longsor maupun banjir.",
    db: {
      code: "DB-GL-EVK01",
      village: "Desa Golo Loni",
      sector: "Dataran Tinggi Golo Loni Timur",
      elevation: "1.168 mdpl",
      status: "Zona Aman Terverifikasi · Siap Pakai",
      capacityOrArea: "Luas ±2.400 m² · Kapasitas ±600 Orang",
      operatingHours: "Terbuka 24 Jam",
      manager: "Satgas Siaga Bencana Desa Golo Loni",
      updatedAt: "Juli 2026",
      facilities: [
        "Tiang Rambu Titik Kumpul Reflektif & Papan Sektor Dusun",
        "Area Terbuka Datar untuk Pendirian Tenda Pengungsian",
        "Akses Kendaraan Evakuasi & Distribusi Logistik",
        "Dekat Sumber Air Bersih Perpipaan Desa",
      ],
      mitigationNote:
        "Merupakan titik akhir dari Jalur Evakuasi A (2,1 km dari tepi Danau Ranamese). Bebas dari pohon besar rapuh dan berada jauh di atas elevasi banjir Sungai Wae Mese.",
    },
  },
  {
    id: "titik-kumpul-b",
    kind: "kumpul",
    name: "Titik Kumpul B · Halaman Gereja Watu Mori",
    typeLabel: "Titik kumpul",
    position: [-8.6379, 120.5883],
    description:
      "Titik kumpul evakuasi utama sektor Desa Watu Mori yang telah diuji dalam simulasi skala penuh bersama 412 warga dengan waktu capai rata-rata 19 menit.",
    db: {
      code: "DB-WM-EVK02",
      village: "Desa Watu Mori",
      sector: "Kompleks Gereja & Mbaru Gendang Watu Mori",
      elevation: "1.205 mdpl",
      status: "Zona Aman Terverifikasi · Teruji Simulasi",
      capacityOrArea: "Luas ±1.950 m² · Kapasitas ±500 Orang",
      operatingHours: "Terbuka 24 Jam",
      manager: "Pengurus Stasi & Satgas Siaga Desa Watu Mori",
      updatedAt: "September 2026",
      facilities: [
        "Pelataran Perkerasan Luas & Aula Pelindung Hujan",
        "Pos Absensi Evakuasi per Dusun & Pos Medis Darurat",
        "Sanitasi Umum & Penampungan Air Bersih",
        "Penerangan Mandiri & Akses Jalan Utama Desa",
      ],
      mitigationNote:
        "Titik akhir Jalur Evakuasi B (1,4 km). Terbukti mampu menampung seluruh warga lereng bawah Watu Mori dalam simulasi evakuasi 19 menit.",
    },
  },
  {
    id: "bank-sampah",
    kind: "bank",
    name: "Bank Sampah Mese Bersih",
    typeLabel: "Bank sampah",
    position: [-8.6493, 120.5622],
    description:
      "Sentra penimbangan, pemilahan, dan pencatatan tabungan daur ulang warga Desa Golo Loni yang telah menghimpun 214 nasabah aktif dan 1,8 ton sampah terpilah.",
    db: {
      code: "DB-GL-ENV01",
      village: "Desa Golo Loni",
      sector: "Dusun Golo Loni Barat",
      elevation: "1.158 mdpl",
      status: "Beroperasi Rutin · 214 Nasabah Aktif",
      capacityOrArea: "Gudang Pilah 5 Kategori · 1,8 Ton Terkumpul",
      operatingHours: "Setiap Sabtu, 08.00–11.30 WITA",
      manager: "Kader PKK & Pengurus Bank Sampah Mese Bersih",
      updatedAt: "Oktober 2026",
      facilities: [
        "Timbangan Gantung & Meja Administrasi Buku Rekening",
        "5 Petak Karung Pilah (PET, HDPE, Kaleng, Kardus, Kaca)",
        "Ruang Penyimpanan Kering Terlindung Hujan",
        "Papan Harga Satuan Daur Ulang & Edukasi Takakura",
      ],
      mitigationNote:
        "Mengurangi kebiasaan pembakaran sampah dan penyumbatan saluran drainase desa oleh limbah plastik rumah tangga.",
    },
  },
  {
    id: "titik-pandang",
    kind: "pandang",
    name: "Titik Pandang Golo Curu",
    typeLabel: "Titik pandang",
    position: [-8.6367, 120.5671],
    description:
      "Punggung bukit terbuka di sebelah timur laut Danau Ranamese dengan panorama lanskap kaldera, kanopi hutan pegunungan, dan siluet perbukitan Manggarai Timur.",
    db: {
      code: "DB-RNM-VWP01",
      village: "Perbatasan Golo Loni – Watu Mori",
      sector: "Punggung Bukit Golo Curu",
      elevation: "1.285 mdpl",
      status: "Titik Ekowisata & Pemantauan Visual",
      capacityOrArea: "Dek Pandang Kayu · Maks. 25 Orang",
      operatingHours: "06.30–17.00 WITA (Ditutup Saat Hujan Lebat)",
      manager: "Kelompok Sadar Wisata (Pokdarwis) Ranamese",
      updatedAt: "September 2026",
      facilities: [
        "Anjungan Pandang Kayu dengan Pagar Pengaman",
        "Papan Orientasi Puncak & Informasi Burung Endemik",
        "Kode QR Cerita Geologi Kaldera Ranamese",
        "Rambu Peringatan Batas Tebing Terjal",
      ],
      mitigationNote:
        "Berada dekat batas utara Zona Longsor Tepi Timur; pengunjung wajib tetap berada di dalam pagar anjungan dan turun kembali bila kabut tebal atau hujan deras.",
    },
  },
];

export const zones: Zone[] = [
  {
    id: "zona-longsor-tepi-timur",
    name: "Zona Longsor Tepi Timur",
    level: "tinggi",
    hazard: "Longsor",
    center: [-8.6382, 120.5653],
    polygon: blob([-8.6382, 120.5653], 0.0016, 1),
    pin: true,
    description:
      "Lereng kaldera sisi timur Danau Ranamese dengan kemiringan >40° dan lapisan tanah vulkanik gembur yang jenuh air saat puncak musim hujan.",
    db: {
      code: "DB-HZD-HI01",
      village: "Kawasan Danau Ranamese – Golo Loni",
      sector: "Tebing Kaldera Sisi Timur",
      elevation: "1.230–1.275 mdpl",
      status: "Risiko Tinggi · Pantauan Prioritas",
      capacityOrArea: "Radius Rawan ±180 m · Kemiringan >40°",
      operatingHours: "Dilarang Berhenti Saat Hujan Deras",
      manager: "Tim Pemantau Mitigasi Desa & BKSDA",
      updatedAt: "Juli 2026",
      facilities: [
        "3 Titik Rambu Peringatan Bahaya Longsor",
        "Patok Geser Pemantau Retakan Tanah Sederhana",
        "Jalur Pengalihan Menuju Sisi Barat Danau",
      ],
      mitigationNote:
        "Terdapat 14 titik retakan mikro hasil pemetaan partisipatif. Jalur di segmen ini ditutup sementara apabila curah hujan lebat berlangsung lebih dari 2 jam.",
    },
  },
  {
    id: "tebing-jalan-watu-mori",
    name: "Tebing Jalan Watu Mori",
    level: "tinggi",
    hazard: "Jatuhan batu & longsor",
    center: [-8.6325, 120.5619],
    polygon: blob([-8.6325, 120.5619], 0.0015, 2),
    pin: true,
    description:
      "Segmen tebing potongan jalan penghubung utara yang memiliki singkapan batuan kekar dan potensi guguran material ke badan jalan.",
    db: {
      code: "DB-HZD-HI02",
      village: "Koridor Lintas Ranamese – Watu Mori",
      sector: "Tebing Jalan Poros Utara",
      elevation: "1.260 mdpl",
      status: "Risiko Tinggi · Rawan Guguran Batu",
      capacityOrArea: "Panjang Segmen Tebing ±220 Meter",
      operatingHours: "Waspada 24 Jam (Terutama Musim Hujan)",
      manager: "Satgas Siaga Desa & Relawan Pemantau Jalan",
      updatedAt: "Agustus 2026",
      facilities: [
        "Rambu Peringatan Jatuhan Batu di Kedua Ujung Tikungan",
        "Saluran Parit Pengarah Air Permukaan di Kaki Tebing",
        "Penanaman Vegetasi Akar Pengikat di Bahu Lereng",
      ],
      mitigationNote:
        "Pengendara dan pejalan kaki dilarang berhenti di bawah dinding tebing. Apabila ditemukan guguran batu baru, segera laporkan melalui fitur Lapor ke Posko.",
    },
  },
  {
    id: "tepi-danau-barat-daya",
    name: "Tepi Danau Barat Daya",
    level: "sedang",
    hazard: "Banjir",
    center: [-8.6414, 120.561],
    polygon: blob([-8.6414, 120.561], 0.0019, 3),
    pin: true,
    description:
      "Cekungan tepian barat daya Danau Ranamese yang mengalami kenaikan muka air musiman dan genangan jalur setapak saat hujan intensitas tinggi.",
    db: {
      code: "DB-HZD-MD01",
      village: "Kawasan Danau Ranamese",
      sector: "Tepian Barat Daya & Pangkal Jalur A",
      elevation: "1.218 mdpl",
      status: "Risiko Sedang · Genangan Musiman",
      capacityOrArea: "Area Cekungan ±1,6 Hektare",
      operatingHours: "Pantauan Ketinggian Muka Air",
      manager: "Kelompok Pemandu Wisata Ranamese",
      updatedAt: "September 2026",
      facilities: [
        "Tongkat Ukur Muka Air (Peilschaal) Tepi Danau",
        "Titik Awal Rambu Jalur Evakuasi A ke Arah Selatan",
        "Jembatan Pijakan Kayu pada Segmen Tanah Lembek",
      ],
      mitigationNote:
        "Bila muka air naik melewati batas kuning pada tongkat ukur, pengunjung diarahkan keluar melalui pangkal Jalur Evakuasi A menuju Golo Loni.",
    },
  },
  {
    id: "tepi-sungai-wae-mese",
    name: "Tepi Sungai Wae Mese",
    level: "sedang",
    hazard: "Banjir bandang & erosi",
    center: [-8.6446, 120.5842],
    polygon: blob([-8.6446, 120.5842], 0.0018, 4, 1.5),
    pin: true,
    description:
      "Sempadan alur Sungai Wae Mese di hilir perbukitan Watu Mori yang berisiko mengalami kenaikan debit mendadak serta gerusan tebing sungai.",
    db: {
      code: "DB-HZD-MD02",
      village: "Desa Watu Mori",
      sector: "Lembah Aliran Sungai Wae Mese",
      elevation: "1.135 mdpl",
      status: "Risiko Sedang · Sempadan Sungai",
      capacityOrArea: "Koridor Sempadan ±350 Meter",
      operatingHours: "Pantauan Debit Air Hulu",
      manager: "Kelompok Tani & Satgas Siaga Watu Mori",
      updatedAt: "Agustus 2026",
      facilities: [
        "Rambu Batas Aman Sempadan Sungai",
        "Bronjong Batu Sederhana & Rumpun Bambu Penahan Erosi",
        "Akses Tanjakan Langsung ke Jalur Evakuasi B",
      ],
      mitigationNote:
        "Warga yang beraktivitas di kebun tepi sungai wajib segera naik ke arah Dusun Watu Mori melalui Jalur Evakuasi B apabila air sungai berubah keruh pekat.",
    },
  },
  {
    id: "dataran-tinggi-golo-loni",
    name: "Dataran Tinggi Golo Loni",
    level: "aman",
    hazard: "Zona aman",
    center: [-8.6519, 120.5688],
    polygon: blob([-8.6519, 120.5688], 0.0017, 5),
    pin: false,
    description:
      "Zona punggungan datar dan stabil di bagian timur Desa Golo Loni yang ditetapkan sebagai kawasan aman evakuasi serta lokasi Titik Kumpul A.",
    db: {
      code: "DB-HZD-SF01",
      village: "Desa Golo Loni",
      sector: "Punggungan Datar Golo Loni Timur",
      elevation: "1.165–1.175 mdpl",
      status: "Zona Aman · Stabilitas Lereng Baik",
      capacityOrArea: "Luas Zona Aman ±3,2 Hektare",
      operatingHours: "Akses Terbuka 24 Jam",
      manager: "Pemerintah Desa Golo Loni",
      updatedAt: "Juli 2026",
      facilities: [
        "Lapangan Titik Kumpul A & Akses Jalan Desa Dua Arah",
        "Jaringan Air Bersih & Penerangan Jalan Umum",
        "Dekat Fasilitas Pendidikan & Kantor Desa",
      ],
      mitigationNote:
        "Kemiringan lereng <8% dengan batuan dasar stabil. Menjadi lokasi rujukan utama pendirian tenda darurat dan dapur umum desa.",
    },
  },
  {
    id: "halaman-gereja-watu-mori",
    name: "Halaman Gereja Watu Mori",
    level: "aman",
    hazard: "Zona aman",
    center: [-8.6369, 120.5892],
    polygon: blob([-8.6369, 120.5892], 0.0013, 6),
    pin: false,
    description:
      "Zona aman di bagian atas pemukiman Desa Watu Mori yang mencakup pelataran gereja dan bangunan penunjang untuk menampung warga saat evakuasi.",
    db: {
      code: "DB-HZD-SF02",
      village: "Desa Watu Mori",
      sector: "Puncak Pemukiman Watu Mori",
      elevation: "1.205 mdpl",
      status: "Zona Aman · Teruji Simulasi Desa",
      capacityOrArea: "Luas Zona Aman ±2,1 Hektare",
      operatingHours: "Akses Terbuka 24 Jam",
      manager: "Pemerintah Desa & Pengurus Gereja Watu Mori",
      updatedAt: "September 2026",
      facilities: [
        "Titik Kumpul B & Bangunan Pelindung Cuaca",
        "Posko Medis Lapangan (Rujukan Pustu Watu Mori)",
        "Jalur Distribusi Bantuan & Komunikasi Desa",
      ],
      mitigationNote:
        "Berada di punggung bukit yang aman dari alur longsoran maupun luapan Sungai Wae Mese.",
    },
  },
];

export const routes: Route[] = [
  {
    id: "jalur-evakuasi-a",
    name: "Jalur Evakuasi A",
    distance: "2,1 km",
    duration: "28 menit berjalan",
    path: [
      [-8.6406, 120.5611],
      [-8.6425, 120.5591],
      [-8.6462, 120.5588],
      [-8.6497, 120.5613],
      [-8.6504, 120.5656],
      [-8.6503, 120.5674],
    ],
    arrows: [1, 2, 3, 4],
    description:
      "Rute evakuasi utama sektor barat yang menghubungkan tepian barat daya Danau Ranamese dan pemukiman Golo Loni menuju Titik Kumpul A di Lapangan Desa Golo Loni.",
    db: {
      code: "DB-RT-EVK01",
      village: "Desa Golo Loni",
      sector: "Tepi Danau Ranamese → Lapangan Desa Golo Loni",
      elevation: "1.218 → 1.168 mdpl",
      status: "Jalur Aktif · Rambu Terpasang Lengkap",
      capacityOrArea: "Panjang 2,1 km · Waktu Tempuh ±28 Menit",
      operatingHours: "Jalur Bebas Hambatan 24 Jam",
      manager: "Satgas Siaga Bencana Desa Golo Loni",
      updatedAt: "Agustus 2026",
      facilities: [
        "14 Titik Rambu Panah Evakuasi Hijau Reflektif",
        "Melewati Pos Bank Sampah Mese Bersih & SDK Golo Loni",
        "Permukaan Jalan Perkerasan Desa & Bahu Jalan Lebar",
      ],
      mitigationNote:
        "Rute sengaja memutar ke sisi barat untuk menghindari tebing curam timur danau, kemudian melandai menuju Dataran Tinggi Golo Loni.",
    },
  },
  {
    id: "jalur-evakuasi-b",
    name: "Jalur Evakuasi B",
    distance: "1,4 km",
    duration: "19 menit berjalan",
    path: [
      [-8.6465, 120.5834],
      [-8.6438, 120.5849],
      [-8.6417, 120.5865],
      [-8.6396, 120.5875],
      [-8.6379, 120.5883],
    ],
    arrows: [1, 3],
    description:
      "Rute evakuasi sektor timur dari lembah Sungai Wae Mese melewati Pustu dan Kantor Desa Watu Mori menuju Titik Kumpul B di Halaman Gereja Watu Mori.",
    db: {
      code: "DB-RT-EVK02",
      village: "Desa Watu Mori",
      sector: "Lembah Wae Mese → Halaman Gereja Watu Mori",
      elevation: "1.135 → 1.205 mdpl",
      status: "Jalur Aktif · Teruji Simulasi 412 Warga",
      capacityOrArea: "Panjang 1,4 km · Waktu Tempuh ±19 Menit",
      operatingHours: "Jalur Bebas Hambatan 24 Jam",
      manager: "Satgas Siaga Bencana Desa Watu Mori",
      updatedAt: "September 2026",
      facilities: [
        "18 Titik Rambu Arah Evakuasi & Pos Pendamping Dusun",
        "Terintegrasi dengan Pos Medis Pustu Watu Mori",
        "Pegangan Tangan Bambu pada Segmen Tanjakan",
      ],
      mitigationNote:
        "Dalam simulasi September 2026, seluruh 412 warga berhasil mencapai ujung jalur ini dalam 19 menit dengan sistem pendampingan pemuda.",
    },
  },
];

export const formatCoord = ([lat, lng]: LatLng) => `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
