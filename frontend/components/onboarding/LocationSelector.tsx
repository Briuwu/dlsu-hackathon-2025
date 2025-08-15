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
import { Badge } from "@/components/ui/badge";
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
import {
  Municipality,
  philippineMunicipalities,
  getAllProvinces,
} from "@/lib/philippines-data";
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
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const provinces = useMemo(() => getAllProvinces(), []);

  const filteredMunicipalities = useMemo(() => {
    let filtered = philippineMunicipalities;

    // Filter by province if selected
    if (selectedProvince && selectedProvince !== "All Provinces") {
      filtered = filtered.filter((m) => m.province === selectedProvince);
    }

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
  }, [searchQuery, selectedProvince]);

  const handleLocationToggle = (municipality: Municipality) => {
    const isSelected = selectedLocations.some((l) => l.id === municipality.id);
    let newLocations;
    if (isSelected) {
      newLocations = selectedLocations.filter((l) => l.id !== municipality.id);
    } else {
      if (selectedLocations.length < 3) {
        newLocations = [...selectedLocations, municipality];
      } else {
        // You might want to show a toast or alert here in a real app
        return; // Do nothing if limit is reached
      }
    }
    onSelectedLocationsChange(newLocations);
  };

  const handleAutoDetectSelect = (municipality: Municipality) => {
    const isSelected = selectedLocations.some((l) => l.id === municipality.id);
    if (!isSelected && selectedLocations.length < 3) {
      onSelectedLocationsChange([...selectedLocations, municipality]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Auto-detected location section */}
      {isLoadingGeo && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-700">
              📍 Detecting your location...
            </p>
            <p className="text-xs text-blue-600">
              This will help us suggest your municipality
            </p>
          </div>
        </div>
      )}

      {autoDetectedLocation && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm font-medium text-green-700 mb-2">
            📍 We detected you might be in:
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAutoDetectSelect(autoDetectedLocation)}
            className="text-green-700 border-green-300 hover:bg-green-100"
          >
            <Navigation className="w-3 h-3 mr-1" />
            {formatLocationDisplay(autoDetectedLocation)}
          </Button>
        </div>
      )}

      {/* Manual location selector */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Select up to 3 locations</p>
        {/* Combobox */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedLocations.length > 0 ? (
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">
                    {selectedLocations.length} location(s) selected
                  </span>
                </span>
              ) : (
                <span className="text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Select municipalities...
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-white" align="start">
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
        <div className="bg-gray-50 rounded-md p-3 space-y-2">
          <p className="text-sm text-gray-600">
            Selected locations ({selectedLocations.length}/3):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedLocations.map((location) => (
              <Badge
                key={location.id}
                variant="secondary"
                className="flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3" />
                {formatLocationDisplay(location)}
                <button
                  onClick={() => handleLocationToggle(location)}
                  className="ml-1 rounded-full hover:bg-gray-300 p-0.5"
                  aria-label={`Remove ${formatLocationDisplay(location)}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            You&apos;ll receive notifications for announcements in these areas.
          </p>
        </div>
      )}
    </div>
  );
}
