# Milan Business Catalog

A comprehensive business directory application for discovering and exploring businesses in Milan, Italy. This Next.js application provides users with an intuitive interface to browse businesses by category, search for specific services, view locations on an interactive map, and access detailed business information.

## Features

- Browse businesses by category
- Interactive map with business locations
- Search functionality
- Detailed business pages with photos, ratings, and reviews
- Responsive design for mobile and desktop
- Business filtering and sorting options
- Recently viewed and saved places functionality

## Technology Stack

- **Next.js 15** with App Router and Turbopack
- **React 19**
- **TypeScript** for type safety
- **Material UI (MUI)** v7 for UI components
- **Redux Toolkit** with RTK Query for state management and API calls
- **Leaflet** with React-Leaflet for mapping functionality
- **Emotion** for CSS-in-JS styling
- **date-fns** for date formatting
- **Swiper** for carousel components

## Project Structure

This project follows a layered architecture pattern:

```
milan-business-catalog/
├── app/                           # Next.js App Router pages
│   ├── (public)/                  # Public-facing pages
│   │   ├── business/              # Business detail pages
│   │   ├── category/              # Category browsing pages
│   │   ├── map/                   # Map view pages
│   │   └── search/                # Search functionality pages
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage
├── layers/                        # Layered architecture components
│   ├── 01_widgets/                # Presentational components
│   ├── 02_features/               # Feature components with business logic
│   ├── 03_entities/               # Business entities and data layer
│   └── 04_shared/                 # Shared utilities and types
├── public/                        # Static assets
└── package.json                   # Project dependencies and scripts
```

### Layer Descriptions

- **`layers/01_widgets/`**: Presentational components focused on UI elements like Header, Footer, Hero, BusinessHeader, PhotoGallery, etc.
- **`layers/02_features/`**: Feature components that handle specific functionality like BusinessCard, FilterPanel, Map, SearchForm, RatingPanel, etc.
- **`layers/03_entities/`**: Business entities and data layer including API definitions using RTK Query, store configuration, and entity models.
- **`layers/04_shared/`**: Shared utilities, type definitions, and common UI components.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/serdar1234/milan-business-catalog.git
cd milan-business-catalog
npm install
```

### Development

```bash
# Run the development server
npm run dev

# Run the development server on all network interfaces
npm run dev:local

# Build for production
npm run build

# Start production server
npm run start
```

### Additional Scripts

```bash
# Format code with Prettier
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## API Integration

The application consumes a REST API at `https://api.milanplaces.com/api/v1` with endpoints for:

- Categories
- Businesses
- Reviews
- Search functionality
- Autocomplete

## Deployment

The application is deployed on Vercel: https://milan-catalog.vercel.app/

## Environment Variables

This project does not require any environment variables for basic operation, as it consumes a public API.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
