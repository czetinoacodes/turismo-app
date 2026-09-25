import Image from "next/image";
import Link from "next/link";
import type { Viaje } from "@/lib/types";

const COLOR_ESTADO: Record<string, string> = {
  "abierto": "bg-emerald-100 text-emerald-700",
  "lleno": "bg-red-100 text-red-700",
  "realizado": "bg-slate-100 text-slate-700",
  "suspendido": "bg-amber-100 text-amber-700",
};

function formatearFecha(fecha: string): string {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-SV", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export default function ViajeCard({ viaje }: { viaje: Viaje }) {
  return (
    <Link
      href={`/viajes/${viaje.id}`}
      className="group overflow-hidden rounded-md border-3 border-amber-600 bg-white shadow-xl hover:shadow-xl transition-all"
    >
      {/* Imagen */}
      <div className="relative aspect-[2/1] overflow-hidden bg-stone-100">
        {viaje.destinos?.imagen_url && (
          <Image
            src={viaje.destinos.imagen_url}
            alt={viaje.destinos.nombre}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        
        {/* Badge de estado */}
        <span
          className={`absolute left-4 top-4 rounded-sm px-3 py-1 text-xs font-semibold ${
            COLOR_ESTADO[viaje.estado] ?? "bg-stone-100 text-stone-700"
          }`}
        >
          {viaje.estado.charAt(0).toUpperCase() + viaje.estado.slice(1)}
        </span>
      </div>

      {/* Contenido */}
      <div className="space-y-3 p-5 bg-zinc-800">
        {/* Destino */}
        {viaje.destinos && (
          <span className="md:text-xl lg:text-3xl font-black text-white/90 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}>
            {viaje.destinos.nombre}
          </span>
        )}



   

        {/* Info: Fecha y hora */}
        <div className="space-y-1 text-sm text-stone-200 font-light">
          <p className="font-semibold">Fecha: {formatearFecha(viaje.fecha)}</p>
          <p>Hora: {viaje.hora_salida} - {viaje.hora_retorno}</p>
        </div>

        {/* Servicios */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-block rounded bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">
            {viaje.tipo_transporte}
          </span>
          {viaje.servicio_domiciliar && (
            <span className="inline-block rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
              Servicio Domiciliar
            </span>
          )}
        </div>

        {/* Precio */}
        <p className="pt-2 text-2xl font-bold text-yellow-200">
          ${viaje.precio.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}