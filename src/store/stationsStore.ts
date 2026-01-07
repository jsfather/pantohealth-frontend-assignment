import { create } from "zustand";
import type { StationsStore } from "../types";
import { fetchStationsData } from "../services";

/**
 * Zustand store for managing train stations state
 * Handles fetching, filtering, and selection of stations
 */
export const useStationsStore = create<StationsStore>((set, get) => ({
  // Initial state
  stations: [],
  filteredStations: [],
  selectedStationId: null,
  selectedCity: "",
  isLoading: false,
  error: null,

  /**
   * Fetches stations from the API and updates the store
   */
  fetchStations: async () => {
    set({ isLoading: true, error: null });

    try {
      const stations = await fetchStationsData();
      set({
        stations,
        filteredStations: stations,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  /**
   * Sets the selected city filter and updates filtered stations
   */
  setSelectedCity: (city: string) => {
    const { stations } = get();
    const filteredStations = city
      ? stations.filter((station) => station.city === city)
      : stations;

    set({
      selectedCity: city,
      filteredStations,
      selectedStationId: null, // Reset selection when filter changes
    });
  },

  /**
   * Sets the currently selected station ID
   */
  setSelectedStationId: (id: number | null) => {
    set({ selectedStationId: id });
  },

  /**
   * Clears the city filter and shows all stations
   */
  clearFilter: () => {
    const { stations } = get();
    set({
      selectedCity: "",
      filteredStations: stations,
      selectedStationId: null,
    });
  },
}));

/**
 * Selector to get unique cities from all stations
 */
export const selectUniqueCities = (state: StationsStore): string[] => {
  const cities = state.stations.map((station) => station.city);
  return [...new Set(cities)].sort();
};

/**
 * Selector to get the currently selected station
 */
export const selectSelectedStation = (state: StationsStore) => {
  if (state.selectedStationId === null) return null;
  return (
    state.stations.find((station) => station.id === state.selectedStationId) ||
    null
  );
};
