import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StationsList } from "../components/StationsList";
import { CityFilter } from "../components/CityFilter";
import { useStationsStore } from "../store";
import type { Station } from "../types";

// Mock stations data
const mockStations: Station[] = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5251, lng: 13.3694 },
  {
    id: 2,
    name: "Berlin Ostbahnhof",
    city: "Berlin",
    lat: 52.5108,
    lng: 13.4348,
  },
  { id: 4, name: "Hamburg Hbf", city: "Hamburg", lat: 53.553, lng: 10.0067 },
  { id: 7, name: "Munich Hbf", city: "Munich", lat: 48.1402, lng: 11.5586 },
];

// Reset store before each test
beforeEach(() => {
  useStationsStore.setState({
    stations: [],
    filteredStations: [],
    selectedStationId: null,
    selectedCity: "",
    isLoading: false,
    error: null,
  });
});

describe("StationsList", () => {
  it("should render loading skeleton when loading", () => {
    useStationsStore.setState({ isLoading: true });
    render(<StationsList />);

    // Check for skeleton elements (they have animate-pulse class)
    const skeleton = document.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render error message when there is an error", () => {
    useStationsStore.setState({ error: "Failed to fetch stations" });
    render(<StationsList />);

    expect(screen.getByText("Failed to fetch stations")).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  it("should render empty state when no stations match filter", () => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: [],
    });
    render(<StationsList />);

    expect(
      screen.getByText("No stations found for this filter.")
    ).toBeInTheDocument();
  });

  it("should render stations list correctly", () => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
    });
    render(<StationsList />);

    expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
    expect(screen.getByText("Hamburg Hbf")).toBeInTheDocument();
    expect(screen.getByText("Munich Hbf")).toBeInTheDocument();
  });

  it("should select station when clicked", async () => {
    const user = userEvent.setup();
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
    });
    render(<StationsList />);

    const stationButton = screen.getByTestId("station-item-1");
    await user.click(stationButton);

    expect(useStationsStore.getState().selectedStationId).toBe(1);
  });

  it("should highlight selected station", async () => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
      selectedStationId: 1,
    });
    render(<StationsList />);

    const selectedStation = screen.getByTestId("station-item-1");
    expect(selectedStation).toHaveAttribute("aria-pressed", "true");
  });
});

describe("CityFilter", () => {
  it("should render city dropdown with all cities", () => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
    });
    render(<CityFilter />);

    const select = screen.getByTestId("city-filter");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("All Cities")).toBeInTheDocument();
  });

  it("should show correct station count", () => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
    });
    render(<CityFilter />);

    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/stations/)).toBeInTheDocument();
    // Verify count numbers are shown
    expect(screen.getAllByText("4")).toHaveLength(2); // filtered and total count
  });

  it("should filter stations when city is selected", async () => {
    const user = userEvent.setup();
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
    });
    render(<CityFilter />);

    const select = screen.getByTestId("city-filter");
    await user.selectOptions(select, "Berlin");

    await waitFor(() => {
      const state = useStationsStore.getState();
      expect(state.selectedCity).toBe("Berlin");
      expect(state.filteredStations).toHaveLength(2);
      expect(state.filteredStations.every((s) => s.city === "Berlin")).toBe(
        true
      );
    });
  });

  it("should show clear filter button when filter is active", async () => {
    const user = userEvent.setup();
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
    });
    render(<CityFilter />);

    const select = screen.getByTestId("city-filter");
    await user.selectOptions(select, "Berlin");

    expect(screen.getByText("Clear filter")).toBeInTheDocument();
  });

  it("should clear filter when clear button is clicked", async () => {
    const user = userEvent.setup();
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations.filter((s) => s.city === "Berlin"),
      selectedCity: "Berlin",
    });
    render(<CityFilter />);

    const clearButton = screen.getByText("Clear filter");
    await user.click(clearButton);

    await waitFor(() => {
      const state = useStationsStore.getState();
      expect(state.selectedCity).toBe("");
      expect(state.filteredStations).toHaveLength(mockStations.length);
    });
  });
});

describe("useStationsStore", () => {
  it("should have correct initial state", () => {
    const state = useStationsStore.getState();

    expect(state.stations).toEqual([]);
    expect(state.filteredStations).toEqual([]);
    expect(state.selectedStationId).toBeNull();
    expect(state.selectedCity).toBe("");
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should set selected station ID", () => {
    useStationsStore.getState().setSelectedStationId(5);
    expect(useStationsStore.getState().selectedStationId).toBe(5);
  });

  it("should set selected city and filter stations", () => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations,
    });
    useStationsStore.getState().setSelectedCity("Berlin");

    const state = useStationsStore.getState();
    expect(state.selectedCity).toBe("Berlin");
    expect(state.filteredStations).toHaveLength(2);
    expect(state.filteredStations.every((s) => s.city === "Berlin")).toBe(true);
  });

  it("should clear filter and show all stations", () => {
    useStationsStore.setState({
      stations: mockStations,
      filteredStations: mockStations.filter((s) => s.city === "Berlin"),
      selectedCity: "Berlin",
    });

    useStationsStore.getState().clearFilter();

    const state = useStationsStore.getState();
    expect(state.selectedCity).toBe("");
    expect(state.filteredStations).toHaveLength(mockStations.length);
  });

  it("should fetch stations successfully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockStations,
    });

    await useStationsStore.getState().fetchStations();

    const state = useStationsStore.getState();
    expect(state.stations).toEqual(mockStations);
    expect(state.filteredStations).toEqual(mockStations);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle fetch error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await useStationsStore.getState().fetchStations();

    const state = useStationsStore.getState();
    expect(state.error).toBe(
      "Failed to fetch stations: 500 Internal Server Error"
    );
    expect(state.isLoading).toBe(false);
  });
});
