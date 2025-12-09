# TwinkleStar Gold & Diamonds

## Overview

TwinkleStar is a luxury e-commerce website for a gold and diamond jewelry brand. The application features a premium dark theme design with metallic gold accents, showcasing products like gold necklaces, diamond rings, silver jewelry, coins, and bars. The platform includes a customer-facing storefront with product browsing, wishlists, and cart functionality, alongside an admin panel for product and review management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for local state (ShopContext)
- **Styling**: Tailwind CSS v4 with custom CSS variables for the luxury dark theme
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and effects
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON API under `/api/*` routes
- **Session Management**: express-session with in-memory store (configurable for production)
- **Authentication**: Simple session-based admin authentication with email/password

### Data Storage
- **Database**: PostgreSQL via Neon Serverless
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**:
  - `users` - Basic user accounts
  - `products` - Product catalog with extensive metadata (images, videos, specifications, tags)
  - `reviews` - Customer reviews with approval workflow
  - `adminUsers` - Admin accounts for backend management

### Key Design Patterns
- **Shared Schema**: Database schema and TypeScript types are defined once in `/shared/schema.ts` and used by both frontend and backend
- **API Client**: Centralized `apiRequest` function in `queryClient.ts` handles all API calls with consistent error handling
- **Storage Interface**: `IStorage` interface in `storage.ts` abstracts database operations, making it easy to swap implementations
- **Component Architecture**: Atomic design with reusable UI components in `components/ui/`, layout components in `components/layout/`, and feature components in `components/product/`

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # Reusable UI and feature components
    pages/        # Route-level page components
    lib/          # Utilities, context, and data helpers
    hooks/        # Custom React hooks
server/           # Backend Express application
  routes.ts       # API route definitions
  storage.ts      # Database access layer
  db.ts           # Database connection
  seed.ts         # Initial product data
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle schema and Zod validators
```

## External Dependencies

### Database
- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL database accessed via `@neondatabase/serverless` driver with WebSocket support
- **Connection**: Requires `DATABASE_URL` environment variable

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for UI transitions
- **embla-carousel-react**: Product image carousels
- **wouter**: Lightweight client-side routing

### UI Framework
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, accordions, etc.)
- **shadcn/ui**: Pre-built component library using Radix primitives
- **Tailwind CSS v4**: Utility-first CSS framework with custom theme configuration
- **lucide-react**: Icon library

### Build & Development
- **Vite**: Frontend build tool and dev server
- **esbuild**: Backend bundling for production
- **drizzle-kit**: Database migration and push tooling

### Integrations
- **WhatsApp Chat**: Floating chat widget linking to WhatsApp business number (+91 8885492229)
- **Analytics Ready**: Event tracking structure in place for Google Analytics (gtag) integration