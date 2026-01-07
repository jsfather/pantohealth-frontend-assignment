# German Train Stations Map

A React application that visualizes train stations across Germany on an interactive Leaflet map. Built for the PANTOhealth Frontend Assignment.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-cyan)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green)

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app)

## ✨ Features

### Data Fetching

- ✅ Fetches station data from the provided GitHub Gist API
- ✅ Loading state with skeleton loaders
- ✅ Error state with retry functionality
- ✅ Data validation and type safety

### Map Visualization

- ✅ Interactive Leaflet map centered on Germany
- ✅ Station markers with popup information
- ✅ Highlighted markers for selected stations
- ✅ Smooth fly-to animation when selecting stations
- ✅ Responsive map container

### Stations List

- ✅ Scrollable list of all stations
- ✅ Shows station name and city
- ✅ Visual highlighting for selected station
- ✅ Click to select and zoom to station on map
- ✅ Loading skeleton animation
- ✅ Empty state when no results match filter

### City Filter

- ✅ Dropdown to filter stations by city
- ✅ Shows count of filtered vs total stations
- ✅ Clear filter button when filter is active
- ✅ Filter updates both list and map markers

### Interaction

- ✅ Clicking a station in the list zooms to its location on the map
- ✅ Selected station is highlighted both in list and on map
- ✅ Marker popup opens automatically for selected station

### Testing

- ✅ 17 meaningful unit tests
- ✅ Tests for StationsList component
- ✅ Tests for CityFilter component
- ✅ Tests for Zustand store actions and state
- ✅ Tests for API error handling

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Leaflet + React-Leaflet** - Map visualization
- **Zustand** - State management
- **Vitest** - Testing framework
- **Testing Library** - React component testing

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CityFilter.tsx   # City filter dropdown
│   ├── Header.tsx       # App header
│   ├── StationsList.tsx # Stations list with selection
│   ├── StationsMap.tsx  # Leaflet map component
│   └── index.ts         # Component exports
├── services/            # API services
│   ├── api.ts           # Fetch stations data
│   └── index.ts
├── store/               # State management
│   ├── stationsStore.ts # Zustand store
│   └── index.ts
├── test/                # Test files
│   ├── setup.ts         # Test configuration
│   └── stations.test.tsx # Component and store tests
├── types/               # TypeScript types
│   ├── station.ts       # Station interfaces
│   └── index.ts
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh/) package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/pantohealth-frontend-assignment.git
cd pantohealth-frontend-assignment
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `bun run dev`           | Start development server       |
| `bun run build`         | Build for production           |
| `bun run preview`       | Preview production build       |
| `bun run test`          | Run tests in watch mode        |
| `bun run test:run`      | Run tests once                 |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run lint`          | Run ESLint                     |

## 🧪 Testing

Run the test suite:

```bash
bun run test:run
```

Run tests with coverage:

```bash
bun run test:coverage
```

### Test Coverage

The application includes comprehensive tests for:

- **StationsList Component**

  - Loading skeleton display
  - Error message and retry button
  - Empty state when no stations match
  - Station list rendering
  - Station selection
  - Selected station highlighting

- **CityFilter Component**

  - City dropdown rendering
  - Station count display
  - City filter selection
  - Clear filter functionality

- **Zustand Store**
  - Initial state
  - Station selection
  - City filtering
  - Filter clearing
  - API fetch success/error handling

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and configure the build
4. Click Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `dist`
5. Click Deploy

## 📡 API

The application fetches station data from:

```
https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw
```

### Data Format

```typescript
interface Station {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
}
```

### Available Cities

- Berlin (3 stations)
- Cologne (3 stations)
- Dresden (3 stations)
- Düsseldorf (3 stations)
- Frankfurt (3 stations)
- Hamburg (3 stations)
- Leipzig (3 stations)
- Munich (3 stations)
- Nuremberg (3 stations)
- Stuttgart (3 stations)

## 📝 License

This project was created for the PANTOhealth Frontend Assignment.

## 📧 Contact

For questions about this assignment, contact: mehdi@panto.org
