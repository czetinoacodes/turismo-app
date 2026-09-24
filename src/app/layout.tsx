import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

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

        <footer className="border-t border-stone-200 bg-stone-90 py-8 text-center text-sm text-stone-200">
          <p>ACOTOURS | Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}