import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Bell, Loader2, ArrowLeft } from "lucide-react";
import { Municipality } from "@/lib/philippines-data";
import { formatLocationDisplay } from "@/lib/location-utils";

interface LocationConfirmationProps {
  locations: Municipality[];
  phone: string;
  onConfirm: () => void;
  onGoBack: () => void;
  loading: boolean;
  isReturningUser?: boolean;
}

export function LocationConfirmation({
  locations,
  phone,
  onConfirm,
  onGoBack,
  loading,
  isReturningUser = false,
}: LocationConfirmationProps) {

  const handleConfirm = () => {
    const confirmationData = {
      phone: phone,
      locations: locations.map(location => formatLocationDisplay(location)),
    };
    console.log("Confirmation Data:", confirmationData);
    onConfirm();
  };

  return (
    <div className="space-y-4">
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isReturningUser
            ? "Locations confirmed! You'll continue receiving updates for:"
            : "Perfect! You're all set for"}
        </h3>

        <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-2">
          {locations.map(location => (
            <div key={location.id}>
              <p className="font-medium text-blue-900 text-lg">{location.name}</p>
              <p className="text-blue-700 text-sm">
                {location.province} • {location.region}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <Bell className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800 text-sm">
                Class Suspensions
              </p>
              <p className="text-green-700 text-xs">
                Get notified about school closures due to weather or emergencies
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-800 text-sm">
                Local Announcements
              </p>
              <p className="text-blue-700 text-xs">
                Stay updated on community programs, services, and important
                notices
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
            <Bell className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800 text-sm">
                Emergency Alerts
              </p>
              <p className="text-amber-700 text-xs">
                Receive critical safety information and disaster warnings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          onClick={handleConfirm}
          disabled={loading || locations.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isReturningUser
                ? "Updating settings..."
                : "Setting up notifications..."}
            </>
          ) : isReturningUser ? (
            "Continue with selected locations"
          ) : (
            "Start Receiving Notifications"
          )}
        </Button>

        <Button
          onClick={onGoBack}
          variant="ghost"
          disabled={loading}
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Choose Different Locations
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500">
        You can change your locations anytime in settings
      </div>
    </div>
  );
}
