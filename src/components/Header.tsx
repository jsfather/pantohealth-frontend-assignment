/**
 * Header component with app title and branding
 */
export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">German Train Stations</h1>
              <p className="text-blue-200 text-sm">
                Interactive map of railway stations across Germany
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-blue-200">
            <span>Powered by</span>
            <a
              href="https://pantohealth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-blue-200 transition-colors"
            >
              PANTOhealth
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
