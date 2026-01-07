import { useEffect } from "react";
import { Header, StationsMap, StationsList, CityFilter } from "./components";
import { useStationsStore } from "./store";

function App() {
  const fetchStations = useStationsStore((state) => state.fetchStations);
  const isLoading = useStationsStore((state) => state.isLoading);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Sidebar with filter and stations list */}
          <aside className="lg:col-span-1 bg-white rounded-xl shadow-lg p-4 flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Filter Stations
              </h2>
              <CityFilter />
            </div>

            <div className="flex-1 mt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Stations List
              </h2>
              <StationsList />
            </div>
          </aside>

          {/* Map container */}
          <section className="lg:col-span-2 h-[500px] lg:h-auto min-h-[500px]">
            {!isLoading && <StationsMap />}
            {isLoading && (
              <div className="h-full w-full rounded-lg bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <p className="mt-4 text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} German Train Stations Viewer |
            Built for{" "}
            <a
              href="https://pantohealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              PANTOhealth
            </a>{" "}
            Frontend Assignment
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
