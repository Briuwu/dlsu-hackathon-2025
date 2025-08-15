"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Loader2, CheckCircle } from "lucide-react";
import { LocationSelector } from "@/components/onboarding/LocationSelector";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { LocationConfirmation } from "@/components/onboarding/LocationConfirmation";
import { useGeolocation } from "@/hooks/useGeolocation";
import { type Municipality } from "@/lib/philippines-data";
import { findNearestMunicipality } from "@/lib/location-utils";
import {
  getAuthData,
  saveUserProfile,
  getUserProfile,
  hasCompletedOnboarding,
  type UserAuth,
  type UserProfile,
} from "@/lib/auth-utils";

type OnboardingStep = "location" | "confirmation" | "complete";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("location");
  const [selectedLocations, setSelectedLocations] = useState<Municipality[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [autoDetectedLocation, setAutoDetectedLocation] =
    useState<Municipality | null>(null);

  const {
    coordinates,
    error: geoError,
    loading: geoLoading,
    getCurrentLocation,
  } = useGeolocation();

  // Check authentication state on mount
  useEffect(() => {
    const authData = getAuthData();
    if (!authData) {
      window.location.href = "/auth";
      return;
    }

    setUserAuth(authData);

    if (hasCompletedOnboarding()) {
      setIsReturningUser(true);
      const existingProfile = getUserProfile();
      if (existingProfile?.locations && existingProfile.locations.length > 0) {
        setSelectedLocations(existingProfile.locations);
        setCurrentStep("confirmation");
      }
    }
  }, []);

  // Auto-detect location when coordinates are available
  useEffect(() => {
    if (coordinates) {
      const nearest = findNearestMunicipality(
        coordinates.latitude,
        coordinates.longitude
      );
      setAutoDetectedLocation(nearest);
    }
  }, [coordinates]);

  // Redirect to messages page after 2 seconds when onboarding is complete
  useEffect(() => {
    if (currentStep === "complete") {
      const timer = setTimeout(() => {
        router.push("/messages");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, router]);

  const handleGoToConfirmation = () => {
    if (selectedLocations.length === 0) {
      setError("Please select at least one location.");
      return;
    }
    setError("");
    setCurrentStep("confirmation");
  };

  const handleComplete = async () => {
    if (selectedLocations.length === 0 || !userAuth) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userProfile: UserProfile = {
        ...userAuth,
        locations: selectedLocations,
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString(),
      };

      saveUserProfile(userProfile);

      setCurrentStep("complete");
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetryLocation = () => {
    setError("");
    getCurrentLocation();
  };

  if (!userAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white">
          <CardContent className="text-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white">
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Set!</h2>
            <p className="text-gray-600 mb-4">
              You&apos;ll now receive notifications for your selected locations.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <OnboardingHeader />

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <MapPin className="w-5 h-5" />
              {currentStep === "location"
                ? isReturningUser
                  ? "Update Your Locations"
                  : "Choose Your Locations"
                : "Confirm Locations"}
            </CardTitle>
            <CardDescription>
              {currentStep === "location"
                ? "Select up to 3 municipalities to receive relevant local announcements."
                : "We'll send you notifications for these locations."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {geoError && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-sm text-amber-700 mb-2">
                  📍 Location access denied or unavailable
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRetryLocation}
                  className="text-xs"
                >
                  Try Again
                </Button>
              </div>
            )}

            {currentStep === "location" ? (
              <>
                <LocationSelector
                  selectedLocations={selectedLocations}
                  onSelectedLocationsChange={setSelectedLocations}
                  autoDetectedLocation={autoDetectedLocation}
                  isLoadingGeo={geoLoading}
                />

                <Button
                  onClick={handleGoToConfirmation}
                  disabled={selectedLocations.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue
                </Button>
              </>
            ) : (
              <LocationConfirmation
                locations={selectedLocations}
                phone={userAuth.phoneNumber}
                onConfirm={handleComplete}
                onGoBack={() => setCurrentStep("location")}
                loading={loading}
                isReturningUser={isReturningUser}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
