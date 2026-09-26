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
    <article className="space-y-8">
      {/* Back link */}
      <Link href="/" className="text-sm text-stone-500 hover:text-blue-700">
        ← Volver al inicio
      </Link>

      {/* Imagen del destino */}
      {destino.imagen_url && (
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-stone-100">
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
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-stone-100">{destino.nombre}</h1>
        <p className="text-lg text-stone-300">{destino.descripcion}</p>

        {/* Info del destino */}
        <div className="grid gap-4 sm:grid-cols-2">
          {destino.ubicacion && (
            <div className="rounded-lg bg-stone-50 p-4">
              <p className="text-sm font-semibold text-stone-700">Ubicación</p>
              <p className="text-stone-600">{destino.ubicacion}</p>
            </div>
          )}
          {destino.atractivos && (
            <div className="rounded-lg bg-stone-50 p-4">
              <p className="text-sm font-semibold text-stone-700">Atractivos</p>
              <p className="text-stone-600">{destino.atractivos}</p>
            </div>
          )}
        </div>
      </header>

      {/* Viajes disponibles */}
      <section className="space-y-6">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {viajes.map((v) => (
              <ViajeCard key={v.id} viaje={v} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center">
            <p className="text-stone-600">
              No hay viajes disponibles a este destino en este momento.
            </p>
          </div>
        )}
      </section>
    </article>
  );
}