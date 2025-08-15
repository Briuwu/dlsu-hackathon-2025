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

## Prerequisites

Make sure you have one of the following package managers installed:

- **Node.js 18+** and **npm** (comes with Node.js)
- **[Yarn](https://yarnpkg.com/)**
- **[pnpm](https://pnpm.io/)**
- **[Bun](https://bun.sh/)**

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
│   ├── onboarding/        # User onboarding flow
│   ├── messages/          # Message/notification pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── ui/               # Radix UI components
│   └── onboarding/       # Onboarding-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── public/              # Static assets
```

## Key Features

- **Location-based subscription** with GPS auto-detection
- **Real-time notifications** for LGU announcements
- **Responsive design** optimized for mobile and desktop
- **Modern UI** with dark/light theme support
- **Type-safe development** with TypeScript
- **Accessible components** using Radix UI primitives

## Development Notes

- Uses Next.js App Router for file-based routing
- Styled with Tailwind CSS and custom design system
- Form validation powered by React Hook Form + Zod
- All UI components are built with accessibility in mind
- Optimized for performance with Next.js best practices

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React concepts
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

For deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
