# Zen Razor

A modern web application starter built with Next.js 15, React 19, Tailwind CSS 4, and shadcn/ui.

## Technologies

- **Next.js 15**: The React framework for building full-stack web applications with the App Router.
- **React 19**: The latest version of the popular JavaScript library for building user interfaces.
- **Tailwind CSS 4**: A utility-first CSS framework packed with classes for rapid UI development.
- **shadcn/ui**: Re-usable components built using Radix UI and Tailwind CSS.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Google Maps API**: Integration for location services with customized dark theme.

## Features

- Modern and responsive UI
- Dark mode support
- Type-safe code with TypeScript
- Optimized for performance
- Next.js App Router
- Modern component patterns
- Interactive maps with custom styling

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- Google Maps API Key (for maps functionality)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd zen-razor

# Install dependencies
npm install
```

### Setting Up Google Maps

1. Get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps JavaScript API and Places API in your project
3. Create a `.env.local` file in the root directory and add your API key:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

```bash
# Create a production build
npm run build

# Start the production server
npm start
```

## Project Structure

```
zen-razor/
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx   # Root layout component
│   │   └── page.tsx     # Home page component
│   └── lib/             # Utility functions and shared code
├── public/              # Static assets
└── ...                  # Configuration files
```

## License

This project is licensed under the MIT License.
