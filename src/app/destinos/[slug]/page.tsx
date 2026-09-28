// VISTA QUE DETALLA INFO DE CADA DESTINO

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ViajeCard from "@/components/ViajeCard";
import { getDestinoBySlug, getViajesByDestino, getDestinos } from "@/lib/queries";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

// SSG: genera en build una página por cada destino existente
export async function generateStaticParams() {
  const destinos = await getDestinos();
  return destinos.map((d) => ({ slug: d.slug }));
}

// SEO dinámico
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destino = await getDestinoBySlug(slug);

  if (!destino) return { title: "Destino no encontrado" };

  return {
    title: destino.nombre,
    description: destino.descripcion || `Viajes a ${destino.nombre}`,
  };
}

export default async function DestinoPage({ params }: Props) {
  const { slug } = await params;
  const destino = await getDestinoBySlug(slug);

  if (!destino) notFound();

  const viajes = await getViajesByDestino(destino.id);

  return (
    <article className="mx-auto w-full px-15">

      {/* Imagen del destino */}
      {destino.imagen_url && (
        <div className="relative h-120 w-full overflow-hidden">
          <Image
            src={destino.imagen_url}
            alt={destino.nombre}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Header */}
      <header className="space-y-4 py-10">
        <h1  className="text-5xl md:text-6xl lg:text-8xl font-black text-white/90 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}>{destino.nombre}</h1>
        <p className="text-stone-300 text-xl">{destino.descripcion}</p>

        {/* Info del destino */}
        <div className="grid gap-4 sm:grid-cols-2 max-w-6xl mx-auto py-10 ">
          {destino.ubicacion && (
            <div className="rounded-md border-3 border-amber-600 bg-zinc-800 shadow-xl p-3 text-center">
              <p className="text-2xl font-semibold text-white">Departamento</p>
              <p className="text-zinc-300 text-xl py-5">{destino.ubicacion}</p>
            </div>
          )}
          {destino.atractivos && (
            <div className="rounded-md border-3 border-amber-600 bg-zinc-800 shadow-xl p-3 text-center">
              <p className="text-2xl font-semibold text-white">Principales atractivos turísticos</p>
              <p className="text-zinc-300 text-xl py-5">{destino.atractivos}</p>
            </div>
          )}
        </div>
      </header>

      {/* Viajes disponibles */}
      <section className="space-y-6 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-200">
            Viajes a {destino.nombre}
            {viajes.length > 0 && (
              <span className="ml-2 text-lg text-stone-500">
                ({viajes.length})
              </span>
            )}
          </h2>
        </div>

        {viajes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 pb-10">
            {viajes.map((v) => (
              <ViajeCard key={v.id} viaje={v} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border-3 border-amber-100 bg-zinc-800 shadow-xl p-3 text-center">
            <p className="text-zinc-300 text-xl py-5">
              No hay viajes disponibles a este destino en este momento.
            </p>
          </div>
        )}
      </section>
    </article>
  );
}