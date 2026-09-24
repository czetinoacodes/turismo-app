import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";


export const metadata: Metadata = {
  title: { default: "ACOTOURS", template: "%s | ACOTOURS" },
  description: "Programación de viajes en todo El Salvador con ACOTOURS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className="flex	min-h-full	flex-col	bg-stone-60	text-stone-900">
        <header className="border-b	border-stone-200	bg-white">
          <nav className="mx-auto	flex	max-w-1xl	items-center	justify-between	px-6	py-4 bg-white">
            <Link href="/" className="text-xl	font-extrabold	text-cyan-600">ACOTOURS
            </Link>
            <div className="flex	gap-6	text-sm	font-medium">
              <Link href="/#destinos" className="hover:text-blue-600 text-stone-400">Destinos
              </Link>
              <Link href="/#viajes" className="hover:text-blue-600 text-stone-400">Viajes
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto	w-full	flex-1	px-30	py-10 bg-white">{children}</main>
        <footer className="border-t	border-stone-200	py-6	text-center	text-sm	text-stone-500">
         ACOTOURS | Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
