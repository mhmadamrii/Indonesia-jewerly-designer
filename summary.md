# React TanStarter - Indonesian Jewelry Designer Marketplace

## Overview

React TanStarter is a modern full-stack web application built for showcasing, discovering, and selling Indonesian jewelry designs. The platform combines traditional Indonesian craftsmanship with cutting-edge 3D visualization technology, creating an immersive marketplace for jewelry assets and designs.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 with TanStack Start (SSR/SSG)
- **Styling**: TailwindCSS 4.x with custom animations
- **UI Components**: 
  - Radix UI primitives
  - shadcn/ui component library
  - Custom animated components
- **3D Visualization**: Google Model Viewer for jewelry assets
- **Animations**: GSAP, Motion (Framer Motion), custom CSS animations
- **State Management**: Zustand + TanStack Query for server state

### Backend & Database
- **Runtime**: Node.js with Vite
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with Google OAuth
- **File Storage**: ImageKit integration + Backblaze B2
- **Payment Processing**: Midtrans integration
- **Caching**: Redis/IORedis for session management

### Development & Deployment
- **Language**: TypeScript with strict configuration
- **Build Tool**: Vite with React Compiler (Babel plugin)
- **Deployment**: Netlify (configured target)
- **Database Migration**: Drizzle Kit
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## 📁 Project Structure

```
src/
├── actions/          # Server actions
├── components/       # Reusable UI components
│   ├── 3D/          # 3D model components
│   ├── animate-ui/   # Custom animations
│   ├── landing-page/ # Landing page sections
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and configurations
│   ├── auth/        # Authentication setup
│   ├── db/          # Database schemas and config
│   ├── redis/       # Redis configuration
│   └── store/       # State management
├── routes/          # File-based routing
│   ├── (admin)/     # Admin panel routes
│   ├── (auth)/      # Authentication routes
│   ├── (main)/      # Main app routes
│   ├── (public)/    # Public routes
│   └── api/         # API endpoints
└── constants/       # Application constants
```

## 🗄️ Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

### Core Entities
- **Users**: Authentication and profile management with role-based access (user/artist)
- **Jewelry Assets**: 3D models and designs with metadata, pricing, and categorization
- **Categories & Tags**: Organization system for jewelry assets
- **Reviews & Ratings**: User feedback system

### E-commerce Features
- **Cart Items**: Shopping cart functionality
- **Wishlist Items**: Save for later functionality
- **Payments**: Transaction management with Midtrans integration
- **Notifications**: Real-time user notifications

### Social Features
- **Follow System**: User-to-user following relationships
- **Reviews**: Asset rating and review system
- **Feedback**: Platform feedback collection

## 🎨 Key Features

### 🏠 Landing Page
- Hero carousel with jewelry showcases
- Modern gradient typography and animations
- Responsive design with mobile-first approach
- SEO optimized with meta tags

### 🔐 Authentication
- Google OAuth integration
- Email/password authentication
- Role-based access control (User/Artist)
- Session management with Redis caching

### 💎 Jewelry Showcase
- 3D model visualization with Google Model Viewer
- Interactive asset browsing and filtering
- Category and tag-based organization
- High-quality image previews with ImageKit

### 🛒 E-commerce
- Shopping cart functionality
- Wishlist management
- Integrated payment processing (Midtrans)
- Order management and tracking

### 👥 User Management
- Artist/buyer role distinction
- Profile management
- Follow system for artists
- User-generated content (reviews, ratings)

### 📱 UI/UX
- Modern, responsive design
- Custom animations and transitions
- Accessibility-first approach with Radix UI
- Dark/light theme support
- Mobile-optimized interface

## 🛠️ Development Setup

### Prerequisites
- Node.js (latest LTS)
- pnpm package manager
- PostgreSQL database
- Redis server

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/tanstarter
VITE_BASE_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Available Scripts
- `pnpm dev` - Start development server (port 3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db` - Database operations with Drizzle Kit
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🚀 Deployment

The application is configured for Netlify deployment with:
- Serverless functions for API routes
- Static site generation for optimal performance
- Environment variable management
- Automatic builds from Git repository

## 🎯 Target Audience

- **Indonesian Jewelry Artists**: Platform to showcase and sell their designs
- **Jewelry Enthusiasts**: Discover and purchase unique Indonesian jewelry
- **Collectors**: Build collections of traditional and modern jewelry designs
- **International Buyers**: Access authentic Indonesian craftsmanship

## 📈 Business Model

- **Asset Marketplace**: Commission-based sales of jewelry designs
- **3D Asset Licensing**: Licensing of 3D jewelry models
- **Premium Features**: Enhanced visibility and promotion tools for artists
- **Subscription Services**: Premium memberships for advanced features

## 🔧 Technical Highlights

- **Modern React**: Utilizes React 19 with experimental features
- **Type Safety**: Full TypeScript coverage with strict configuration
- **Performance**: Optimized with React Compiler and SSR/SSG
- **Scalability**: Redis caching and efficient database queries
- **Developer Experience**: Hot reload, TypeScript paths, comprehensive tooling
- **Code Quality**: ESLint, Prettier, and automated formatting

## 📄 License

Licensed under standard terms (see LICENSE file)

---

**Note**: This is a comprehensive jewelry marketplace platform combining traditional Indonesian artistry with modern web technology, providing a unique space for artists to showcase their work and buyers to discover authentic jewelry designs.