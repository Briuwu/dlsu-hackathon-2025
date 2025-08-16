import React, { useState, useMemo } from "react";
import {
  Check,
  ChevronsUpDown,
  MapPin,
  Loader2,
  Navigation,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLocationNames } from "@/hooks/useLocationNames";

interface LocationSelectorProps {
  selectedLocations: string[];
  onSelectedLocationsChange: (locations: string[]) => void;
  autoDetectedLocation: string | null;
  isLoadingGeo: boolean;
}

export function LocationSelector({
  selectedLocations,
  onSelectedLocationsChange,
  autoDetectedLocation,
  isLoadingGeo,
}: LocationSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch location names from API
  const {
    locationNames,
    loading: apiLoading,
    error: apiError,
  } = useLocationNames();

  // Filter location names by search query
  const filteredLocationNames = useMemo(() => {
    let filtered = locationNames;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((name) => name.toLowerCase().includes(query));
    }

    return filtered.slice(0, 50); // Limit results for performance
  }, [locationNames, searchQuery]);

  const handleLocationToggle = (locationName: string) => {
    const isSelected = selectedLocations.includes(locationName);
    let newLocations;
    if (isSelected) {
      newLocations = selectedLocations.filter((l) => l !== locationName);
    } else {
      // For single location, replace existing selection
      newLocations = [locationName];
    }
    onSelectedLocationsChange(newLocations);
  };

  const handleAutoDetectSelect = (locationName: string) => {
    const isSelected = selectedLocations.includes(locationName);
    if (!isSelected) {
      onSelectedLocationsChange([locationName]);
    }
  };

  // Combine loading states for better UX
  const isAnyLoading = apiLoading || isLoadingGeo;
  const loadingMessage = apiLoading
    ? "Loading available locations..."
    : "Detecting your location...";
  const loadingDescription = apiLoading
    ? "Please wait while we fetch location data"
    : "This will help us suggest your municipality";

  return (
    <div className="space-y-4">
      {/* Combined Loading State */}
      {isAnyLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-700">
              📍 {loadingMessage}
            </p>
            <p className="text-xs text-blue-600">{loadingDescription}</p>
          </div>
        </div>
      )}

      {/* API Error State */}
      {apiError && !apiLoading && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm font-medium text-red-700 mb-1">
            ⚠️ Error loading locations
          </p>
          <p className="text-xs text-red-600">
            {apiError}. Using fallback locations.
          </p>
        </div>
      )}

      {autoDetectedLocation && (
        <div className="bg-success/10 border border-success/20 rounded-md p-3">
          <p className="text-sm font-medium text-success mb-2">
            📍 We detected you might be in:
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAutoDetectSelect(autoDetectedLocation)}
            className="text-success border-success hover:bg-success/10"
          >
            <Navigation className="w-3 h-3 mr-1" />
            {autoDetectedLocation}
          </Button>
        </div>
      )}

      {/* Manual location selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text">Select your location</p>
        </div>

        {/* Combobox */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border-border bg-surface text-text hover:bg-surface-raised"
            >
              {selectedLocations.length > 0 ? (
                <span className="flex items-center gap-2 truncate text-text">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">
                    {selectedLocations.length} location(s) selected
                  </span>
                </span>
              ) : (
                <span className="text-text-muted flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Select municipalities...
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-text-muted" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search municipalities..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {filteredLocationNames.map((locationName, index) => (
                    <CommandItem
                      key={`${locationName}-${index}`}
                      value={locationName}
                      onSelect={() => handleLocationToggle(locationName)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedLocations.includes(locationName)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {locationName}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Selected locations preview */}
      {selectedLocations.length > 0 && (
        <div className="bg-surface-raised rounded-md p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text">Selected location:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedLocations.map((locationName, index) => (
              <div
                key={`${locationName}-${index}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-accent text-white border border-accent"
              >
                <MapPin className="w-4 h-4" />
                {locationName}
                <button
                  onClick={() => handleLocationToggle(locationName)}
                  className="ml-1 rounded-full hover:bg-white/20 p-1 transition-colors"
                  aria-label={`Remove ${locationName}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-xs text-text mt-1">
            <p>
              You&apos;ll receive notifications for announcements in this area.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
