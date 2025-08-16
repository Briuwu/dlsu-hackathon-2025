import { useState, useEffect } from "react";
import { fetchLocationNames } from "@/lib/api/locations";

interface UseLocationNamesReturn {
  locationNames: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLocationNames(): UseLocationNamesReturn {
  const [locationNames, setLocationNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const names = await fetchLocationNames();
      setLocationNames(names);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch location names";
      setError(errorMessage);
      console.error("Error fetching location names:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    await fetchData();
  };

  return {
    locationNames,
    loading,
    error,
    refetch,
  };
}
