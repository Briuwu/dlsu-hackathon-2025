export interface Municipality {
  id: string;
  name: string;
  province: string;
  region: string;
  latitude?: number;
  longitude?: number;
}

// Sample of Philippine municipalities with coordinates
// In a real app, this would be a comprehensive database or API
export const philippineMunicipalities: Municipality[] = [
  // Metro Manila
  {
    id: "mnl-001",
    name: "Manila",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.5995,
    longitude: 120.9842,
  },
  {
    id: "qc-001",
    name: "Quezon City",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.676,
    longitude: 121.0437,
  },
  {
    id: "mkti-001",
    name: "Makati",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.5547,
    longitude: 121.0244,
  },
  {
    id: "tgig-001",
    name: "Taguig",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.5176,
    longitude: 121.0509,
  },
  {
    id: "ps-001",
    name: "Pasig",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.5764,
    longitude: 121.0851,
  },
  {
    id: "mndl-001",
    name: "Mandaluyong",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.5794,
    longitude: 121.0359,
  },
  {
    id: "par-001",
    name: "Parañaque",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.4793,
    longitude: 121.0198,
  },
  {
    id: "las-001",
    name: "Las Piñas",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.4378,
    longitude: 120.9947,
  },
  {
    id: "mun-001",
    name: "Muntinlupa",
    province: "Metro Manila",
    region: "NCR",
    latitude: 14.4037,
    longitude: 121.0365,
  },

  // Bulacan
  {
    id: "mlp-001",
    name: "Malolos",
    province: "Bulacan",
    region: "Central Luzon",
    latitude: 14.8434,
    longitude: 120.8157,
  },
  {
    id: "mrc-001",
    name: "Marilao",
    province: "Bulacan",
    region: "Central Luzon",
    latitude: 14.7571,
    longitude: 120.9472,
  },
  {
    id: "boc-001",
    name: "Bocaue",
    province: "Bulacan",
    region: "Central Luzon",
    latitude: 14.7986,
    longitude: 120.9292,
  },
  {
    id: "bul-001",
    name: "Bulacan",
    province: "Bulacan",
    region: "Central Luzon",
    latitude: 14.7928,
    longitude: 120.8787,
  },

  // Cavite
  {
    id: "bac-001",
    name: "Bacoor",
    province: "Cavite",
    region: "CALABARZON",
    latitude: 14.4588,
    longitude: 120.9353,
  },
  {
    id: "ims-001",
    name: "Imus",
    province: "Cavite",
    region: "CALABARZON",
    latitude: 14.4297,
    longitude: 120.937,
  },
  {
    id: "dmt-001",
    name: "Dasmariñas",
    province: "Cavite",
    region: "CALABARZON",
    latitude: 14.3294,
    longitude: 120.9367,
  },
  {
    id: "cav-001",
    name: "Cavite City",
    province: "Cavite",
    region: "CALABARZON",
    latitude: 14.4791,
    longitude: 120.8984,
  },

  // Laguna
  {
    id: "scr-001",
    name: "Santa Cruz",
    province: "Laguna",
    region: "CALABARZON",
    latitude: 14.2787,
    longitude: 121.4164,
  },
  {
    id: "cal-001",
    name: "Calamba",
    province: "Laguna",
    region: "CALABARZON",
    latitude: 14.2118,
    longitude: 121.1653,
  },
  {
    id: "bns-001",
    name: "Biñan",
    province: "Laguna",
    region: "CALABARZON",
    latitude: 14.3386,
    longitude: 121.0808,
  },
  {
    id: "str-001",
    name: "Santa Rosa",
    province: "Laguna",
    region: "CALABARZON",
    latitude: 14.3123,
    longitude: 121.1114,
  },

  // Rizal
  {
    id: "ant-001",
    name: "Antipolo",
    province: "Rizal",
    region: "CALABARZON",
    latitude: 14.5873,
    longitude: 121.1759,
  },
  {
    id: "cai-001",
    name: "Cainta",
    province: "Rizal",
    region: "CALABARZON",
    latitude: 14.5774,
    longitude: 121.1222,
  },
  {
    id: "tar-001",
    name: "Taytay",
    province: "Rizal",
    region: "CALABARZON",
    latitude: 14.5574,
    longitude: 121.1329,
  },

  // Cebu
  {
    id: "ceb-001",
    name: "Cebu City",
    province: "Cebu",
    region: "Central Visayas",
    latitude: 10.3157,
    longitude: 123.8854,
  },
  {
    id: "lap-001",
    name: "Lapu-Lapu",
    province: "Cebu",
    region: "Central Visayas",
    latitude: 10.3103,
    longitude: 123.9494,
  },
  {
    id: "mnd-001",
    name: "Mandaue",
    province: "Cebu",
    region: "Central Visayas",
    latitude: 10.3237,
    longitude: 123.9227,
  },
  {
    id: "tol-001",
    name: "Toledo",
    province: "Cebu",
    region: "Central Visayas",
    latitude: 10.3769,
    longitude: 123.6403,
  },

  // Davao
  {
    id: "dav-001",
    name: "Davao City",
    province: "Davao del Sur",
    region: "Davao Region",
    latitude: 7.0731,
    longitude: 125.6128,
  },
  {
    id: "tag-001",
    name: "Tagum",
    province: "Davao del Norte",
    region: "Davao Region",
    latitude: 7.4479,
    longitude: 125.8072,
  },
  {
    id: "dgo-001",
    name: "Digos",
    province: "Davao del Sur",
    region: "Davao Region",
    latitude: 6.7496,
    longitude: 125.3564,
  },

  // Pampanga
  {
    id: "ac-001",
    name: "Angeles City",
    province: "Pampanga",
    region: "Central Luzon",
    latitude: 15.145,
    longitude: 120.595,
  },
  {
    id: "sf-001",
    name: "San Fernando",
    province: "Pampanga",
    region: "Central Luzon",
    latitude: 15.0349,
    longitude: 120.689,
  },
  {
    id: "mac-001",
    name: "Mabalacat",
    province: "Pampanga",
    region: "Central Luzon",
    latitude: 15.227,
    longitude: 120.5715,
  },

  // Batangas
  {
    id: "bat-001",
    name: "Batangas City",
    province: "Batangas",
    region: "CALABARZON",
    latitude: 13.7565,
    longitude: 121.0583,
  },
  {
    id: "lip-001",
    name: "Lipa",
    province: "Batangas",
    region: "CALABARZON",
    latitude: 13.9411,
    longitude: 121.164,
  },
  {
    id: "tan-001",
    name: "Tanauan",
    province: "Batangas",
    region: "CALABARZON",
    latitude: 14.0856,
    longitude: 121.1489,
  },

  // Add more municipalities as needed
];

// Function to get municipalities by province
export const getMunicipalitiesByProvince = (
  province: string
): Municipality[] => {
  return philippineMunicipalities.filter((m) => m.province === province);
};

// Function to get all provinces
export const getAllProvinces = (): string[] => {
  const provinces = [
    ...new Set(philippineMunicipalities.map((m) => m.province)),
  ];
  return provinces.sort();
};

// Function to search municipalities
export const searchMunicipalities = (query: string): Municipality[] => {
  const lowercaseQuery = query.toLowerCase();
  return philippineMunicipalities.filter(
    (m) =>
      m.name.toLowerCase().includes(lowercaseQuery) ||
      m.province.toLowerCase().includes(lowercaseQuery)
  );
};
