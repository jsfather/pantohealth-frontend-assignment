import { useMemo } from "react";
import { useStationsStore } from "../store";

/**
 * City filter component with dropdown selection
 */
export function CityFilter() {
  const stations = useStationsStore((state) => state.stations);
  const selectedCity = useStationsStore((state) => state.selectedCity);
  const setSelectedCity = useStationsStore((state) => state.setSelectedCity);
  const clearFilter = useStationsStore((state) => state.clearFilter);
  const filteredStations = useStationsStore((state) => state.filteredStations);
  const isLoading = useStationsStore((state) => state.isLoading);

  // Memoize the cities list to avoid recalculating on every render
  const cities = useMemo(() => {
    const citySet = new Set(stations.map((station) => station.city));
    return [...citySet].sort();
  }, [stations]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    if (city === "") {
      clearFilter();
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={isLoading}
          className="
            w-full p-3 pr-10 rounded-lg border-2 border-gray-200
            bg-white text-gray-900
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200 appearance-none cursor-pointer
          "
          aria-label="Filter by city"
          data-testid="city-filter"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Station count and clear filter */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredStations.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">{stations.length}</span>{" "}
          stations
        </span>
        {selectedCity && (
          <button
            onClick={clearFilter}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
          >
            Clear filter
          </button>
        )}
      </div>
    </div>
  );
}
