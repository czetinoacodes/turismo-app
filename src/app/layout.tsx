import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from "next/image";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: { default: "ACOTOURS", template: "%s | ACOTOURS" },
  description: "Viajes turísticos por los destinos más hermosos de El Salvador.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`h-full antialiased ${poppins.variable} ${playfair.variable}`}>
      <body className="m-0 p-0 flex min-h-full flex-col bg-stone-900 text-stone-900">
        {/*SE CONECTA AL COMPONENTS/NAVBAR.TSX */}
        <Navbar />

        <main className="flex-1 w-full m-0">{children}</main>

        <footer className="border-t border-yellow-400 bg-stone-900 pb-6 text-center text-sm text-stone-500">
          <div className="flex justify-between mx-auto max-w-full flex-col md:flex-row gap-8">

            {/*footer 1*/}
            <Link href="/" className="flex flex-col items-center">
            <div className="order-1 px-10 w-full md:max-w-2/5 flex flex-col items-center">
              {/* Logo */}
              <div className="relative w-48 h-48">
                <Image
                  src="https://ysdatxyjposwjnhwzqsw.supabase.co/storage/v1/object/sign/destinos/logo%20acotours%20bus.png?token=eyJraWQiOiI5NWIyZTMxMy02ZTdlLTQ1YTItOWQwMC1iNTE5MDY5NjFjYTQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJkZXN0aW5vcy9sb2dvIGFjb3RvdXJzIGJ1cy5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkwNTYzNzY2LCJleHAiOjE4MjIwOTk3NjZ9.UzqStd_LopdB5ojMLGV1T0MhzAJRxaI0ztskQwPUmun1Ro4pL1RnBxeUyxZ6Psef3BBjiGNkbHheoHbVW7hd_A"
                  alt="Logo ACOTOURS"
                  fill
                  sizes="(min-width: 668px) 668px, 100vw"
                  className="object-contain"
                />
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-6xl font-black text-amber-400 mb-6 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ACOTOURS
              </h1>
            </div>
            </Link>

            {/*footer 2*/}
            <div className="order-2 w-full md:max-w-3/5 content-center">
              <p className="pb-5 font-bold">
                Contáctanos
              </p>
              <p className="pb-2">
                Tel. 2445-3600
              </p>
              <Link href="https://instagram.com/acotours">
                <p className="pb-2 underline">
                  Instagram
                </p>
              </Link>
              <Link href="https://facebook.com/acodes51">
                <p className="pb-2 underline">
                  Facebook
                </p>
              </Link>
              <Link href="https://wa.me/78502463">
                <p className="pb-2 underline">
                  WhatsApp
                </p>
              </Link>
            </div>
          </div>

          <p className="pt-10">ACOTOURS 2026 | Todos los derechos reservados.-</p>
        </footer>
      </body>
    </html>
  );
}