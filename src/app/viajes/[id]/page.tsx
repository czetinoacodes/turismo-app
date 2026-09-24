//VISTA QUE DETALLA INFO DE CADA VIAJE

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getViajeById, getViajes } from "@/lib/queries";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

// SSG: genera en build una página por cada viaje existente
export async function generateStaticParams() {
  const viajes = await getViajes();
  return viajes.map((v) => ({ id: String(v.id) }));
}

// SEO dinámico: título y descripción distintos por viaje
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const viaje = Number.isInteger(Number(id)) ? await getViajeById(Number(id)) : null;
  
  if (!viaje) return { title: "Viaje no encontrado" };
  
  return {
    title: viaje.descripcion,
    description: `${viaje.destinos?.nombre} - ${viaje.precio} | ACOTOURS`,
  };
}

export default async function ViajePage({ params }: Props) {
  const { id } = await params;
  const viajeId = Number(id);

  if (!Number.isInteger(viajeId)) notFound();

  const viaje = await getViajeById(viajeId);
  if (!viaje) notFound();

  // Colores para estado
  const colorEstado: Record<string, string> = {
    "abierto": "bg-green-100 text-green-700",
    "lleno": "bg-red-100 text-red-700",
    "realizado": "bg-slate-100 text-slate-700",
    "suspendido": "bg-amber-100 text-amber-700",
  };

  // Formatear fecha
  const fechaFormato = new Date(viaje.fecha).toLocaleDateString("es-SV", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Link href="/" className="text-sm text-stone-500 hover:text-blue-700">
        ← Volver al inicio
      </Link>

      {/* Imagen del destino */}
      <div className="relative aspect-video overflow-hidden bg-stone-100">
        {viaje.destinos?.imagen_url && (
          <Image
            src={viaje.destinos.imagen_url}
            alt={viaje.destinos.nombre}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Header con info principal */}
      <header className="space-y-3">
        {/* Destino como link */}
        {viaje.destinos && (
          <Link
            href={`/destinos/${viaje.destinos.slug}`}
            className="font-semibold uppercase tracking-wide text-blue-800 hover:underline" 
          >
            {viaje.destinos.nombre}
          </Link>
        )}

        {/* Estado */}
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              colorEstado[viaje.estado] ?? "bg-stone-100 text-stone-700"
            }`}
          >
            {viaje.estado.charAt(0).toUpperCase() + viaje.estado.slice(1)}
          </span>
        </div>
      </header>

      {/* Detalles del viaje */}
      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-black">Información del viaje</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-stone-700">Fecha</p>
              <p className="text-stone-600">{fechaFormato}</p>
            </div>
            <div>
              <p className="font-semibold text-stone-700">Horario</p>
              <p className="text-stone-600">
                {viaje.hora_salida} - {viaje.hora_retorno}
              </p>
            </div>
            <div>
              <p className="font-semibold text-stone-700">Tipo de transporte</p>
              <p className="text-stone-600">{viaje.tipo_transporte}</p>
            </div>
            <div>
              <p className="font-semibold text-stone-700">Capacidad</p>
              <p className="text-stone-600">{viaje.capacidad_total} personas</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-black">Servicios</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-stone-700">Precio</p>
              <p className="text-2xl font-bold text-blue-700">
                ${viaje.precio.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-semibold text-stone-700">Servicio domiciliar</p>
              <p className="text-stone-600">
                {viaje.servicio_domiciliar ? (
                  <span className="inline-block rounded bg-purple-200 px-2 py-1 text-xs font-semibold text-green-700">
                    ✓ Incluido
                  </span>
                ) : (
                  <span className="inline-block rounded bg-stone-200 px-2 py-1 text-xs font-semibold text-red-400">
                    ✗ No incluido
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Descripción completa */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-bold text-black">Descripción</h3>
        <p className="text-stone-700">{viaje.descripcion}</p>
      </section>

      {/* Call to action */}
      <div className="rounded-2xl bg-blue-50 p-6 text-center">
        <p className="mb-4 text-stone-700">¿Te interesa este viaje?</p>
        <button className="rounded-full bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800">
          Reservar viaje
        </button>
      </div>
    </article>
  );
}