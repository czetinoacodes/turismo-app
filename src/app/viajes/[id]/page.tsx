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

const hora_salidaFormato = new Date(`2024-01-01 ${viaje.hora_salida}`).toLocaleTimeString("es-SV", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const hora_retornoFormato = new Date(`2024-01-01 ${viaje.hora_retorno}`).toLocaleTimeString("es-SV", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});


  return (
    <article className="mx-auto w-full px-15">

      {/* Imagen del destino */}
      <div className="relative h-120 w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-black/60" />
      </div>


      {/* Header con info principal */}
      <header className="relative h-full flex flex-col items-start justify-center text-left px-6">
        {/* Destino como link */}
        {viaje.destinos && (
          <Link
            href={`/destinos/${viaje.destinos.slug}`}
            className="text-5xl md:text-6xl lg:text-8xl font-black text-white/90 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {viaje.destinos.nombre}
          </Link>
        )}

       
      </header>
       {/* Estado */}
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${colorEstado[viaje.estado] ?? "bg-stone-100 text-stone-700"
              }`}
          >
            {viaje.estado.charAt(0).toUpperCase() + viaje.estado.slice(1)}
          </span>
        </div>

      {/* Detalles del viaje */}
      <section className="grid gap-6 sm:grid-cols-2 py-10">
        <div className="rounded-md border-3 border-amber-600 bg-zinc-800 shadow-xl p-6">
          <h3 className="mb-4 text-3xl font-bold text-white text-center">Información del viaje</h3>
          <div className="space-y-3 text-xl text-stone-100">
            <div>
              <p className="font-semibold">Fecha:</p>
              <p className="text-stone-400">{fechaFormato}</p>
            </div>
            <div>
              <p className="font-semibold">Horario:</p>
              <p className="text-stone-400">
                {hora_salidaFormato} - {hora_retornoFormato}
              </p>
            </div>
            <div>
              <p className="font-semibold">Tipo de transporte:</p>
              <p className="text-stone-400">{viaje.tipo_transporte}</p>
            </div>
            <div>
              <p className="font-semibold">Capacidad:</p>
              <p className="text-stone-400">{viaje.capacidad_total} personas</p>
            </div>
          </div>
        </div>



        <div className="rounded-md border-3 border-amber-600 bg-zinc-800 shadow-xl p-6">
          <h3 className="mb-4 text-3xl font-bold text-white text-center">Servicios</h3>
          <div className="space-y-3 text-xl text-stone-100">
            <div>
              <p className="font-semibold">Precio:</p>
              <p className="text-2xl font-bold text-amber-200">
                ${viaje.precio.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-semibold">Servicio domiciliar:</p>
              <p className="text-stone-600">
                {viaje.servicio_domiciliar ? (
                  <span className="inline-block rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-black">
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
      <section className="bg-stone-900 py-10 mx-auto max-w-6xl text-justify justify-items-center">
        <h3 className="mb-4 text-3xl font-bold text-white text-center">Descripción del viaje</h3>
        <p className="text-stone-300 text-xl">{viaje.descripcion}</p>
      </section>

      {/* Call to action */}
      <div className="rounded-2xl bg-yellow-200 py-10 my-10 text-center max-w-4xl justify-items-center mx-auto">
        <p className="mb-4 text-3xl font-bold text-black text-center">¿Te interesa este viaje?</p>
        <a href="https://wa.me/78502463">
        <button className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black transition hover:bg-blue-800">
          Reservar viaje
        </button>
        </a>
      </div>
    </article>
  );
}