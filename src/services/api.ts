import type { Station } from "../types";

const API_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw";

/**
 * Fetches train station data from the GitHub Gist API
 * @returns Promise with array of stations
 * @throws Error if the fetch fails or data is invalid
 */
export async function fetchStationsData(): Promise<Station[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch stations: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  // Validate that the data is an array
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format: expected an array of stations");
  }

  // Validate each station has required fields
  const validatedStations: Station[] = data.map((item: unknown) => {
    const station = item as Record<string, unknown>;

    if (
      typeof station.id !== "number" ||
      typeof station.name !== "string" ||
      typeof station.city !== "string" ||
      typeof station.lat !== "number" ||
      typeof station.lng !== "number"
    ) {
      throw new Error("Invalid station data format");
    }

    return {
      id: station.id,
      name: station.name,
      city: station.city,
      lat: station.lat,
      lng: station.lng,
    };
  });

  return validatedStations;
}
