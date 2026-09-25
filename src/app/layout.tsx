import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from 'next/link';


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

        <footer className="border-t border-yellow-400 bg-stone-90 py-8 text-center text-sm text-stone-500 flex-col md:flex-row">
          <div className="flex justify-between mx-auto max-w-full ">
            {/*footer 1*/}
            <div className="order-1  px-10 w-full max-w-2/5">
              <h1
                className="text-3xl md:text-4xl lg:text-6xl font-black text-amber-400 mb-6 leading-tight text-center"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ACOTOURS
              </h1>
            </div>

            {/*footer 2*/}
            <div className="order-2 w-full max-w-3/5">
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