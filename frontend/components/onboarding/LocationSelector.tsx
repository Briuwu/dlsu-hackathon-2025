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
import { Municipality, philippineMunicipalities } from "@/lib/philippines-data";
import { formatLocationDisplay } from "@/lib/location-utils";

interface LocationSelectorProps {
  selectedLocations: Municipality[];
  onSelectedLocationsChange: (locations: Municipality[]) => void;
  autoDetectedLocation: Municipality | null;
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
  const filteredMunicipalities = useMemo(() => {
    let filtered = philippineMunicipalities;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.province.toLowerCase().includes(query) ||
          m.region.toLowerCase().includes(query)
      );
    }

    return filtered.slice(0, 50); // Limit results for performance
  }, [searchQuery]);

  const handleLocationToggle = (municipality: Municipality) => {
    const isSelected = selectedLocations.some((l) => l.id === municipality.id);
    let newLocations;
    if (isSelected) {
      newLocations = selectedLocations.filter((l) => l.id !== municipality.id);
    } else {
      // For single location, replace existing selection
      newLocations = [municipality];
    }
    onSelectedLocationsChange(newLocations);
  };

  const handleAutoDetectSelect = (municipality: Municipality) => {
    const isSelected = selectedLocations.some((l) => l.id === municipality.id);
    if (!isSelected) {
      onSelectedLocationsChange([municipality]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Auto-detected location section */}
      {isLoadingGeo && (
        <div className="bg-accent/10 border border-accent/20 rounded-md p-3 flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-accent" />
          <div>
            <p className="text-sm font-medium text-accent">
              📍 Detecting your location...
            </p>
            <p className="text-xs text-accent">
              This will help us suggest your municipality
            </p>
          </div>
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
            {formatLocationDisplay(autoDetectedLocation)}
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
                <CommandEmpty>No municipality found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {filteredMunicipalities.map((municipality) => (
                    <CommandItem
                      key={municipality.id}
                      value={`${municipality.name} ${municipality.province} ${municipality.region}`}
                      onSelect={() => handleLocationToggle(municipality)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedLocations.some(
                            (l) => l.id === municipality.id
                          )
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {municipality.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {municipality.province} • {municipality.region}
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
            {selectedLocations.map((location) => (
              <div
                key={location.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-accent text-white border border-accent"
              >
                <MapPin className="w-4 h-4" />
                {formatLocationDisplay(location)}
                <button
                  onClick={() => handleLocationToggle(location)}
                  className="ml-1 rounded-full hover:bg-white/20 p-1 transition-colors"
                  aria-label={`Remove ${formatLocationDisplay(location)}`}
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
