// datos-de-prueba.js
// Seis especies de prueba de Colombia con los mismos campos que luego vendrán de la API.

export const especies = [
  {
    id: "oso-anteojos",
    nombre: "Oso de anteojos",
    cientifico: "Tremarctos ornatus",
    reino: "Animalia",
    familia: "Ursidae",
    region: "Bosques andinos y páramos",
    estado: "Vulnerable",
  },
  {
    id: "jaguar",
    nombre: "Jaguar",
    cientifico: "Panthera onca",
    reino: "Animalia",
    familia: "Felidae",
    region: "Amazonía y Chocó",
    estado: "Casi amenazado",
  },
  {
    id: "gallito-rocas",
    nombre: "Gallito de las rocas andino",
    cientifico: "Rupicola peruvianus",
    reino: "Animalia",
    familia: "Cotingidae",
    region: "Bosques de niebla",
    estado: "Preocupación menor",
  },
  {
    id: "frailejon",
    nombre: "Frailejón",
    cientifico: "Espeletia grandiflora",
    reino: "Plantae",
    familia: "Asteraceae",
    region: "Páramos andinos",
    estado: "Vulnerable",
  },
  {
    id: "condor-andes",
    nombre: "Cóndor de los Andes",
    cientifico: "Vultur gryphus",
    reino: "Animalia",
    familia: "Cathartidae",
    region: "Alta montaña",
    estado: "Vulnerable",
  },
  {
    id: "palma-cera",
    nombre: "Palma de cera del Quindío",
    cientifico: "Ceroxylon quindiuense",
    reino: "Plantae",
    familia: "Arecaceae",
    region: "Valle de Cocora, Quindío",
    estado: "En peligro",
  },
];

// Listas para los filtros, calculadas automáticamente sin repetidos con new Set()
export const reinos = [...new Set(especies.map((e) => e.reino))];
export const familias = [...new Set(especies.map((e) => e.familia))];
