export type ProgramCategory = "Mitigasi Bencana" | "Pengelolaan Sampah" | "Pariwisata";

export interface ProgramArticle {
  author: string;
  readTime: string;
  lead: string;
  highlights: { label: string; value: string }[];
  paragraphs: string[];
  quote: {
    text: string;
    speaker: string;
    role: string;
  };
  stepsTitle: string;
  steps: string[];
}

export interface Program {
  id: string;
  category: ProgramCategory;
  location: string;
  date: string;
  title: string;
  /** Baris judul dipecah agar sama dengan desain */
  titleLines: [string, string];
  description: string;
  image: string;
  imageAlt: string;
  article: ProgramArticle;
}

export const PROGRAM_CATEGORIES = ["Semua", "Mitigasi Bencana", "Pengelolaan Sampah", "Pariwisata"] as const;
export type ProgramFilterValue = (typeof PROGRAM_CATEGORIES)[number];

/** Jumlah kartu yang tampil sebelum tombol "Lihat Semua" ditekan (kategori "Semua"). */
export const INITIAL_VISIBLE = 6;

export const programs: Program[] = [
  {
    id: "pemetaan-bahaya",
    category: "Mitigasi Bencana",
    location: "Golo Loni",
    date: "Jul 2026",
    title: "Pemetaan Bahaya Partisipatif bersama Warga Golo Loni",
    titleLines: ["Pemetaan Bahaya Partisipatif", "bersama Warga Golo Loni"],
    description:
      "Warga menelusuri setiap dusun membawa peta dasar cetak, menandai retakan, mata air, dan titik kumpul aman. Sebanyak 38 titik bahaya telah didigitasi ke dalam peta risiko desa yang kini terpasang di kantor desa.",
    image: "/images/programs/pemetaan-bahaya.jpg",
    imageAlt: "Kompas dan alat ukur di atas peta topografi cetak",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Mitigasi",
      readTime: "4 menit baca",
      lead:
        "Topografi berbukit di kawasan Golo Loni menyimpan potensi gerakan tanah saat curah hujan tinggi. Melalui pemetaan partisipatif, pengetahuan lokal warga lintas generasi digabungkan dengan pemetaan spasial menjadi peta risiko desa yang akurat.",
      highlights: [
        { label: "Titik Bahaya Terpetakan", value: "38 Titik" },
        { label: "Cakupan Wilayah", value: "Seluruh Dusun" },
        { label: "Warga Terlibat", value: "120+ Warga" },
      ],
      paragraphs: [
        "Kegiatan dimulai dengan diskusi kelompok terarah di balai desa bersama kepala dusun, tokoh adat, kelompok tani, dan pemuda. Warga berbagi ingatan kolektif mengenai lokasi tebing yang pernah mengalami guguran batu, alur air musiman yang meluap saat hujan deras, hingga bangunan umum yang paling aman dijangkau.",
        "Selama dua pekan berikutnya, tim KKN Universitas Gadjah Mada bersama perwakilan warga menyusuri jalur kebun, lereng pemukiman, dan tepian Sungai Wae Mese membawa peta dasar cetak berskala besar serta perangkat penanda koordinat GPS. Setiap retakan tanah baru, gorong-gorong rawan sumbatan, dan sumber mata air dicatat koordinat serta tingkat kerawanannya.",
        "Hasil transek lapangan tersebut kemudian didigitasi menggunakan perangkat lunak Sistem Informasi Geografis (SIG) dan diverifikasi ulang bersama warga dalam forum musyawarah desa. Sebanyak 38 titik bahaya diklasifikasikan ke dalam zona risiko tinggi, zona risiko sedang, dan zona aman.",
        "Peta risiko final kini telah dicetak dalam ukuran besar dan dipasang secara permanen di Kantor Desa Golo Loni serta dibagikan dalam format digital agar perangkat desa dapat memperbaruinya secara berkala setiap musim penghujan.",
      ],
      quote: {
        text: "Selama ini kami tahu tebing mana yang rawan longsor dari cerita orang tua, tetapi belum pernah dituangkan ke dalam peta resmi. Sekarang warga baru maupun tamu desa bisa langsung melihat jalur mana yang harus dihindari saat hujan lebat.",
        speaker: "Bapak Siprianus Nggo",
        role: "Tokoh Masyarakat Desa Golo Loni",
      },
      stepsTitle: "Tahapan Pelaksanaan di Lapangan",
      steps: [
        "Penyiapan peta dasar citra satelit resolusi tinggi dan garis kontur Desa Golo Loni.",
        "Penelusuran dusun (transect walk) bersama warga untuk menandai retakan lereng, mata air, dan titik kumpul.",
        "Digitasi spasial 38 titik bahaya serta penyusunan layer jalur evakuasi desa.",
        "Verifikasi publik di balai desa dan pemasangan papan peta risiko permanen.",
      ],
    },
  },
  {
    id: "kelas-peta",
    category: "Mitigasi Bencana",
    location: "Golo Loni",
    date: "Agu 2026",
    title: "Kelas Membaca Peta untuk Siswa Kelas 4–6",
    titleLines: ["Kelas Membaca Peta", "untuk Siswa Kelas 4–6"],
    description:
      "Empat level menyenangkan — simbol & kompas, skala & kontur, zona bahaya, dan jalur evakuasi — diajarkan setiap Rabu di SDK Golo Loni dengan stiker, kuis, dan permainan mencari harta di luar ruang.",
    image: "/images/programs/kelas-peta.jpg",
    imageAlt: "Siswa SD berseragam merah putih tersenyum di bawah pondok bambu",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Edukasi Kebencanaan",
      readTime: "3 menit baca",
      lead:
        "Kesiapsiagaan bencana paling efektif ditanamkan sejak usia sekolah dasar. Melalui kurikulum empat level berbasis permainan, siswa kelas 4 hingga kelas 6 SDK Golo Loni belajar mengenali ruang hidupnya lewat peta dan kompas.",
      highlights: [
        { label: "Kurikulum Belajar", value: "4 Level" },
        { label: "Peserta Aktif", value: "86 Siswa SD" },
        { label: "Jadwal Rutin", value: "Setiap Rabu" },
      ],
      paragraphs: [
        "Membaca peta sering dianggap materi yang abstrak bagi anak-anak apabila hanya diajarkan di papan tulis. Oleh karena itu, tim KKN merancang modul bertingkat selama empat pekan yang memadukan lembar kerja visual, stiker simbol peta, kompas lapangan, dan permainan luar ruang di halaman sekolah.",
        "Pada Level 1 dan Level 2, siswa dikenalkan pada delapan arah mata angin, penggunaan kompas, serta cara membaca legenda dan garis kontur perbukitan Golo Loni menggunakan maket kardus berlapis. Siswa tampak antusias ketika diminta menempelkan stiker rumah, sekolah, gereja, dan danau pada peta buta desa mereka sendiri.",
        "Memasuki Level 3 dan Level 4, materi diarahkan pada pengenalan warna zona bahaya longsor dan banjir serta cara memilih rute tercepat menuju titik kumpul aman. Puncak kegiatan ditutup dengan permainan 'Mencari Harta Siaga' di sekitar lingkungan sekolah, di mana setiap kelompok harus bernavigasi menuju pos aman menggunakan petunjuk peta.",
        "Seluruh modul ajar dan poster peta ramah anak diserahkan kepada para guru SDK Golo Loni agar kegiatan literasi spasial dan kebencanaan ini dapat terus dilanjutkan pada semester berikutnya.",
      ],
      quote: {
        text: "Anak-anak jadi sangat hafal letak titik kumpul dan arti simbol rambu evakuasi. Bahkan sepulang sekolah mereka menceritakan kembali cara kerja kompas kepada orang tua di rumah.",
        speaker: "Ibu Maria Goreti",
        role: "Guru Kelas V SDK Golo Loni",
      },
      stepsTitle: "Empat Level Kurikulum Kelas Peta",
      steps: [
        "Level 1 — Simbol & Kompas: Mengenali arah mata angin dan legenda tempat penting di desa.",
        "Level 2 — Skala & Kontur: Memahami tinggi-rendah bukit dan jarak antar dusun.",
        "Level 3 — Zona Bahaya: Mengidentifikasi warna zona rawan longsor serta tepi sungai.",
        "Level 4 — Jalur Evakuasi: Simulasi permainan luar ruang menuju Titik Kumpul Aman.",
      ],
    },
  },
  {
    id: "simulasi-evakuasi",
    category: "Mitigasi Bencana",
    location: "Watu Mori",
    date: "Sep 2026",
    title: "Simulasi Evakuasi Longsor di Watu Mori",
    titleLines: ["Simulasi Evakuasi", "Longsor di Watu Mori"],
    description:
      "Simulasi skala penuh desa mengikuti rambu jalur baru: 412 warga mencapai Titik Kumpul B dalam 19 menit. Lansia dan anak-anak dipasangkan dengan relawan pemuda dari masing-masing dusun.",
    image: "/images/programs/simulasi-evakuasi.jpg",
    imageAlt: "Jalan berkelok di antara perbukitan sabana hijau",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Tanggap Darurat",
      readTime: "4 menit baca",
      lead:
        "Peta dan rambu evakuasi baru diuji langsung melalui simulasi skala penuh di Desa Watu Mori. Sebanyak 412 warga bergerak terkoordinasi menuju Titik Kumpul B di Halaman Gereja Watu Mori hanya dalam waktu 19 menit.",
      highlights: [
        { label: "Warga Terlibat", value: "412 Warga" },
        { label: "Waktu Tempuh", value: "19 Menit" },
        { label: "Jarak Rute", value: "1,4 Kilometer" },
      ],
      paragraphs: [
        "Sebelum hari simulasi, tim KKN bersama pemuda karang taruna dan perangkat Desa Watu Mori memasang rambu arah jalur evakuasi berbahan reflektif di setiap persimpangan gang serta tanjakan menuju Halaman Gereja Watu Mori. Selain itu, dibentuk sistem pendampingan berpasangan (buddy system) yang memasangkan setiap lansia dan keluarga dengan anak kecil bersama relawan pemuda dari dusun yang sama.",
        "Simulasi dimulai pukul 08.30 WITA ditandai dengan bunyi kentongan beruntun dan lonceng peringatan dini. Warga dari area lereng bawah bergerak mengikuti rambu hijau menuju Jalur Evakuasi B sepanjang 1,4 kilometer tanpa berlari maupun berdesakan.",
        "Catatan waktu di pos akhir menunjukkan seluruh 412 peserta berhasil berkumpul dan terdata lengkap oleh koordinator dusun dalam 19 menit—lebih cepat 7 menit dibandingkan target awal. Di titik kumpul, petugas Pustu Watu Mori dan mahasiswa juga memperagakan pertolongan pertama pada cedera ringan serta cara menggunakan tandu darurat bambu.",
        "Evaluasi pasca-simulasi menghasilkan prosedur tetap (SOP) peringatan dini tingkat desa yang kini disepakati sebagai panduan resmi kesiapsiagaan musim hujan di Watu Mori.",
      ],
      quote: {
        text: "Dengan sistem pasangan relawan pemuda di tiap RT, tidak ada warga lansia yang tertinggal atau bingung harus lewat jalur mana ketika tanda bahaya dibunyikan.",
        speaker: "Bapak Yohanes Jehadu",
        role: "Perangkat Desa Watu Mori",
      },
      stepsTitle: "Rangkaian Kegiatan Simulasi",
      steps: [
        "Pemasangan 18 titik rambu arah jalur evakuasi dan papan Titik Kumpul B.",
        "Pembentukan kelompok relawan pemuda pendamping kelompok rentan (lansia & anak-anak).",
        "Pelaksanaan simulasi evakuasi lapangan dengan pencatatan waktu per dusun.",
        "Demonstrasi pertolongan pertama dan penyusunan SOP peringatan dini desa.",
      ],
    },
  },
  {
    id: "bank-sampah",
    category: "Pengelolaan Sampah",
    location: "Golo Loni",
    date: "Apr 2026",
    title: "Bank Sampah Mese Bersih: Plastik Jadi Tabungan",
    titleLines: ["Bank Sampah Mese Bersih:", "Plastik Jadi Tabungan"],
    description:
      "Setiap Sabtu, keluarga menimbang botol, kaleng, dan kardus pilahan lalu mencatat tabungan di buku rekening. Sebanyak 214 penabung telah mengumpulkan 1,8 ton daur ulang sejak bank dibuka pada April.",
    image: "/images/programs/bank-sampah.jpg",
    imageAlt: "Tumpukan botol plastik warna-warni hasil pilahan",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Lingkungan",
      readTime: "4 menit baca",
      lead:
        "Melalui Bank Sampah Mese Bersih, kemasan plastik, kaleng, dan kardus rumah tangga di Golo Loni tidak lagi berakhir di kebun atau dibakar, melainkan berubah menjadi saldo tabungan keluarga yang dicatat setiap hari Sabtu.",
      highlights: [
        { label: "Nasabah Aktif", value: "214 Penabung" },
        { label: "Sampah Terkumpul", value: "1,8 Ton" },
        { label: "Jadwal Timbang", value: "Setiap Sabtu" },
      ],
      paragraphs: [
        "Meningkatnya konsumsi produk berkemasan plastik di kawasan perdesaan memerlukan sistem pengelolaan yang memberi manfaat ekonomi langsung bagi warga. Bersama kader PKK dan pemuda desa, tim KKN mendirikan Bank Sampah 'Mese Bersih' lengkap dengan timbangan gantung, karung pilah lima kategori, dan buku rekening tabungan warga.",
        "Setiap keluarga dibekali panduan pemilahan sederhana dari rumah: botol plastik bening (PET), gelas dan tutup plastik keras (HDPE/PP), kaleng logam, serta kardus/kertas kering. Setiap Sabtu pagi, warga datang ke pos penimbangan untuk menimbang hasil pilahan mereka.",
        "Petugas pengurus bank sampah mencatat berat dan nilai rupiah ke dalam buku rekening masing-masing penabung serta rekapitulasi digital. Setelah terkumpul dalam jumlah memadai, pengepul mitra dari Ruteng dan Borong menjemput material terpilah tersebut secara terjadwal.",
        "Hingga saat ini tercatat 214 nasabah aktif telah mengumpulkan lebih dari 1,8 ton material daur ulang. Sebagian warga memanfaatkan saldo tabungannya untuk kebutuhan sekolah anak dan iuran kegiatan desa.",
      ],
      quote: {
        text: "Dulu botol plastik berserakan di pinggir selokan atau dibakar di belakang rumah. Sekarang anak-anak justru rajin mengumpulkan botol karena ingin melihat angkanya bertambah di buku tabungan.",
        speaker: "Ibu Katarina Ndia",
        role: "Ketua Kader Bank Sampah Mese Bersih",
      },
      stepsTitle: "Alur Layanan Bank Sampah Mese Bersih",
      steps: [
        "Pemilahan sampah anorganik bersih dan kering dari masing-masing rumah tangga.",
        "Penimbangan rutin setiap hari Sabtu pukul 08.00–11.30 WITA di pos Bank Sampah.",
        "Pencatatan berat dan konversi nilai tabungan pada buku rekening nasabah.",
        "Pengepakan per jenis material dan penyaluran ke mitra daur ulang regional.",
      ],
    },
  },
  {
    id: "kompos-takakura",
    category: "Pengelolaan Sampah",
    location: "Watu Mori",
    date: "Agu 2026",
    title: "Kompos Rumah Tangga: Keranjang Takakura",
    titleLines: ["Kompos Rumah Tangga:", "Keranjang Takakura"],
    description:
      "60 rumah tangga mendapat keranjang awal dan belajar mengolah sisa dapur menjadi kompos untuk kebun kopi dan sayuran, mengurangi sampah organik yang dibuang sekitar sepertiga.",
    image: "/images/programs/kompos-takakura.jpg",
    imageAlt: "Tangan menggenggam kompos gembur",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Pertanian & Lingkungan",
      readTime: "3 menit baca",
      lead:
        "Mayoritas timbulan sampah rumah tangga di Desa Watu Mori adalah sisa bahan organik dapur. Dengan metode Keranjang Takakura yang praktis dan tidak berbau, 60 keluarga kini memproduksi pupuk kompos mandiri untuk tanaman kopi dan hortikultura.",
      highlights: [
        { label: "Keluarga Penerima", value: "60 Rumah Tangga" },
        { label: "Reduksi Organik", value: "±33% Berkurang" },
        { label: "Masa Panen Kompos", value: "3–4 Minggu" },
      ],
      paragraphs: [
        "Metode pengomposan Takakura dipilih karena sangat cocok diterapkan di teras atau sudut dapur rumah tanpa memerlukan lahan lubang yang luas. Keranjang berlubang dilapisi kardus, bantalan sekam padi dari penggilingan lokal, serta biang kompos (starter) hasil fermentasi dedak dan larutan mikroorganisme lokal.",
        "Dalam lokakarya praktik per dusun, warga belajar mencacah sisa sayuran, kulit buah, dan ampas kopi harian agar cepat terurai di dalam keranjang. Karena berlangsung secara aerobik dan dijaga kelembapannya oleh bantalan sekam, proses pengomposan tidak menimbulkan bau menyengat maupun mengundang lalat.",
        "Setelah tiga hingga empat minggu, kompos yang telah menghitam dan gembur dapat dipanen sepertiga bagian, sementara sisanya tetap berada di keranjang sebagai biang untuk siklus berikutnya.",
        "Pemantauan bersama kader lingkungan menunjukkan penurunan volume sampah organik yang dibuang keluar rumah sekitar sepertiga, sekaligus menyediakan pupuk organik gratis bagi kebun sayur pekarangan dan bibit kopi arabika warga.",
      ],
      quote: {
        text: "Keranjangnya rapi dan tidak bau sama sekali. Kompos panen pertama langsung saya pakai untuk bedengan sawi dan cabai di samping rumah, tumbuhnya jauh lebih subur.",
        speaker: "Ibu Fransiska Mamo",
        role: "Warga Dusun Roe, Watu Mori",
      },
      stepsTitle: "Cara Kerja Keranjang Takakura Warga",
      steps: [
        "Pembuatan starter mikroorganisme lokal dari bahan dedak, sekam padi, dan gula merah.",
        "Perakitan 60 paket keranjang berpelapis kardus dan bantal sekam penahan kelembapan.",
        "Pemasukan sisa dapur tercacah setiap hari disertai pengadukan singkat.",
        "Pemanenan kompos matang setiap 3–4 minggu untuk kebun kopi dan sayuran pekarangan.",
      ],
    },
  },
  {
    id: "jumat-bersih",
    category: "Pengelolaan Sampah",
    location: "Golo Loni & Watu Mori",
    date: "Setiap Jumat",
    title: "Jumat Bersih di Tepi Danau Ranamese",
    titleLines: ["Jumat Bersih di Tepi", "Danau Ranamese"],
    description:
      "Pelajar, kelompok pemuda, dan pemandu wisata membersihkan jalur tepi danau setiap Jumat pagi. Sampah yang ditemukan di jalur turun dari 46 kg menjadi 12 kg per sesi.",
    image: "/images/programs/jumat-bersih.jpg",
    imageAlt: "Relawan memungut sampah di tepi perairan",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Kolaborasi Dua Desa",
      readTime: "3 menit baca",
      lead:
        "Menjaga kelestarian kawasan konservasi Danau Ranamese membutuhkan gerakan kolektif yang konsisten. Aksi rutin Jumat Bersih yang melibatkan pelajar, pemuda, dan pemandu wisata berhasil menekan timbulan sampah jalur hingga 74%.",
      highlights: [
        { label: "Penurunan Sampah", value: "46 kg → 12 kg" },
        { label: "Frekuensi Aksi", value: "Setiap Jumat" },
        { label: "Kolaborasi", value: "2 Desa & Pemandu" },
      ],
      paragraphs: [
        "Sebagai salah satu destinasi alam utama di jalur lintas Ruteng–Borong, tepian Danau Ranamese dan area tempat istirahat kerap menyisakan sampah kemasan makanan maupun botol minuman dari pengunjung. Tim KKN menginisiasi gerakan lintas desa yang mempertemukan pemuda Golo Loni, pemuda Watu Mori, pelajar sekolah, dan kelompok pemandu wisata lokal.",
        "Setiap Jumat pukul 07.00 WITA, peserta dibagi ke dalam empat regu penyisir jalur trekking, area parkir, tepi danau, dan sekitar air terjun kecil. Setiap regu membawa dua kantong terpisah untuk langsung memilah sampah plastik bernilai daur ulang dan sampah residu.",
        "Tidak hanya memungut sampah, setiap sesi ditutup dengan audit singkat (brand & waste audit) serta penempatan papan himbauan ramah lingkungan di titik-titik rawan pembuangan sampah sembarangan.",
        "Dampaknya terlihat nyata: pada pekan pertama kegiatan terkumpul 46 kilogram sampah dalam satu sesi pagi, namun setelah pemasangan rambu edukasi dan patroli rutin pemandu, jumlah sampah yang ditemukan turun drastis menjadi rata-rata 12 kilogram per sesi.",
      ],
      quote: {
        text: "Ketika wisatawan melihat anak-anak muda desa dan pemandu turun langsung menjaga kebersihan jalur setiap Jumat, pengunjung pun ikut segan membuang sampah sembarangan.",
        speaker: "Kak Rikardus Janggur",
        role: "Koordinator Pemandu Wisata Ranamese",
      },
      stepsTitle: "Rangkaian Rutin Jumat Bersih",
      steps: [
        "Apel pagi dan pembagian rute sapu bersih di gerbang kawasan Danau Ranamese.",
        "Penyisiran jalur melingkar dan tepian danau dengan kantong terpilah.",
        "Penimbangan hasil pungut dan penyetoran plastik daur ulang ke Bank Sampah Mese Bersih.",
        "Kampanye 'Bawa Pulang Sampahmu' kepada pengunjung yang datang.",
      ],
    },
  },
  {
    id: "rambu-jalur",
    category: "Pariwisata",
    location: "Golo Loni",
    date: "Sep 2026",
    title: "Rambu Jalur & Titik Istirahat di Danau Ranamese",
    titleLines: ["Rambu Jalur & Titik Istirahat", "di Danau Ranamese"],
    description:
      "Jalur melingkar sepanjang 2,4 km dengan rambu dwibahasa, tiga dek istirahat, dan kode QR yang menceritakan kisah danau kawah, burung lokal, dan legenda Watu Mori.",
    image: "/images/programs/rambu-jalur.jpg",
    imageAlt: "Danau hijau tenang dikelilingi hutan lebat",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Ekowisata",
      readTime: "4 menit baca",
      lead:
        "Pengalaman menjelajahi hutan lembap dan tepian Danau Ranamese kini semakin aman dan kaya cerita berkat pemasangan rambu jalur dwibahasa (Indonesia–Inggris), tiga titik istirahat, serta papan interpretasi berkode QR.",
      highlights: [
        { label: "Panjang Jalur", value: "2,4 Kilometer" },
        { label: "Dek Istirahat", value: "3 Titik" },
        { label: "Bahasa Rambu", value: "Dwibahasa + QR" },
      ],
      paragraphs: [
        "Jalur trekking melingkar sepanjang 2,4 kilometer di sekitar Danau Ranamese memiliki kekayaan biodiversitas tinggi, termasuk berbagai jenis anggrek hutan dan burung endemik Flores. Namun sebelumnya, pengunjung mandiri sering kali belum mengetahui jarak tempuh, tingkat kemiringan jalur, maupun cerita di balik keunikan ekosistem danau vulkanik tersebut.",
        "Bekerja sama dengan pengelola kawasan dan perajin kayu lokal di Golo Loni, tim KKN merancang sistem papan petunjuk arah (wayfinding) berbahan kayu tahan cuaca dengan tipografi yang mudah terbaca tanpa mengganggu estetika lanskap hutan.",
        "Di tiga titik strategis yang menghadap langsung ke permukaan danau dan kanopi pohon besar, dibangun bangku dek istirahat sederhana tempat pejalan kaki dapat berhenti menikmati suasana tenang sekaligus membaca papan informasi.",
        "Setiap papan dilengkapi kode QR yang terhubung ke halaman cerita ringan berisi informasi geologi danau kawah Ranamese, panduan pengamatan burung lokal (birdwatching), hingga kisah rakyat setempat mengenai asal-usul nama kawasan dan legenda Watu Mori.",
      ],
      quote: {
        text: "Wisatawan mancanegara maupun domestik sangat terbantu dengan adanya informasi jarak dan cerita flora-fauna lewat kode QR. Waktu kunjungan mereka di jalur juga jadi lebih lama dan berkesan.",
        speaker: "Bapak Kornelius Dahu",
        role: "Perajin & Pengelola Ekowisata Golo Loni",
      },
      stepsTitle: "Komponen Penataan Jalur Ranamese",
      steps: [
        "Survei jarak, elevasi, dan titik pandang terbaik di sepanjang jalur melingkar 2,4 km.",
        "Pembuatan rambu penunjuk arah dwibahasa (Indonesia & Inggris) bersama perajin kayu desa.",
        "Penataan tiga titik dek istirahat ramah lingkungan di tepi jalur.",
        "Penyusunan konten cerita digital (geologi, burung endemik, & legenda lokal) melalui kode QR.",
      ],
    },
  },
  {
    id: "wisata-kopi",
    category: "Pariwisata",
    location: "Watu Mori",
    date: "Okt 2026",
    title: "Penginapan & Wisata Kopi Manggarai",
    titleLines: ["Penginapan & Wisata", "Kopi Manggarai"],
    description:
      "Enam penginapan keluarga kini menawarkan wisata kopi pagi: petik buah kopi matang, sangrai biji di atas api kayu, lalu seduh arabika Manggarai bersama keluarga tuan rumah.",
    image: "/images/programs/wisata-kopi.jpg",
    imageAlt: "Petani kopi lansia bertopi anyaman tersenyum memikul bambu",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Ekonomi Kreatif",
      readTime: "4 menit baca",
      lead:
        "Dataran tinggi Watu Mori menghasilkan biji kopi dengan cita rasa khas pegunungan Flores. Melalui pendampingan homestay dan paket wisata kopi dari kebun ke cangkir, enam keluarga petani kini memperoleh nilai tambah langsung dari wisatawan.",
      highlights: [
        { label: "Mitra Homestay", value: "6 Keluarga" },
        { label: "Pengalaman", value: "Kebun ke Cangkir" },
        { label: "Komoditas Utama", value: "Arabika & Robusta" },
      ],
      paragraphs: [
        "Sebagian besar keluarga di Watu Mori memiliki kebun kopi yang dirawat secara turun-temurun di lereng bukit sekitar desa. Selama ini hasil panen umumnya dijual dalam bentuk biji kering mentah (green bean) ke pasar kecamatan. Padahal, proses tradisional pengolahan kopi di dapur warga memiliki daya tarik wisata budaya dan kuliner yang sangat kuat.",
        "Tim KKN mendampingi enam rumah warga untuk menata kamar penginapan keluarga (homestay) yang bersih dan nyaman dengan standar keramahtamahan lokal, lengkap dengan pelatihan penyambutan tamu, perhitungan harga paket, serta katalog cerita kebun.",
        "Dalam paket 'Wisata Kopi Pagi', tamu diajak berjalan kaki menyusuri kebun berkabut bersama petani tuan rumah untuk memetik buah kopi merah matang (cherry red), mengenal proses penjemuran dan penumbukan lesung, hingga menyangrai biji kopi di atas tungku kayu menggunakan wajan tanah liat.",
        "Sesi diakhiri dengan menyeduh kopi hangat disertai kudapan pisang rebus dan ubi lokal di beranda rumah, sementara wisatawan juga dapat membeli kemasan kopi bubuk maupun biji sangrai berlabel kelompok tani Watu Mori sebagai buah tangan.",
      ],
      quote: {
        text: "Kami senang sekali karena tamu yang menginap tidak sekadar numpang tidur, tetapi ikut ke kebun, mendengar cerita hidup petani kopi, dan membeli kopi olahan kami dengan harga yang layak.",
        speaker: "Bapak Antonius Lalong",
        role: "Petani Kopi & Tuan Rumah Homestay Watu Mori",
      },
      stepsTitle: "Rangkaian Paket Wisata Kopi Pagi",
      steps: [
        "Jalan pagi menyusuri kebun kopi rakyat dan praktik petik buah merah matang.",
        "Pengenalan proses pascapanen tradisional (kupas kulit, jemur para-para, dan tumbuk lesung).",
        "Pengalaman menyangrai biji kopi di atas tungku kayu bersama keluarga tuan rumah.",
        "Sesi seduh bersama (cupping sederhana) dan pengemasan oleh-oleh kopi Watu Mori.",
      ],
    },
  },
  {
    id: "tenun-songke",
    category: "Pariwisata",
    location: "Watu Mori",
    date: "Setiap Bulan",
    title: "Tenun Songke & Hari Budaya Caci",
    titleLines: ["Tenun Songke &", "Hari Budaya Caci"],
    description:
      "Hari terbuka bulanan di mbaru gendang: saksikan penenun songke bekerja, coba motif sederhana di alat tenun mini, dan nikmati tari caci cambuk-perisai oleh pemuda setempat.",
    image: "/images/programs/tenun-songke.jpg",
    imageAlt: "Penenun perempuan sedang menenun kain songke",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Kebudayaan",
      readTime: "4 menit baca",
      lead:
        "Warisan budaya Manggarai hidup melalui denting alat tenun Songke dan ketangkasan gerak tari Caci. Gelaran Hari Terbuka Bulanan di halaman Mbaru Gendang menjadi ruang regenerasi budaya bagi pemuda sekaligus daya tarik wisata autentik.",
      highlights: [
        { label: "Agenda Budaya", value: "Setiap Bulan" },
        { label: "Penenun Terlibat", value: "18 Penenun Ibu" },
        { label: "Lokasi Utama", value: "Mbaru Gendang" },
      ],
      paragraphs: [
        "Kain tenun Songke dengan benang sulam berwarna keemasan dan warna dasar hitam pekat menyimpan filosofi mendalam pada setiap motifnya—mulai dari motif Wela Kaweng hingga Ranggong yang melambangkan harapan, persatuan, dan penghormatan terhadap alam.",
        "Agar keahlian menenun dan seni pertunjukan tradisional terus diwariskan kepada generasi muda sekaligus dikenal luas oleh pengunjung kawasan Ranamese, tim KKN bersama tua golo dan kelompok penenun perempuan merancang program Hari Terbuka Budaya setiap bulan di pelataran rumah adat (Mbaru Gendang).",
        "Pada acara ini, pengunjung dapat menyaksikan langsung ketelitian para ibu menenun kain Songke, mendengarkan penjelasan makna tiap motif melalui katalog dwibahasa yang disusun mahasiswa, serta mencoba sendiri menenun motif dasar menggunakan alat tenun bingkai mini.",
        "Di sore hari, suasana semakin semarak dengan latihan terbuka tari Caci dan lantunan danding oleh sanggar pemuda Watu Mori, memberikan ruang apresiasi budaya yang menghidupkan perekonomian perajin dan seniman desa.",
      ],
      quote: {
        text: "Sejak ada hari terbuka dan katalog cerita motif Songke, kain tenun buatan ibu-ibu di sini makin dihargai karena pembeli mengerti berapa lama dan betapa rumitnya setiap helai benang ditenun.",
        speaker: "Mama Yosefina Bintang",
        role: "Ketua Kelompok Penenun Songke Watu Mori",
      },
      stepsTitle: "Kegiatan pada Hari Terbuka Budaya",
      steps: [
        "Pameran hidup (live weaving) tenun Songke dan pengenalan filosofi motif Manggarai.",
        "Pojok coba tenun interaktif menggunakan alat tenun mini bagi pelajar dan pengunjung.",
        "Pertunjukan latihan tari Caci, musik gong-gendang, dan nyanyian adat oleh pemuda desa.",
        "Galeri penjualan langsung karya tenun Songke, selendang, dan kriya tangan warga.",
      ],
    },
  },
];
