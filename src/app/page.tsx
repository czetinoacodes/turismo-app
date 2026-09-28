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
            src="https://ysdatxyjposwjnhwzqsw.supabase.co/storage/v1/object/sign/destinos/Surf-City-1-El-Tunco-El-Salvador.jpg?token=eyJraWQiOiI5NWIyZTMxMy02ZTdlLTQ1YTItOWQwMC1iNTE5MDY5NjFjYTQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJkZXN0aW5vcy9TdXJmLUNpdHktMS1FbC1UdW5jby1FbC1TYWx2YWRvci5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkwNTYyNjYxLCJleHAiOjE4MjIwOTg2NjF9.K5ZKrLFn_ENU1mGlzl31zagUk_GODIsOh4lFE9yPdh1z5mG83R0LNWz0xPxTdc2lnEUts2NdHqo-oTUe9VcP4A"
            alt="Playa El Tunco"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full flex flex-col items-start justify-center text-left px-6">
          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-black text-white/90 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ¡Descubre, disfruta y vive El Salvador con ACOTOURS!
          </h1>

          <p className="text-xl md:text-4xl text-gray-100 mb-8 max-w-4xl font-light">
            Encuentra nuevos destinos, experiencias inolvidables y aventuras para compartir. ¡Tu próximo viaje comienza aquí!
          </p>

          <a
            href="#viajes"
            className="px-8 py-4 bg-amber-400 hover:bg-yellow-100 text-black font-semibold rounded-full transition transform hover:scale-105 shadow-lg inline-block"
          >
            Ver viajes
          </a>
        </div>
      </section>

      {/* VIAJES SECTION */}
      <section id="viajes" className="py-12 bg-stone-70 px-6">
        <div className="mx-auto max-w-7xl">
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-black text-white/90 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ¡Explora entre todas las opciones de viaje disponibles!
          </h1>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {viajes.map((v) => (
              <ViajeCard key={v.id} viaje={v} />
            ))}
          </div>
        </div>
      </section>

      {/* DESTINOS SECTION */}
      <section id="destinos" className="bg-stone-60 px-5 pb-20">
        <div className="mx-auto max-w-7xl">
          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-black text-white/90 mb-6 leading-tight text-right"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Destinos que hemos descubierto...
          </h1>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinos.map((d) => (
              <Link
                key={d.id}
                href={`/destinos/${d.slug}`}
                className="group overflow-hidden rounded-3xl border-2 border-amber-600 bg-zinc-800 hover:border-amber-200 transition"
              >
                {d.imagen_url && (
                  <div className="relative aspect-[2/1] overflow-hidden bg-stone-200">
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
                    className="text-3xl font-bold text-white transition text-center "
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {d.nombre}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COTIZA TU VIAJE CON NOSOTROS */}
      <section id="destinos" className="bg-zinc-300 px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-black text-black/90 mb-6 leading-tight text-left"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ¡Cotiza tu viaje con nosotros!
          </h1>
          <p className="text-xl md:text-4xl text-gray-800 mb-4 max-w-4xl font-bold">
            ¿Tenés planeada una aventura?
          </p>
          <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-4xl font-light">
            Escríbenos y explora las diferentes opciones que tenemos para ofrecerte.
          </p>
          <a
            href="#viajes"
            className="px-8 py-4 bg-amber-500 hover:bg-yellow-200 text-black font-semibold rounded-full transition transform hover:scale-105 shadow-lg inline-block"
          >
            Cotizar mi viaje
          </a>


        </div>
      </section>
    </div>
  );
}