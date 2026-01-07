import { useStationsStore } from "../store";
import type { Station } from "../types";

/**
 * Individual station list item component
 */
interface StationItemProps {
  station: Station;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

function StationItem({ station, isSelected, onSelect }: StationItemProps) {
  return (
    <button
      onClick={() => onSelect(station.id)}
      className={`
        w-full text-left p-3 rounded-lg transition-all duration-200
        border-2 cursor-pointer
        ${
          isSelected
            ? "bg-blue-50 border-blue-500 shadow-md"
            : "bg-white border-gray-200 hover:border-blue-300 hover:bg-gray-50"
        }
      `}
      aria-pressed={isSelected}
      data-testid={`station-item-${station.id}`}
    >
      <h3
        className={`font-semibold ${
          isSelected ? "text-blue-700" : "text-gray-900"
        }`}
      >
        {station.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        <span className="inline-flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {station.city}
        </span>
      </p>
    </button>
  );
}

/**
 * Loading skeleton for station items
 */
function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="p-3 rounded-lg border-2 border-gray-200 animate-pulse"
        >
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

/**
 * Error display component
 */
interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="text-center py-8">
      <div className="text-red-500 mb-4">
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-gray-700 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  return (
    <div className="text-center py-8">
      <svg
        className="w-12 h-12 mx-auto text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-gray-600">No stations found for this filter.</p>
    </div>
  );
}

/**
 * Main stations list component
 */
export function StationsList() {
  const filteredStations = useStationsStore((state) => state.filteredStations);
  const selectedStationId = useStationsStore(
    (state) => state.selectedStationId
  );
  const setSelectedStationId = useStationsStore(
    (state) => state.setSelectedStationId
  );
  const isLoading = useStationsStore((state) => state.isLoading);
  const error = useStationsStore((state) => state.error);
  const fetchStations = useStationsStore((state) => state.fetchStations);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchStations} />;
  }

  if (filteredStations.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="space-y-2 overflow-y-auto stations-list pr-1"
      style={{ maxHeight: "calc(100vh - 220px)" }}
      data-testid="stations-list"
    >
      {filteredStations.map((station) => (
        <StationItem
          key={station.id}
          station={station}
          isSelected={station.id === selectedStationId}
          onSelect={setSelectedStationId}
        />
      ))}
    </div>
  );
}
