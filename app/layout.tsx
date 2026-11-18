import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Montserrat, Press_Start_2P } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sambelia — Sugian · Labuhan Pandan",
  description:
    "Situs program KKN-PPM Universitas Gadjah Mada di Kecamatan Sambelia, Kabupaten Lombok Timur, NTB: peta kawasan, program desa, dan lapor ke posko.",
};

export const viewport: Viewport = {
  themeColor: "#04140F",
};

/** Dijalankan sebelum paint: tampilkan loader saat kunjungan baru maupun saat reload halaman. */
const loaderBootScript = `try{var nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];if(nav&&nav.type==='reload'){sessionStorage.removeItem('sambelia-loaded-v1')}if(sessionStorage.getItem('sambelia-loaded-v1')){document.documentElement.classList.add('skip-loader')}else{document.documentElement.classList.remove('skip-loader');document.documentElement.classList.add('loader-active')}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${cormorant.variable} ${pressStart.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
      </head>
      <body className="min-h-screen overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
