import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Bell, Loader2, ArrowLeft } from "lucide-react";
import { cleanMobileNumber } from "@/lib/utils/phone";

interface LocationConfirmationProps {
  locations: string[];
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
      phone: cleanMobileNumber(phone),
      locations: locations, // locations are already strings now
    };
    console.log("Confirmation Data:", confirmationData);
    onConfirm();
  };

  return (
    <div className="space-y-4">
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-accent" />
        </div>

        <h3 className="text-lg font-semibold text-text mb-2">
          {isReturningUser
            ? "Locations confirmed! You'll continue receiving updates for:"
            : "Perfect! You're all set for"}
        </h3>

        <div className="bg-accent/10 rounded-lg p-4 mb-4 space-y-2">
          {locations.map((locationName, index) => (
            <div key={`${locationName}-${index}`}>
              <p className="font-medium text-accent text-lg">{locationName}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
            <Bell className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-success text-sm">
                Class Suspensions
              </p>
              <p className="text-success text-xs">
                Get notified about school closures due to weather or emergencies
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
            <Bell className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-accent text-sm">
                Local Announcements
              </p>
              <p className="text-accent text-xs">
                Stay updated on community programs, services, and important
                notices
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
            <Bell className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-warning text-sm">
                Emergency Alerts
              </p>
              <p className="text-warning text-xs">
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
          className="w-full bg-accent hover:bg-accent-light text-white"
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
          className="w-full text-text-muted hover:text-text hover:bg-surface-raised"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Choose Different Locations
        </Button>
      </div>

      <div className="text-center text-xs text-text-subtle">
        You can change your locations anytime in settings
      </div>
    </div>
  );
}
