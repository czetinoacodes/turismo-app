'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-black/40 backdrop-blur">
      <nav className="mx-auto flex max-w-full items-center justify-between px-6 md:px-8 py-6">
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-bold text-yellow-400"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          ACOTOURS
        </Link>

        {/* ESCRITORIO */}
        <div className="hidden md:flex gap-8 text-xl font-medium text-yellow-400">
          <Link href="/#destinos" className="hover:text-yellow-100 transition">
            Destinos
          </Link>
          <Link href="/#viajes" className="hover:text-yellow-100 transition">
            Viajes
          </Link>
          <Link href="/about-us/" className="hover:text-yellow-100 transition">
            ¿Quiénes somos?
          </Link>
        </div>

        {/* HAMBURGUESA - TELEFONO */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8"
          aria-label="Toggle menu"
        >
          <span 
            className={`w-full h-0.5 bg-white transition transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`} 
          />
          <span 
            className={`w-full h-0.5 bg-white transition duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`} 
          />
          <span 
            className={`w-full h-0.5 bg-white transition transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`} 
          />
        </button>
      </nav>

      {/* MENU HAMBURGUESA ABIERTO */}
      {menuOpen && (
        <div className="md:hidden bg-black-85 backdrop-blur px-6 py-4 space-y-4 border-t border-white/10 animate-slideDown">
          <Link 
            href="/#destinos" 
            className="block text-white hover:text-yellow-400 transition font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Destinos
          </Link>
          <Link 
            href="/#viajes" 
            className="block text-white hover:text-yellow-400 transition font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            Viajes
          </Link>
          <Link 
            href="/about-us" 
            className="block text-white hover:text-yellow-400 transition font-medium py-2"
            onClick={() => setMenuOpen(false)}
          >
            ¿Quiénes somos?
          </Link>
        </div>
      )}
    </header>
  );
}