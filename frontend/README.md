# PulsePH Frontend

The frontend application for PulsePH - a platform that aggregates Local Government Unit (LGU) announcements and delivers them instantly to users based on location.

> Feel the heartbeat of your local community — LGU announcements right at your fingertips.

## Tech Stack

### Core Framework

- **[Next.js 15.4.6](https://nextjs.org)** - React framework with App Router
- **[React 19.1.0](https://react.dev)** - Frontend library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### UI & Styling

- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework with custom design tokens
- **[Radix UI](https://www.radix-ui.com/)** - Headless accessible UI components (Button, Card, Dialog, Popover, etc.)
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[class-variance-authority](https://cva.style/)** - Component variant styling
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional CSS classes

### Key Components Used

- **[cmdk](https://cmdk.paco.me/)** - Command palette for location search
- **[input-otp](https://input-otp.rodz.dev/)** - OTP input component for phone verification

### Custom Implementation

- **Location Services** - Custom geolocation hook with Philippines municipalities data
- **Authentication Flow** - Phone number verification with OTP
- **Onboarding System** - Multi-step location selection and user setup
- **Notification System** - Real-time notification context and hooks
- **Message Management** - Custom hooks for message handling and API integration

## Prerequisites

Make sure you have one of the following package managers installed:

- **Node.js 18+** and **npm** (comes with Node.js)

## Getting Started

1. **Clone the repository and navigate to frontend:**

   ```bash
   git clone <repository-url>
   cd dlsu-hackathon-2025/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

The page auto-updates as you edit files. Start by modifying `app/page.tsx`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   └── page.tsx       # Phone verification & OTP
│   ├── onboarding/        # User onboarding flow
│   │   └── page.tsx       # Location setup and user preferences
│   ├── messages/          # Message/notification pages
│   │   └── page.tsx       # LGU announcements and notifications
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing/home page
│   ├── globals.css        # Global styles and Tailwind imports
│   └── favicon.ico        # App icon
├── components/            # Reusable React components
│   ├── ui/               # Shadcn/ui + Radix UI components (40+ components)
│   │   ├── button.tsx    # Button variations
│   │   ├── card.tsx      # Card layouts
│   │   ├── dialog.tsx    # Modal dialogs
│   │   ├── form.tsx      # Form components
│   │   ├── input.tsx     # Input fields
│   │   ├── input-otp.tsx # OTP input component
│   │   ├── message-bubble.tsx     # Chat-style message bubbles
│   │   ├── imessage-header.tsx    # iOS-style message headers
│   │   ├── imessage-input.tsx     # iOS-style message input
│   │   ├── ios-notification.tsx   # iOS-style notifications
│   │   ├── iphone-status-bar.tsx  # iOS status bar component
│   │   └── ... (35+ more UI components)
│   └── onboarding/       # Onboarding-specific components
│       ├── LocationConfirmation.tsx  # Location confirmation step
│       ├── LocationSelector.tsx      # Location selection with search
│       └── OnboardingHeader.tsx      # Onboarding flow header
├── contexts/              # React Context providers
│   └── NotificationContext.tsx      # Global notification state
├── hooks/                # Custom React hooks
│   ├── use-mobile.ts     # Mobile device detection
│   ├── useGeolocation.ts # GPS location services
│   ├── useMessages.ts    # Message management
│   └── useNotificationSystem.ts     # Notification handling
├── lib/                  # Utility functions and configurations
│   ├── api/              # API layer
│   │   └── messages.ts   # Message API endpoints
│   ├── auth-utils.ts     # Authentication utilities
│   ├── location-utils.ts # Location processing utilities
│   ├── philippines-data.ts # Philippine municipalities dataset
│   └── utils.ts          # General utility functions
├── types/                # TypeScript type definitions
│   └── message.ts        # Message and notification types
├── public/              # Static assets
│   ├── *.svg            # Icon assets
│   └── ...
├── components.json      # Shadcn/ui configuration
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── postcss.config.mjs   # PostCSS configuration
├── eslint.config.mjs    # ESLint configuration
└── package.json         # Dependencies and scripts
```

## Key Features

### Core Functionality

- **Location-based subscription** with GPS auto-detection and manual location selection
- **Real-time notifications** for LGU announcements with iOS-style notification components
- **Multi-step onboarding** with location confirmation and user preferences
- **Phone-based authentication** with OTP verification system
- **Message management** with chat-style interfaces and comprehensive message handling

### User Experience

- **Responsive design** optimized for mobile and desktop experiences
- **Modern UI** with dark/light theme support via next-themes
- **iOS-inspired components** including status bar, notifications, and message bubbles
- **Accessible design** using Radix UI primitives for screen readers and keyboard navigation
- **Interactive animations** with custom Tailwind animations and smooth transitions

### Technical Features

- **Type-safe development** with TypeScript across all components and utilities
- **Form validation** with React Hook Form and Zod schema validation
- **Real-time updates** through custom notification context and hooks
- **Comprehensive UI library** with 40+ pre-built Shadcn/ui components
- **Philippines location data** with complete municipalities dataset
- **Geolocation services** with custom hooks for GPS and location utilities

## Development Notes

### Architecture

- **Next.js App Router** for file-based routing with server and client components
- **Styled with Tailwind CSS 4** and custom design system with design tokens
- **Shadcn/ui component system** with Radix UI primitives for consistent, accessible UI
- **Context-based state management** for notifications and global app state

### Code Quality & Validation

- **Form validation** powered by React Hook Form + Zod for type-safe forms
- **TypeScript strict mode** for comprehensive type checking
- **ESLint configuration** for code quality and consistency
- **Component composition** patterns for reusable and maintainable code

### Performance & Accessibility

- **All UI components** built with accessibility in mind (ARIA, keyboard navigation)
- **Optimized for performance** with Next.js best practices (lazy loading, code splitting)
- **Mobile-first responsive design** with optimized touch interactions
- **Theme system** for seamless dark/light mode transitions

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React concepts
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

For deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
