// src/services/api.js
// Único archivo que habla con la API pública de iNaturalist.
// Si la API falla o tarda más de 8s, usa datos-de-prueba.js como red de seguridad.

import { especies as especiesDePrueba } from "../data/datos-de-prueba.js";

const API_BASE = "https://api.inaturalist.org/v1";

const GRUPOS_ES = {
  Plantae: { reino: "Plantae", grupo: "Plantas" },
  Fungi: { reino: "Fungi", grupo: "Hongos" },
  Aves: { reino: "Animalia", grupo: "Aves" },
  Mammalia: { reino: "Animalia", grupo: "Mamíferos" },
  Reptilia: { reino: "Animalia", grupo: "Reptiles" },
  Amphibia: { reino: "Animalia", grupo: "Anfibios" },
  Insecta: { reino: "Animalia", grupo: "Insectos" },
  Arachnida: { reino: "Animalia", grupo: "Arácnidos" },
  Actinopterygii: { reino: "Animalia", grupo: "Peces" },
  Mollusca: { reino: "Animalia", grupo: "Moluscos" },
};

function adaptarEspecie(item) {
  const taxon = item.taxon || {};
  const infoGrupo = GRUPOS_ES[taxon.iconic_taxon_name] || {
    reino: "Animalia",
    grupo: taxon.iconic_taxon_name || "Biodiversidad",
  };

  return {
    id: String(taxon.id),
    nombre: taxon.preferred_common_name || taxon.name || "Especie sin nombre",
    cientifico: taxon.name || "",
    reino: infoGrupo.reino,
    familia: infoGrupo.grupo,
    region: "Colombia",
    estado: `${(item.count ||        0).toLocaleString("es-CO")} registros`,
    imagen: taxon.default_photo?.medium_url || "",
    wikipedia: taxon.wikipedia_url || "",
  };
}

export async function obtenerEspecies() {
  try {
    const resLugar = await fetch(`${API_BASE}/places/autocomplete?q=Colombia`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!resLugar.ok) throw new Error(`Error lugar: ${resLugar.status}`);
    const datosLugar = await resLugar.json();
    const colombia =
      datosLugar.results?.find(
        (p) => p.name === "Colombia" && p.place_type === 12
      ) || datosLugar.results?.[0];

    if (!colombia?.id) throw new Error("No se encontró Colombia en iNaturalist");

    const url = `${API_BASE}/observations/species_counts?place_id=${colombia.id}&verifiable=true&locale=es&per_page=18`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Error API: ${res.status}`);

    const data = await res.json();
    const lista = (data.results || [])
      .filter((item) => item.taxon?.default_photo?.medium_url)
      .map(adaptarEspecie);

    return lista.length > 0 ? lista : especiesDePrueba;
  } catch (error) {
    console.warn("[api] Usando datos de prueba por fallo en iNaturalist:", error);
    return especiesDePrueba;
  }
}

export function obtenerFiltros(lista) {
  return {
    reinos: [...new Set(lista.map((e) => e.reino))],
    familias: [...new Set(lista.map((e) => e.familia))],
  };
}