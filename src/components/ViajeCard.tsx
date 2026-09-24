import Image from "next/image";
import Link from "next/link";
import type { Viaje } from "@/lib/types";

const COLOR_ESTADO: Record<string, string> = {
  "abierto": "bg-green-100 text-green-700",
  "lleno": "bg-red-100 text-red-700",
  "realizado": "bg-slate-100 text-slate-700",
  "suspendido": "bg-amber-100 text-amber-700",
};

function formatearFecha(fecha: string): string {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-SV", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function ViajeCard({ viaje }: { viaje: Viaje }) {
  return (
    <Link
      href={`/viajes/${viaje.id}`}
      className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {viaje.destinos?.imagen_url && (
          <Image
            src={viaje.destinos.imagen_url}
            alt={viaje.destinos.nombre}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            COLOR_ESTADO[viaje.estado] ?? "bg-stone-100 text-stone-700"
          }`}
        >
          {viaje.estado.charAt(0).toUpperCase() + viaje.estado.slice(1)}
        </span>
      </div>

      <div className="space-y-2 p-5">
        {viaje.destinos && (
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {viaje.destinos.nombre}
          </span>
        )}
        <div className="space-y-1">
          <p className="text-sm text-stone-600">
            Fecha: {formatearFecha(viaje.fecha)}
          </p>
          <p className="text-sm text-stone-600">
            Hora: {viaje.hora_salida} - {viaje.hora_retorno}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block rounded bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">
            {viaje.tipo_transporte}
          </span>
          {viaje.servicio_domiciliar && (
            <span className="inline-block rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
            Domiciliar
            </span>
          )}
        </div>

        <p className="text-lg font-bold text-blue-700">
          ${viaje.precio.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}