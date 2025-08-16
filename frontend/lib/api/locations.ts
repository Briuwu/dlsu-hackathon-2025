// API Configuration
const API_BASE_URL = "http://localhost:8000";

/**
 * Fetches location names from the backend API
 * @returns Promise with array of location names
 */
export async function fetchLocationNames(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/lgus/names`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const locationNames: string[] = await response.json();
    return locationNames;
  } catch (error) {
    console.error("Error fetching location names:", error);

    // Fallback to a few sample locations if API fails
    return [
      "General Trias",
      "Noveleta",
      "Manila",
      "Quezon City",
      "Makati",
      "Taguig",
      "Pasig",
    ];
  }
}
