import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useStationsStore, selectSelectedStation } from "../store";
import type { Station } from "../types";

// Fix for default marker icons in bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Set up default icon
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Create highlighted icon for selected station
const highlightedIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "highlighted",
});

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Germany center coordinates
const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;
const SELECTED_ZOOM = 12;

/**
 * Component that handles map interactions when a station is selected
 */
function MapController() {
  const selectedStation = useStationsStore(selectSelectedStation);
  const map = useMap();
  const previousStationId = useRef<number | null>(null);

  useEffect(() => {
    if (selectedStation && selectedStation.id !== previousStationId.current) {
      map.flyTo([selectedStation.lat, selectedStation.lng], SELECTED_ZOOM, {
        duration: 0.5,
      });
      previousStationId.current = selectedStation.id;
    }
  }, [selectedStation, map]);

  return null;
}

/**
 * Individual station marker component
 */
interface StationMarkerProps {
  station: Station;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

function StationMarker({ station, isSelected, onSelect }: StationMarkerProps) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isSelected]);

  return (
    <Marker
      ref={markerRef}
      position={[station.lat, station.lng]}
      icon={isSelected ? highlightedIcon : defaultIcon}
      eventHandlers={{
        click: () => onSelect(station.id),
      }}
    >
      <Popup>
        <div className="text-center">
          <h3 className="font-bold text-gray-900">{station.name}</h3>
          <p className="text-gray-600 text-sm">{station.city}</p>
        </div>
      </Popup>
    </Marker>
  );
}

/**
 * Main map component displaying train stations
 */
export function StationsMap() {
  const filteredStations = useStationsStore((state) => state.filteredStations);
  const selectedStationId = useStationsStore(
    (state) => state.selectedStationId
  );
  const setSelectedStationId = useStationsStore(
    (state) => state.setSelectedStationId
  );

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={GERMANY_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController />
        {filteredStations.map((station) => (
          <StationMarker
            key={station.id}
            station={station}
            isSelected={station.id === selectedStationId}
            onSelect={setSelectedStationId}
          />
        ))}
      </MapContainer>
    </div>
  );
}
