export interface Zona {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
}

export type EstadoViaje = "abierto" | "lleno" | "realizado" | "suspendido";
export type TipoTransporte = "Bus" | "Microbus";

export interface Destino {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  ubicacion: string | null;
  atractivos: string | null;
  imagen_url: string | null;
  created_at: string;
}

export interface Viaje {
  id: number;
  destino_id: number;
  fecha: string; // date format: YYYY-MM-DD
  hora_salida: string; // time format: HH:mm
  hora_retorno: string; // time format: HH:mm
  precio: number;
  descripcion: string | null;
  tipo_transporte: TipoTransporte;
  servicio_domiciliar: boolean;
  capacidad_total: number;
  estado: EstadoViaje;
  created_at: string;
  destinos: Pick<Destino, "nombre" | "slug" | "imagen_url"> | null;
}