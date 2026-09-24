import Link from "next/link";
import ViajeCard from "@/components/ViajeCard";
import { getDestinos, getViajes } from "@/lib/queries";

// ISR: la página es estática y se regenera en segundo plano cada 60 s
export const revalidate = 60;

export default async function HomePage() {
  const [destinos, viajes] = await Promise.all([
    getDestinos(),
    getViajes(),
  ]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-red-700">
          ACOTOURS
        </h1>
        <p className="mx-auto mt-4 text-lg text-stone-200">
          ¡Descubre cada rincón mágico que El Salvador tiene para ofrecer con ACOTOURS!
        </p>
        <a
          href="#viajes"
          className="mt-8 inline-block rounded-full bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Ver viajes
        </a>
      </section>

      {/* Destinos */}
      <section id="destinos" className="scroll-mt-8">
        <h2 className="mb-6 text-2xl font-bold text-center">NUESTROS DESTINOS</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinos.map((d) => (
            <Link
              key={d.id}
              href={`/destinos/${d.slug}`}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold group-hover:text-blue-300 text-blue-700">
                {d.nombre}
              </h3>
              <p className="mt-2 text-sm text-stone-600">{d.descripcion}</p>
              <p className="mt-3 text-xs font-semibold text-blue-700">
                → Ver viajes
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Viajes */}
      <section id="viajes" className="scroll-mt-8">
        <h2 className="mb-6 text-2xl font-bold text-center">CALENDARIO DE VIAJES</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {viajes.map((v) => (
            <ViajeCard key={v.id} viaje={v} />
          ))}
        </div>
      </section>
    </div>
  );
}