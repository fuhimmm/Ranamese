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
    location: "Labuhan Pandan",
    date: "Jul 2026",
    title: "Pemetaan Bahaya Pesisir Partisipatif bersama Warga Sambelia",
    titleLines: ["Pemetaan Bahaya Pesisir", "bersama Warga Sambelia"],
    description:
      "Warga menelusuri setiap dusun pesisir membawa peta dasar cetak, menandai titik abrasi, jalur air, dan titik kumpul aman. Sebanyak 38 titik rawan telah didigitasi ke dalam peta risiko desa di kantor desa.",
    image: "/images/programs/pemetaan-bahaya.jpg",
    imageAlt: "Kompas dan alat ukur di atas peta topografi cetak",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Mitigasi Sambelia",
      readTime: "4 menit baca",
      lead:
        "Bentang pesisir Kecamatan Sambelia yang berhadapan langsung dengan Selat Alas dan kaki timur Gunung Rinjani menyimpan potensi multi-bencana mulai dari gempa bumi, gelombang pasang, hingga banjir bandang. Melalui pemetaan partisipatif, pengetahuan lokal warga digabungkan dengan pemetaan spasial menjadi peta risiko desa yang akurat.",
      highlights: [
        { label: "Titik Rawan Terpetakan", value: "38 Titik" },
        { label: "Cakupan Wilayah", value: "Seluruh Dusun" },
        { label: "Warga Terlibat", value: "120+ Warga" },
      ],
      paragraphs: [
        "Kegiatan dimulai dengan diskusi kelompok terarah di balai desa bersama kepala dusun, tokoh masyarakat, kelompok nelayan, dan pemuda. Warga berbagi ingatan kolektif mengenai pengalaman gempa Lombok 2018, segmen pantai yang mengalami abrasi saat musim angin timur, alur sungai yang meluap saat hujan lebat di hulu, hingga lokasi tanah lapang yang paling aman dijangkau.",
        "Selama dua pekan berikutnya, tim KKN Universitas Gadjah Mada bersama perwakilan warga menyusuri garis pantai Labuhan Pandan, muara sungai, dan permukiman warga membawa peta dasar cetak berskala besar serta perangkat penanda koordinat GPS. Setiap titik kerawanan infrastruktur, tanggul kritis, dan sumber air bersih darurat dicatat koordinatnya.",
        "Hasil transek lapangan tersebut kemudian didigitasi menggunakan perangkat lunak Sistem Informasi Geografis (SIG) dan diverifikasi ulang bersama warga dalam forum musyawarah desa. Sebanyak 38 titik kerawanan diklasifikasikan ke dalam zona risiko tinggi, zona risiko sedang, dan zona aman evakuasi.",
        "Peta risiko final kini telah dicetak dalam ukuran besar dan dipasang secara permanen di Kantor Desa Labuhan Pandan serta dibagikan dalam format digital agar perangkat desa dapat memperbaruinya secara berkala.",
      ],
      quote: {
        text: "Pengalaman gempa dan pasang laut membuat kami sadar pentingnya peta resmi. Sekarang warga maupun wisatawan yang hendak menyeberang ke Gili Kondo bisa langsung melihat jalur mana yang harus dituju saat keadaan darurat.",
        speaker: "Bapak Lalu Mahrip",
        role: "Tokoh Masyarakat Desa Labuhan Pandan",
      },
      stepsTitle: "Tahapan Pelaksanaan di Lapangan",
      steps: [
        "Penyiapan peta dasar citra satelit resolusi tinggi kawasan pesisir Kecamatan Sambelia.",
        "Penelusuran dusun dan garis pantai (transect walk) bersama warga untuk menandai titik abrasi, alur sungai, dan titik kumpul.",
        "Digitasi spasial 38 titik bahaya serta penyusunan layer jalur evakuasi pesisir.",
        "Verifikasi publik di balai desa dan pemasangan papan peta risiko permanen.",
      ],
    },
  },
  {
    id: "kelas-peta",
    category: "Mitigasi Bencana",
    location: "Sugian",
    date: "Agu 2026",
    title: "Sekolah Pantai & Kelas Membaca Peta untuk Siswa SD",
    titleLines: ["Sekolah Pantai & Kelas Peta", "untuk Siswa Kelas 4–6"],
    description:
      "Empat level menyenangkan — simbol & kompas, skala & pesisir, zona bahaya, dan jalur evakuasi — diajarkan setiap Rabu di SDN Sugian dengan stiker, kuis, dan permainan navigasi luar ruang.",
    image: "/images/programs/kelas-peta.jpg",
    imageAlt: "Siswa SD berseragam merah putih tersenyum di bawah pondok bambu",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Edukasi Kebencanaan",
      readTime: "3 menit baca",
      lead:
        "Kesiapsiagaan bencana di wilayah pesisir paling efektif ditanamkan sejak usia sekolah dasar. Melalui kurikulum empat level berbasis permainan pada program Sekolah Pantai, siswa kelas 4 hingga kelas 6 SDN di Desa Sugian belajar mengenali ruang hidupnya lewat peta dan kompas.",
      highlights: [
        { label: "Kurikulum Belajar", value: "4 Level" },
        { label: "Peserta Aktif", value: "86 Siswa SD" },
        { label: "Jadwal Rutin", value: "Setiap Rabu" },
      ],
      paragraphs: [
        "Membaca peta sering dianggap materi yang abstrak bagi anak-anak apabila hanya diajarkan di papan tulis. Oleh karena itu, tim KKN merancang modul bertingkat selama empat pekan yang memadukan lembar kerja visual, stiker simbol peta, kompas lapangan, dan permainan luar ruang.",
        "Pada Level 1 dan Level 2, siswa dikenalkan pada delapan arah mata angin, penggunaan kompas, serta cara membaca legenda garis pantai, gugusan gili (Gili Kondo, Gili Bidara, Gili Petagan), dan daratan Desa Sugian. Siswa tampak antusias ketika diminta menempelkan stiker rumah, sekolah, masjid, dan dermaga pada peta buta desa mereka sendiri.",
        "Memasuki Level 3 dan Level 4, materi diarahkan pada pengenalan warna zona bahaya gempa dan gelombang pasang serta cara memilih rute tercepat menuju titik kumpul dataran tinggi. Puncak kegiatan ditutup dengan permainan 'Navigasi Siaga Pesisir' di halaman sekolah, di mana setiap kelompok harus bernavigasi menuju pos aman menggunakan petunjuk peta.",
        "Seluruh modul ajar dan poster peta ramah anak diserahkan kepada para guru sekolah dasar di Sugian agar kegiatan literasi spasial dan kebencanaan pesisir ini dapat terus dilanjutkan.",
      ],
      quote: {
        text: "Anak-anak jadi sangat hafal letak titik kumpul dan arti simbol rambu evakuasi. Bahkan sepulang sekolah mereka menceritakan kembali cara kerja kompas kepada orang tua di rumah.",
        speaker: "Ibu Baiq Nurhasanah",
        role: "Guru Kelas V SDN Sugian",
      },
      stepsTitle: "Empat Level Kurikulum Sekolah Pantai & Peta",
      steps: [
        "Level 1 — Simbol & Kompas: Mengenali arah mata angin dan legenda tempat penting di pesisir Sambelia.",
        "Level 2 — Skala & Bentang Alam: Memahami jarak garis pantai, gili, dan dataran tinggi desa.",
        "Level 3 — Zona Bahaya: Mengidentifikasi warna zona rawan gempa, abrasi, serta luapan sungai.",
        "Level 4 — Jalur Evakuasi: Simulasi permainan luar ruang menuju Titik Kumpul Aman.",
      ],
    },
  },
  {
    id: "simulasi-evakuasi",
    category: "Mitigasi Bencana",
    location: "Labuhan Pandan",
    date: "Sep 2026",
    title: "Simulasi Evakuasi Bencana Pesisir di Labuhan Pandan",
    titleLines: ["Simulasi Evakuasi Pesisir", "di Labuhan Pandan"],
    description:
      "Simulasi skala penuh desa mengikuti rambu jalur baru menuju dataran aman: 412 warga mencapai Titik Kumpul Utama dalam 19 menit. Lansia dan anak-anak didampingi relawan pemuda dusun.",
    image: "/images/programs/simulasi-evakuasi.jpg",
    imageAlt: "Jalan berkelok di antara perbukitan hijau",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Tanggap Darurat",
      readTime: "4 menit baca",
      lead:
        "Peta dan rambu evakuasi baru diuji langsung melalui simulasi skala penuh di Desa Labuhan Pandan. Sebanyak 412 warga bergerak terkoordinasi dari area pesisir menuju Titik Kumpul dataran aman hanya dalam waktu 19 menit.",
      highlights: [
        { label: "Warga Terlibat", value: "412 Warga" },
        { label: "Waktu Tempuh", value: "19 Menit" },
        { label: "Jarak Rute", value: "1,4 Kilometer" },
      ],
      paragraphs: [
        "Sebelum hari simulasi, tim KKN bersama pemuda karang taruna dan perangkat Desa Labuhan Pandan memasang rambu arah jalur evakuasi berbahan reflektif di setiap persimpangan jalan dusun menjauhi garis pantai menuju lapangan titik kumpul. Selain itu, dibentuk sistem pendampingan berpasangan (buddy system) yang memasangkan setiap lansia dan keluarga dengan anak kecil bersama relawan pemuda dari dusun yang sama.",
        "Simulasi dimulai pukul 08.30 WITA ditandai dengan bunyi kentongan dan pengeras suara peringatan dini. Warga dari area permukiman pantai bergerak mengikuti rambu hijau menuju Jalur Evakuasi Utama sepanjang 1,4 kilometer secara tertib.",
        "Catatan waktu di pos akhir menunjukkan seluruh 412 peserta berhasil berkumpul dan terdata lengkap oleh koordinator dusun dalam 19 menit—lebih cepat 7 menit dibandingkan target awal. Di titik kumpul, tenaga kesehatan desa dan mahasiswa juga memperagakan pertolongan pertama pada cedera ringan serta evakuasi darurat.",
        "Evaluasi pasca-simulasi menghasilkan prosedur tetap (SOP) peringatan dini tingkat desa yang kini disepakati sebagai panduan resmi kesiapsiagaan bencana di Kecamatan Sambelia.",
      ],
      quote: {
        text: "Dengan sistem pasangan relawan pemuda di tiap RT, tidak ada warga lansia di pesisir yang tertinggal atau bingung harus lewat jalur mana ketika tanda bahaya dibunyikan.",
        speaker: "Bapak Sahdan",
        role: "Perangkat Desa Labuhan Pandan",
      },
      stepsTitle: "Rangkaian Kegiatan Simulasi",
      steps: [
        "Pemasangan 18 titik rambu arah jalur evakuasi pesisir dan papan Titik Kumpul Utama.",
        "Pembentukan kelompok relawan pemuda pendamping kelompok rentan (lansia & anak-anak).",
        "Pelaksanaan simulasi evakuasi lapangan dengan pencatatan waktu per dusun.",
        "Demonstrasi pertolongan pertama dan penyusunan SOP peringatan dini desa.",
      ],
    },
  },
  {
    id: "bank-sampah",
    category: "Pengelolaan Sampah",
    location: "Labuhan Pandan",
    date: "Jul 2026",
    title: "Bank Sampah Samudra Bersih: Plastik Jadi Tabungan",
    titleLines: ["Bank Sampah Samudra Bersih:", "Plastik Jadi Tabungan"],
    description:
      "Setiap Sabtu, keluarga pesisir menimbang botol, kaleng, dan kardus pilahan lalu mencatat tabungan di buku rekening. Sebanyak 214 penabung telah mengumpulkan 1,8 ton daur ulang agar tidak berakhir di laut.",
    image: "/images/programs/bank-sampah.jpg",
    imageAlt: "Tumpukan botol plastik warna-warni hasil pilahan",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Lingkungan Pesisir",
      readTime: "4 menit baca",
      lead:
        "Melalui Bank Sampah Samudra Bersih, kemasan plastik, kaleng, dan kardus rumah tangga serta warung wisata di Labuhan Pandan tidak lagi berakhir di muara atau terbawa arus ke perairan Gili Kondo, melainkan berubah menjadi saldo tabungan keluarga.",
      highlights: [
        { label: "Nasabah Aktif", value: "214 Penabung" },
        { label: "Sampah Terkumpul", value: "1,8 Ton" },
        { label: "Jadwal Timbang", value: "Setiap Sabtu" },
      ],
      paragraphs: [
        "Kawasan pesisir yang menjadi pintu gerbang wisata bahari memerlukan sistem pengelolaan sampah anorganik yang mencegah kebocoran plastik ke laut sekaligus memberi manfaat ekonomi langsung bagi warga. Bersama kader PKK dan pemuda desa, tim KKN mendirikan Bank Sampah 'Samudra Bersih' lengkap dengan timbangan, karung pilah lima kategori, dan buku rekening tabungan warga.",
        "Setiap keluarga dan pelaku usaha warung pantai dibekali panduan pemilahan sederhana dari rumah: botol plastik bening (PET), gelas dan tutup plastik keras (HDPE/PP), kaleng logam, serta kardus/kertas kering. Setiap Sabtu pagi, warga datang ke pos penimbangan untuk menimbang hasil pilahan mereka.",
        "Pengurus bank sampah mencatat berat dan nilai rupiah ke dalam buku rekening masing-masing penabung serta rekapitulasi digital. Setelah terkumpul dalam jumlah memadai, pengepul mitra dari Selong menjemput material terpilah tersebut secara terjadwal.",
        "Hingga saat ini tercatat 214 nasabah aktif telah mengumpulkan lebih dari 1,8 ton material daur ulang. Sebagian warga memanfaatkan saldo tabungannya untuk kebutuhan sekolah anak dan perlengkapan rumah tangga.",
      ],
      quote: {
        text: "Dulu botol plastik sering menumpuk di pinggir pantai atau dibakar. Sekarang anak-anak dan ibu-ibu justru rajin mengumpulkan botol karena langsung tercatat jadi tabungan keluarga.",
        speaker: "Ibu Husnul Khatimah",
        role: "Ketua Kader Bank Sampah Samudra Bersih",
      },
      stepsTitle: "Alur Layanan Bank Sampah Samudra Bersih",
      steps: [
        "Pemilahan sampah anorganik bersih dan kering dari rumah tangga serta warung pesisir.",
        "Penimbangan rutin setiap hari Sabtu pukul 08.00–11.30 WITA di pos Bank Sampah.",
        "Pencatatan berat dan konversi nilai tabungan pada buku rekening nasabah.",
        "Pengepakan per jenis material dan penyaluran ke mitra daur ulang di Lombok Timur.",
      ],
    },
  },
  {
    id: "kompos-takakura",
    category: "Pengelolaan Sampah",
    location: "Sugian",
    date: "Agu 2026",
    title: "Kompos Rumah Tangga & Biofertilizer Lahan Kering",
    titleLines: ["Kompos Rumah Tangga:", "Keranjang Takakura"],
    description:
      "60 rumah tangga di Desa Sugian mendapat keranjang kompos dan belajar mengolah sisa dapur serta biomassa menjadi pupuk organik untuk pertanian lahan kering dan sayuran pekarangan.",
    image: "/images/programs/kompos-takakura.jpg",
    imageAlt: "Tangan menggenggam kompos gembur",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Pertanian & Lingkungan",
      readTime: "3 menit baca",
      lead:
        "Mayoritas timbulan sampah rumah tangga di Desa Sugian adalah sisa bahan organik dapur. Dengan metode Keranjang Takakura dan pelatihan pupuk organik (biofertilizer), 60 keluarga kini memproduksi kompos mandiri untuk menyuburkan tanah pertanian lahan kering di Sambelia.",
      highlights: [
        { label: "Keluarga Penerima", value: "60 Rumah Tangga" },
        { label: "Reduksi Organik", value: "±33% Berkurang" },
        { label: "Masa Panen Kompos", value: "3–4 Minggu" },
      ],
      paragraphs: [
        "Karakteristik tanah berpasir di kawasan pesisir Sambelia membutuhkan asupan bahan organik yang tinggi agar mampu menahan kelembapan air bagi tanaman cabai, jagung, dan sayuran. Metode pengomposan Takakura dipilih karena praktis diterapkan di teras rumah tanpa menimbulkan bau.",
        "Keranjang berlubang dilapisi kardus, bantalan sekam padi dari penggilingan lokal, serta biang kompos (starter) hasil fermentasi dedak dan larutan mikroorganisme lokal. Dalam lokakarya praktik per dusun, warga belajar mencacah sisa sayuran dan kulit buah harian agar cepat terurai di dalam keranjang.",
        "Setelah tiga hingga empat minggu, kompos yang telah menghitam dan gembur dapat dipanen sepertiga bagian, sementara sisanya tetap berada di keranjang sebagai biang untuk siklus berikutnya.",
        "Pemantauan bersama kader lingkungan menunjukkan penurunan volume sampah organik rumah tangga sekitar sepertiga, sekaligus membantu petani dan ibu rumah tangga menghemat biaya pupuk kimia.",
      ],
      quote: {
        text: "Keranjangnya rapi dan tidak bau sama sekali. Kompos panen pertama langsung saya pakai untuk tanaman cabai dan tomat di pekarangan rumah, tanahnya jadi jauh lebih lembap dan subur.",
        speaker: "Ibu Siti Aminah",
        role: "Warga Desa Sugian, Sambelia",
      },
      stepsTitle: "Cara Kerja Keranjang Takakura Warga",
      steps: [
        "Pembuatan starter mikroorganisme lokal dari bahan dedak, sekam padi, dan gula merah.",
        "Perakitan 60 paket keranjang berpelapis kardus dan bantal sekam penahan kelembapan.",
        "Pemasukan sisa dapur tercacah setiap hari disertai pengadukan singkat.",
        "Pemanenan kompos matang setiap 3–4 minggu untuk lahan pertanian dan kebun pekarangan.",
      ],
    },
  },
  {
    id: "jumat-bersih",
    category: "Pengelolaan Sampah",
    location: "Sugian & Labuhan Pandan",
    date: "Setiap Jumat",
    title: "Jumat Bersih Pesisir Pantai & Dermaga Gili Kondo",
    titleLines: ["Jumat Bersih Pesisir", "& Dermaga Gili Kondo"],
    description:
      "Pelajar, pemuda desa, dan kelompok perahu wisata membersihkan garis pantai serta dermaga penyeberangan Gili Kondo setiap Jumat pagi. Sampah pesisir turun dari 46 kg menjadi 12 kg per sesi.",
    image: "/images/programs/jumat-bersih.jpg",
    imageAlt: "Relawan memungut sampah di tepi perairan",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Kolaborasi Pesisir Sambelia",
      readTime: "3 menit baca",
      lead:
        "Menjaga kejernihan perairan Selat Alas dan keindahan kawasan penyeberangan Gili Kondo membutuhkan gerakan kolektif yang konsisten. Aksi rutin Jumat Bersih yang melibatkan pelajar, pemuda, dan operator perahu wisata berhasil menekan timbulan sampah pantai hingga 74%.",
      highlights: [
        { label: "Penurunan Sampah", value: "46 kg → 12 kg" },
        { label: "Frekuensi Aksi", value: "Setiap Jumat" },
        { label: "Kolaborasi", value: "2 Desa & Nelayan" },
      ],
      paragraphs: [
        "Sebagai pintu masuk utama wisatawan menuju Gili Kondo, Gili Bidara, dan Gili Kapal, kawasan pantai di Kecamatan Sambelia seperti Pantai Mutiara, Pantai Berandangan, dan dermaga penyeberangan kerap menerima kiriman sampah plastik maupun sisa kemasan pengunjung. Tim KKN menginisiasi gerakan lintas desa bersama pemuda Sugian, pemuda Labuhan Pandan, pelajar, dan koperasi perahu wisata.",
        "Setiap Jumat pukul 07.00 WITA, peserta dibagi ke dalam empat regu penyisir garis pantai, area dermaga, sabuk mangrove tepi pantai, dan area bale istirahat. Setiap regu membawa dua kantong terpisah untuk langsung memilah sampah plastik bernilai daur ulang dan sampah residu.",
        "Tidak hanya memungut sampah, setiap sesi ditutup dengan audit singkat (waste audit) serta penempatan tempat sampah terpilah dan papan himbauan ramah lingkungan bagi wisatawan yang akan menyeberang ke gili.",
        "Dampaknya terlihat nyata: pada pekan pertama kegiatan terkumpul 46 kilogram sampah dalam satu sesi pagi, namun setelah penyediaan kantong sampah di setiap perahu wisata dan edukasi rutin, jumlah sampah yang ditemukan turun menjadi rata-rata 12 kilogram per sesi.",
      ],
      quote: {
        text: "Ketika wisatawan melihat anak-anak muda desa dan nakhoda perahu turun langsung menjaga kebersihan pantai setiap Jumat, pengunjung pun ikut membawa kembali sampah mereka dari Gili Kondo.",
        speaker: "Bang Khaerul Anwar",
        role: "Koordinator Kelompok Perahu Wisata Gili Kondo",
      },
      stepsTitle: "Rangkaian Rutin Jumat Bersih Pesisir",
      steps: [
        "Apel pagi dan pembagian rute sapu bersih di sepanjang pantai & dermaga penyeberangan Gili Kondo.",
        "Penyisiran garis pantai dan tepian mangrove dengan kantong terpilah.",
        "Penimbangan hasil pungut dan penyetoran plastik daur ulang ke Bank Sampah Samudra Bersih.",
        "Kampanye 'Bawa Pulang Sampahmu dari Gili' bersama seluruh operator perahu wisata.",
      ],
    },
  },
  {
    id: "rambu-jalur",
    category: "Pariwisata",
    location: "Gili Kondo & Sugian",
    date: "Sep 2026",
    title: "Rambu Ekowisata Bahari Gili Kondo & Mangrove Purba",
    titleLines: ["Rambu Ekowisata Bahari", "Gili Kondo & Mangrove"],
    description:
      "Penataan papan petunjuk dwibahasa, tiga bale istirahat pesisir, dan kode QR yang menceritakan ekosistem terumbu karang Gili Kondo, hutan mangrove purba Gili Petagan, serta panduan snorkeling ramah karang.",
    image: "/images/programs/rambu-jalur.jpg",
    imageAlt: "Perairan tenang dikelilingi pepohonan hijau",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Ekowisata Bahari",
      readTime: "4 menit baca",
      lead:
        "Pengalaman menjelajahi gugusan Gili Kondo, Gili Bidara, Gili Kapal, dan hutan mangrove purba di Kecamatan Sambelia kini semakin tertata dan edukatif berkat pemasangan papan informasi dwibahasa (Indonesia–Inggris), titik istirahat, serta papan interpretasi berkode QR.",
      highlights: [
        { label: "Kawasan Bahari", value: "4 Gili & Pesisir" },
        { label: "Bale Informasi", value: "3 Titik Utama" },
        { label: "Bahasa Rambu", value: "Dwibahasa + QR" },
      ],
      paragraphs: [
        "Gugusan pulau kecil (gili) di lepas pantai Kecamatan Sambelia menyimpan kekayaan ekosistem laut yang luar biasa—mulai dari hamparan terumbu karang dangkal tempat snorkeling di Gili Kondo, gosong pasir putih timbul-tenggelam di Gili Kapal, hingga hutan mangrove purba Bakau Kurap yang rimbun di Gili Petagan.",
        "Bekerja sama dengan Pokdarwis dan perajin kayu lokal di Sugian serta Labuhan Pandan, tim KKN merancang sistem papan petunjuk arah (wayfinding) dan papan etika wisata bahari berbahan kayu tahan cuaca pantai.",
        "Di tiga titik strategis—dermaga keberangkatan, titik informasi Gili Kondo, dan kawasan Taman Wisata Air (TWA) di Desa Sugian—ditata area istirahat teduh tempat pengunjung dapat membaca peta zona snorkeling aman dan aturan pelestarian terumbu karang.",
        "Setiap papan dilengkapi kode QR yang terhubung ke panduan digital berisi katalog spesies ikan karang Gili Kondo, keunikan ekosistem mangrove purba Sambelia, hingga daftar kontak resmi koperasi penyeberangan perahu lokal.",
      ],
      quote: {
        text: "Wisatawan mancanegara maupun domestik sangat terbantu dengan adanya peta titik snorkeling dan cerita mangrove purba lewat kode QR. Mereka jadi lebih berhati-hati agar tidak menginjak karang.",
        speaker: "Bapak Ruslan",
        role: "Pengurus Pokdarwis Bahari Sambelia",
      },
      stepsTitle: "Komponen Penataan Ekowisata Bahari Sambelia",
      steps: [
        "Survei titik dermaga, zona snorkeling terumbu karang Gili Kondo, dan alur wisata mangrove.",
        "Pembuatan rambu penunjuk arah & etika wisata bahari dwibahasa (Indonesia & Inggris).",
        "Penataan tiga titik papan interpretasi dan area istirahat pengunjung di pesisir.",
        "Penyusunan konten cerita digital (terumbu karang, mangrove purba, & rute gili) melalui kode QR.",
      ],
    },
  },
  {
    id: "wisata-kopi",
    category: "Pariwisata",
    location: "Sugian",
    date: "Okt 2026",
    title: "Homestay Warga & Wisata Kuliner Pesisir Sambelia",
    titleLines: ["Homestay Warga & Wisata", "Kuliner Pesisir Sambelia"],
    description:
      "Enam rumah singgah keluarga di Desa Sugian kini menawarkan paket menginap ramah wisatawan: nikmati matahari terbit Selat Alas, olahan hasil kebun & laut segar, serta seduhan kopi Lombok bersama tuan rumah.",
    image: "/images/programs/wisata-kopi.jpg",
    imageAlt: "Warga lokal bertopi anyaman tersenyum ramah",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Ekonomi Kreatif",
      readTime: "4 menit baca",
      lead:
        "Seiring meningkatnya kunjungan wisatawan menuju Gili Kondo dan pesisir timur Lombok, enam keluarga di Desa Sugian didampingi untuk menghadirkan layanan homestay berbasis masyarakat yang memadukan keramahtamahan lokal dengan wisata kuliner pesisir dan agro.",
      highlights: [
        { label: "Mitra Homestay", value: "6 Keluarga" },
        { label: "Pengalaman", value: "Pesisir & Kebun" },
        { label: "Sajian Khas", value: "Kuliner Sasak & Kopi" },
      ],
      paragraphs: [
        "Selama ini banyak wisatawan yang berkunjung ke Gili Kondo hanya melakukan perjalanan pulang-pergi dalam satu hari karena belum tersedianya informasi penginapan warga yang terstandar di desa penyangga. Padahal, menginap di desa pesisir Sambelia menawarkan pengalaman pagi hari yang memukau saat matahari terbit dari balik Selat Alas.",
        "Tim KKN mendampingi enam rumah warga di Desa Sugian untuk menata kamar penginapan keluarga (homestay) yang bersih, sejuk, dan nyaman dengan sentuhan arsitektur lokal, lengkap dengan pelatihan manajemen reservasi digital, standar kebersihan, serta perhitungan harga paket.",
        "Dalam paket menginap keluarga, tamu diajak berjalan pagi melihat aktivitas nelayan kembali dari laut dan petani memanen hasil kebun, dilanjutkan dengan belajar mengolah hidangan khas pesisir Lombok Timur serta menyangrai kopi tradisional di dapur tuan rumah.",
        "Kehadiran homestay desa ini membuat durasi tinggal wisatawan di Kecamatan Sambelia menjadi lebih panjang sehingga perputaran ekonomi dirasakan langsung oleh keluarga warga, pemilik warung, dan nelayan penyeberangan.",
      ],
      quote: {
        text: "Kami senang sekali karena tamu yang datang ke Gili Kondo kini bisa menginap di rumah warga, mencicipi masakan khas keluarga kami, dan membeli produk olahan UMKM desa sebagai oleh-oleh.",
        speaker: "Bapak Amaq Rinjani",
        role: "Tuan Rumah Homestay Desa Sugian",
      },
      stepsTitle: "Rangkaian Pendampingan Homestay & Wisata Warga",
      steps: [
        "Penataan standar kamar, sanitasi, dan pencahayaan pada 6 rumah warga mitra homestay.",
        "Pelatihan penyambutan tamu (hospitality), pembukuan sederhana, dan pemasaran digital.",
        "Penyusunan paket sarapan kuliner lokal Sasak dan seduh kopi pagi menghadap pesisir.",
        "Integrasi paket menginap homestay dengan jadwal perahu penyeberangan Gili Kondo.",
      ],
    },
  },
  {
    id: "tenun-songke",
    category: "Pariwisata",
    location: "Labuhan Pandan",
    date: "Setiap Bulan",
    title: "Tenun Tradisional Sasak & Festival Pesona Sambelia",
    titleLines: ["Tenun Tradisional Sasak &", "Festival Pesona Sambelia"],
    description:
      "Gelaran budaya di pesisir Sambelia: saksikan penenun kain tradisional Sasak bekerja, coba alat tenun mini, serta nikmati pawai dulangan, pertunjukan Gendang Beleq, dan Peresean pemuda desa.",
    image: "/images/programs/tenun-songke.jpg",
    imageAlt: "Penenun perempuan sedang menenun kain tradisional",
    article: {
      author: "Tim KKN-PPM Universitas Gadjah Mada · Subunit Kebudayaan",
      readTime: "4 menit baca",
      lead:
        "Kekayaan budaya masyarakat Sasak di Kecamatan Sambelia hidup melalui kriya tenun tradisional dan semangat Festival Pesona Sambelia. Kolaborasi perajin perempuan dan sanggar pemuda desa menghadirkan panggung budaya yang memperkuat identitas lokal sekaligus memikat wisatawan.",
      highlights: [
        { label: "Atraksi Utama", value: "Tenun & Gendang Beleq" },
        { label: "Perajin Terlibat", value: "18 Penenun Ibu" },
        { label: "Puncak Acara", value: "Festival Sambelia" },
      ],
      paragraphs: [
        "Selain pesona wisata bahari Gili Kondo, Kecamatan Sambelia memiliki tradisi budaya Sasak yang sangat kuat—mulai dari seni menenun kain tradisional dengan motif geometris khas Lombok Timur hingga tradisi Pawai Dulangan, ketangkasan Peresean, dan tabuhan megah Gendang Beleq.",
        "Agar warisan budaya ini terus hidup di kalangan generasi muda sekaligus menjadi daya tarik wisata budaya pendamping wisata pantai, tim KKN bersama tokoh adat, kelompok perajin tenun perempuan, dan pemuda desa menyelenggarakan gelar budaya terpadu yang berpuncak pada Festival Pesona Sambelia.",
        "Pada pojok kriya tenun, pengunjung dapat menyaksikan langsung ketelitian para ibu menenun helai demi helai benang, membaca katalog cerita motif dwibahasa yang disusun mahasiswa, serta mencoba menenun motif dasar menggunakan alat tenun bingkai mini.",
        "Di panggung terbuka pantai Labuhan Pandan, suasana semakin semarak dengan iring-iringan Pawai Dulangan warga, tabuhan Gendang Beleq, dan atraksi Peresean oleh pemuda setempat yang menggerakkan ekonomi perajin, UMKM kuliner, serta seniman desa.",
      ],
      quote: {
        text: "Lewat Festival Pesona Sambelia dan pojok tenun warga, wisatawan tahu bahwa Sambelia bukan hanya punya laut dan gili yang indah, tetapi juga budaya Sasak dan kain tenun yang luar biasa.",
        speaker: "Inaq Mariam",
        role: "Ketua Kelompok Penenun Tradisional Sambelia",
      },
      stepsTitle: "Rangkaian Kegiatan Budaya & Festival Pesona Sambelia",
      steps: [
        "Pameran hidup (live weaving) tenun tradisional Sasak dan katalog filosofi motif lokal.",
        "Pojok coba tenun interaktif menggunakan alat tenun mini bagi pelajar dan wisatawan.",
        "Penyelenggaraan Festival Pesona Sambelia: Pawai Dulangan, Gendang Beleq, dan Peresean.",
        "Bazar UMKM pesisir dan galeri penjualan langsung karya tenun serta kriya warga Sambelia.",
      ],
    },
  },
];
