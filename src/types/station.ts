/**
 * Represents a train station in Germany
 */
export interface Station {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
}

/**
 * State for the stations store
 */
export interface StationsState {
  stations: Station[];
  filteredStations: Station[];
  selectedStationId: number | null;
  selectedCity: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Actions for the stations store
 */
export interface StationsActions {
  fetchStations: () => Promise<void>;
  setSelectedCity: (city: string) => void;
  setSelectedStationId: (id: number | null) => void;
  clearFilter: () => void;
}

/**
 * Combined store type
 */
export type StationsStore = StationsState & StationsActions;
