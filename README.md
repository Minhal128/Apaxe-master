# ApexTrade Dashboard

An exact clone of the ApexTrade dashboard built with React and shadcn/ui.

## Features

- ✅ Dashboard page with stats cards, charts, and recent trades
- ✅ Clients page with filters and client data table
- ✅ Responsive sidebar navigation
- ✅ Header with search and user profile
- ✅ Exact styling and spacing matching the design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- React Router for navigation
- Lucide React for icons

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── Layout.jsx    # Main layout wrapper
│   ├── Sidebar.jsx   # Navigation sidebar
│   └── Header.jsx    # Top header bar
├── pages/
│   ├── Dashboard.jsx # Dashboard page
│   └── Clients.jsx   # Clients page
├── lib/
│   └── utils.js      # Utility functions
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Pages

### Dashboard
- Total Active Clients stat card with trend line
- Total Trades today stat card
- Total P&L stat card
- Total Funds stat card
- Top clients bar chart
- P&L Overview line chart
- Recent trades table

### Clients
- Total Clients stat card
- Active Clients stat card
- Margin call stat card
- Frozen call stat card
- Filters (Role, Market, Date range)
- Search functionality
- Add clients button
- Clients data table with status indicators
