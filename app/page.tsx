import ContactCard from "@/components/ContactCard";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import Navbar from "@/components/Navbar";
import PixelLoader from "@/components/PixelLoader";
import ProgramGrid from "@/components/ProgramGrid";
import ReportForm from "@/components/ReportForm";
import RoamingCursors from "@/components/RoamingCursors";

export default function HomePage() {
  return (
    <>
      <PixelLoader />
      <CustomCursor />

      <main className="relative min-h-screen overflow-x-clip bg-bg">
        {/* Kursor Watu Mori & Golo Loni yang roaming luwes di seluruh viewport (algoritma safwan.id) */}
        <RoamingCursors />

        {/* Hero dengan foto latar parallax & lengkungan ke section berikutnya */}
        <Hero />

        {/* Navbar pill melayang: berada di atas danau pada awal halaman, lalu sticky saat discroll */}
        <Navbar />

        {/* Section 1: Peta Ranamese */}
        <MapSection />

        {/* Section 2: Program Desa */}
        <ProgramGrid />

        {/* Section 3: Lapor ke Posko (Kontak & Formulir Laporan Warga) */}
        <section
          id="kontak"
          aria-labelledby="heading-kontak"
          className="mx-auto max-w-[1220px] px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-28"
        >
          <div
            id="heading-kontak"
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.16fr] lg:gap-14"
          >
            <ContactCard />
            <ReportForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
