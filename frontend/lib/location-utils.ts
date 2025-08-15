import { Municipality, philippineMunicipalities } from "./philippines-data";

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Find the nearest municipality to given coordinates
export function findNearestMunicipality(
  latitude: number,
  longitude: number
): Municipality | null {
  let nearestMunicipality: Municipality | null = null;
  let shortestDistance = Infinity;

  philippineMunicipalities.forEach((municipality) => {
    if (municipality.latitude && municipality.longitude) {
      const distance = calculateDistance(
        latitude,
        longitude,
        municipality.latitude,
        municipality.longitude
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestMunicipality = municipality;
      }
    }
  });

  return nearestMunicipality;
}

// Format location display text
export function formatLocationDisplay(municipality: Municipality): string {
  return `${municipality.name}, ${municipality.province}`;
}

// Validate if coordinates are within Philippine bounds (approximate)
export function isWithinPhilippines(
  latitude: number,
  longitude: number
): boolean {
  // Approximate bounds of the Philippines
  const bounds = {
    north: 21.0,
    south: 4.5,
    east: 127.0,
    west: 116.0,
  };

  return (
    latitude >= bounds.south &&
    latitude <= bounds.north &&
    longitude >= bounds.west &&
    longitude <= bounds.east
  );
}
