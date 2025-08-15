import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bell,
  MapPin,
  Zap,
  Newspaper,
  Clock,
  CalendarX,
  LayoutGrid,
} from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-surface p-8 rounded-2xl border border-border hover:border-border-light transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
    <div className="flex items-center justify-center w-14 h-14 bg-accent/20 text-accent rounded-xl mb-6">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-semibold text-text mb-3">{title}</h3>
    <p className="text-text-muted leading-relaxed">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="bg-background text-text">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold text-text">PulsePH</div>
            <Button
              asChild
              className="bg-accent text-white hover:bg-accent-light rounded-full px-6 shadow-lg shadow-accent/25"
            >
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 lg:px-8">
        <section className="text-center py-24 sm:py-32">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight tracking-tight">
            Never Miss a Critical Local Announcement Again
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-xl text-text-secondary leading-relaxed">
            Feel the heartbeat of your local community. PulsePH aggregates LGU
            announcements and delivers them right to your fingertips, instantly.
          </p>
          <div className="mt-12">
            <Button
              size="lg"
              asChild
              className="bg-accent text-white hover:bg-accent-light rounded-full px-8 py-4 text-lg shadow-lg shadow-accent/25"
            >
              <Link href="/auth">
                Get Started for Free <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
          </div>
          <div className="mt-20">
            <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-surface to-surface-raised h-96 rounded-3xl border border-border shadow-2xl shadow-accent/10 flex items-center justify-center">
              <p className="text-text-muted text-lg">
                [App Preview Coming Soon]
              </p>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 sm:py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text mb-6">
              Tired of Refreshing Feeds?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-text-secondary">
              Critical updates are often buried by unrelated content. We fix
              that.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/20 text-accent rounded-2xl mb-6">
                <Newspaper className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                Scattered Information
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Stop hunting through multiple Facebook pages and websites.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/20 text-accent rounded-2xl mb-6">
                <CalendarX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                Missed Opportunities
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Never miss scholarship deadlines or community programs again.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/20 text-accent rounded-2xl mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                Delayed Awareness
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Get instant alerts, not secondhand word-of-mouth updates.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text mb-6">
              Your Centralized Hub for Local Alerts
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-text-secondary">
              PulsePH is designed to be simple, fast, and reliable.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={MapPin}
              title="Location-Based"
              description="Subscribe to your municipality and get only the alerts that matter to you."
            />
            <FeatureCard
              icon={Bell}
              title="Instant Notifications"
              description="Receive alerts via Push Notification the moment they're posted."
            />
            <FeatureCard
              icon={LayoutGrid}
              title="All-in-One Feed"
              description="Class suspensions, disaster warnings, community events, and more, all in one place."
            />
            <FeatureCard
              icon={Zap}
              title="Quick & Easy Setup"
              description="Onboard in under a minute. No complicated forms, no fuss."
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 sm:py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text mb-6">
              Get Started in 3 Simple Steps
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-border hidden md:block"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-surface-raised border-2 border-border-light text-accent rounded-full mb-8 z-10 shadow-lg">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">Sign Up</h3>
              <p className="text-text-secondary leading-relaxed">
                Enter your phone number to create a secure account.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-surface-raised border-2 border-border-light text-accent rounded-full mb-8 z-10 shadow-lg">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                Set Your Location
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Choose up to 3 municipalities to monitor.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-surface-raised border-2 border-border-light text-accent rounded-full mb-8 z-10 shadow-lg">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text">
                Stay Informed
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Receive real-time alerts directly on your device.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32">
          <div className="bg-gradient-to-br from-accent to-accent-light rounded-3xl p-12 md:p-16 text-center shadow-2xl shadow-accent/20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Get Real-Time Local Updates Today
            </h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-12">
              Stop waiting for updates. Let the updates find you.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-accent hover:bg-slate-100 rounded-full px-8 py-4 text-lg shadow-lg"
            >
              <Link href="/auth">
                Sign Up Now <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background-secondary">
        <div className="container mx-auto px-6 lg:px-8 py-12 text-center">
          <p className="text-text-subtle mb-4">
            &copy; {new Date().getFullYear()} PulsePH by Team Untitled Document.
            All rights reserved.
          </p>
          <div className="space-x-6">
            <Link
              href="#"
              className="text-text-subtle hover:text-text-muted transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-text-subtle hover:text-text-muted transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
