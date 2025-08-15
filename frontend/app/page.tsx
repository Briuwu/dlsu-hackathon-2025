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
  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm">
    <div className="flex items-center justify-center w-14 h-14 bg-slate-50 text-slate-700 rounded-xl mb-6">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-bold text-slate-900">PulsePH</div>
            <Button
              asChild
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6"
            >
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 lg:px-8">
        <section className="text-center py-24 sm:py-32">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Never Miss a Critical Local Announcement Again
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Feel the heartbeat of your local community. PulsePH aggregates LGU
            announcements and delivers them right to your fingertips, instantly.
          </p>
          <div className="mt-12">
            <Button
              size="lg"
              asChild
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-4 text-lg"
            >
              <Link href="/auth">
                Get Started for Free <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
          </div>
          <div className="mt-20">
            <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 h-96 rounded-3xl border border-gray-200 flex items-center justify-center">
              <p className="text-gray-400 text-lg">[App Preview Coming Soon]</p>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 sm:py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tired of Refreshing Feeds?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Critical updates are often buried by unrelated content. We fix
              that.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-2xl mb-6">
                <Newspaper className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Scattered Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Stop hunting through multiple Facebook pages and websites.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl mb-6">
                <CalendarX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Missed Opportunities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Never miss scholarship deadlines or community programs again.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Delayed Awareness</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant alerts, not secondhand word-of-mouth updates.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Centralized Hub for Local Alerts
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Get Started in 3 Simple Steps
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 hidden md:block"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 text-slate-900 rounded-full mb-8 z-10 shadow-sm">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your phone number to create a secure account.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 text-slate-900 rounded-full mb-8 z-10 shadow-sm">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Your Location</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose up to 3 municipalities to monitor.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-200 text-slate-900 rounded-full mb-8 z-10 shadow-sm">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Stay Informed</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive real-time alerts directly on your device.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32">
          <div className="bg-blue-600 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Get Real-Time Local Updates Today
            </h2>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12">
              Stop waiting for updates. Let the updates find you.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-slate-900 hover:bg-gray-50 rounded-full px-8 py-4 text-lg"
            >
              <Link href="/auth">
                Sign Up Now <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-500 mb-4">
            &copy; {new Date().getFullYear()} PulsePH by Team Untitled Document.
            All rights reserved.
          </p>
          <div className="space-x-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
