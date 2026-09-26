import { cache } from "react";
import { supabase } from "./supabase";
import type { Destino, Viaje } from "./types";

const VIAJE_SELECT = "*, destinos(nombre, slug, imagen_url)";

export const getDestinos = cache(async (): Promise<Destino[]> => {
  const { data, error } = await supabase
    .from("destinos")
    .select("*")
    .order("nombre")
    .overrideTypes<Destino[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar los destinos: ${error.message}`);
  return data;
});

export const getViajes = cache(async (): Promise<Viaje[]> => {
  const { data, error } = await supabase
    .from("viajes")
    .select(VIAJE_SELECT)
    .order("fecha", { ascending: true })
    .overrideTypes<Viaje[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar los viajes: ${error.message}`);
  return data;
});

export const getViajeById = cache(async (id: number): Promise<Viaje | null> => {
  const { data, error } = await supabase
    .from("viajes")
    .select(VIAJE_SELECT)
    .eq("id", id)
    .maybeSingle<Viaje>();

  if (error) throw new Error(`Error al buscar el viaje: ${error.message}`);
  return data;
});

export const getDestinoBySlug = cache(async (slug: string): Promise<Destino | null> => {
  const { data, error } = await supabase
    .from("destinos")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Destino>();

  if (error) throw new Error(`Error al buscar el destino: ${error.message}`);
  return data;
});

export const getViajesByDestino = cache(async (destinoId: number): Promise<Viaje[]> => {
  const { data, error } = await supabase
    .from("viajes")
    .select(VIAJE_SELECT)
    .eq("destino_id", destinoId)
    .order("fecha", { ascending: true })
    .overrideTypes<Viaje[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar los viajes: ${error.message}`);
  return data;
});