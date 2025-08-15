import { useState, useEffect } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  coordinates: Coordinates | null;
  error: string | null;
  loading: boolean;
  getCurrentLocation: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setError(null);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 300000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        setLoading(false);
        setError(null);
      },
      (err) => {
        let errorMessage = "Unable to retrieve your location.";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage =
              "An unknown error occurred while retrieving location.";
            break;
        }

        setError(errorMessage);
        setLoading(false);
      },
      options
    );
  };

  // Auto-request location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    coordinates,
    error,
    loading,
    getCurrentLocation,
  };
}
