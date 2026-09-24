import Link from "next/link";
import Image from "next/image";
import ViajeCard from "@/components/ViajeCard";
import { getDestinos, getViajes } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [destinos, viajes] = await Promise.all([
    getDestinos(),
    getViajes(),
  ]);

  return (
    <div className="w-full">
      {/* HERO SECTION CON IMAGEN DE FONDO */}
      <section className="relative h-180 w-full overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=1200&fit=crop"
            alt="Playa hermosa de El Salvador"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white/90 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ¡Descubre, disfruta y vive El Salvador con ACOTOURS!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl font-light">
            Encuentra nuevos destinos, experiencias inolvidables y aventuras para compartir. ¡Tu próximo viaje comienza aquí!
          </p>

          <a
            href="#viajes"
            className="px-8 py-4 bg-amber-400 hover:bg-yellow-100 text-black font-semibold rounded-full transition transform hover:scale-105 shadow-lg"
          >
            Ver viajes
          </a>
        </div>
      </section>

{/* VIAJES SECTION */}
      <section id="viajes" className="py-16 bg-stone-70 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 
            className="text-4xl font-bold text-center mb-12 text-amber-100 uppercase"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Calendario de Actividades
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {viajes.map((v) => (
              <ViajeCard key={v.id} viaje={v} />
            ))}
          </div>
        </div>
      </section>

      {/* DESTINOS SECTION */}
      <section id="destinos" className="py-16 bg-stone-60 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 
            className="text-4xl font-bold text-center mb-12 text-amber-100"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Destinos
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinos.map((d) => (
              <Link
                key={d.id}
                href={`/destinos/${d.slug}`}
                className="group overflow-hidden rounded-3xl border-2 border-stone-100 bg-white hover:border-blue-500 transition"
              >
                {d.imagen_url && (
                  <div className="relative aspect-square overflow-hidden bg-stone-200">
                    <Image
                      src={d.imagen_url}
                      alt={d.nombre}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <h3 
                    className="text-xl font-bold text-stone-900 group-hover:text-blue-600 transition uppercase"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {d.nombre}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 line-clamp-2">
                    {d.descripcion}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}