import { InputFieldProps } from "@/components/AppInputFields/InputField";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MapPin } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import PlacesAutocomplete, {
  geocodeByPlaceId,
  Suggestion,
} from "react-places-autocomplete";
import Select from "react-select";

type Props = {
  field: ControllerRenderProps<FieldValues, string>;
  inputProps: InputFieldProps;
};
interface PlaceOption {
  description: string;
  placeId: string;
}

const AddressInput = ({ field, inputProps }: Props) => {
  const { label, placeholder, className, required = false } = inputProps;
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hasAttemptedAutoDetection, setHasAttemptedAutoDetection] =
    useState(false);
  const [userDisabledAutoDetection, setUserDisabledAutoDetection] =
    useState(false);

  // Auto-location detection functions
  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  };

  const geocodeCoordinates = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      throw new Error("No address found");
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  };

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
      position: "absolute",
      backgroundColor: "var(--background)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
        ? "var(--accent)"
        : "transparent",
      color: state.isSelected
        ? "var(--primary-oreground))"
        : "var(--foreground)",
      cursor: "pointer",
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid var(--input)",
      borderRadius: "var(--radius)",
      minHeight: "44px",
      paddingLeft: "0.5rem",
      display: "flex",
      alignItems: "center",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      paddingLeft: "0",
    }),
  };

  const handleSelect = async (
    option: PlaceOption,
    onChange: (value: any) => void
  ) => {
    console.log(`🚀 ~ address.miniform.tsx:131 ~ option:`, option);

    if (!option?.placeId) {
      if (option?.placeId === "") {
      } else {
        onChange({
          address: "", // Changed from undefined to empty string
          position: {
            lat: 0,
            lng: 0,
          },
        });
      }
    } else {
      const response = await convertPlaceIdToAddress(option.placeId);

      console.log(`🚀 ~ address.miniform.tsx:143 ~ response:`, response);

      onChange({
        address: option.description, // Added fallback to empty string
        position: {
          lat: response?.location?.latitude,
          lng: response?.location?.longitude,
        },
      });
    }
  };

  const [state, setState] = useState<Suggestion[]>([]);
  const [value, setValue] = useState<string>("");

  // Extract field.onChange to avoid dependency issues
  const fieldOnChange = field.onChange;

  // Memoize the field change handler to prevent unnecessary re-renders
  const handleFieldChange1 = useCallback(
    (newValue: any) => {
      fieldOnChange(newValue);
    },
    [fieldOnChange]
  );

  // Extract field value to avoid dependency issues
  const fieldValueAddress = field?.value?.address;

  // Initialize state when field has a value
  useEffect(() => {
    if (fieldValueAddress && state.length === 0) {
      setState([
        {
          id: "initial-id",
          active: false,
          index: 0,
          formattedSuggestion: fieldValueAddress,
          description: fieldValueAddress,
          placeId: "",
          matchedSubstrings: [],
          terms: [],
          types: [],
        },
      ]);
    }
  }, [fieldValueAddress, state.length]);

  // Auto-location detection effect
  useEffect(() => {
    const initializeLocation = async () => {
      // Prevent multiple attempts and infinite loops
      if (
        hasAttemptedAutoDetection ||
        fieldValueAddress ||
        userDisabledAutoDetection
      ) {
        return;
      }

      setHasAttemptedAutoDetection(true);
      setIsLocationLoading(true);
      setLocationError(null);

      try {
        const position = await getCurrentLocation();
        const address = await geocodeCoordinates(position.lat, position.lng);

        // Update the field with the detected location
        handleFieldChange1({
          address: address,
          position: {
            lat: position.lat,
            lng: position.lng,
          },
        });

        // Update the state to show the detected address
        setState([
          {
            id: "auto-detected",
            active: false,
            index: 0,
            formattedSuggestion: {
              mainText: address,
              secondaryText: "",
            },
            description: address,
            placeId: "",
            matchedSubstrings: [],
            terms: [],
            types: [],
          },
        ]);
      } catch (error) {
        // Gracefully handle location detection fallback
        setLocationError("Please enter manually");
      } finally {
        setIsLocationLoading(false);
      }
    };

    initializeLocation();
  }, [
    hasAttemptedAutoDetection,
    fieldValueAddress,
    handleFieldChange1,
    userDisabledAutoDetection,
  ]);

  // Simplified: Only handle initial empty state setup
  useEffect(() => {
    // Only reset to empty if there's no existing field value and no state and not loading
    if (!isLocationLoading && state.length === 0 && !fieldValueAddress) {
      handleFieldChange1({
        address: "",
        position: { lat: 0, lng: 0 },
      });
    }
  }, [isLocationLoading, fieldValueAddress, handleFieldChange1, state.length]);
  // write a function which can convert placeId to address and lat lng
  const convertPlaceIdToAddress = async (placeId: string) => {
    try {
      const response = await axios.get(
        `https://places.googleapis.com/v1/places/${placeId}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&fields=formatted_address,location`
      );

      const data = response.data;
      console.log(`🚀 ~ address.miniform.tsx:291 ~ data:`, data);

      return data;
    } catch (error) {
      console.error("Error fetching address:", error);
    }
    return null;
  };

  return (
    <FormItem
      className={cn(
        "w-full",
        "group transition-all duration-300 ease-in-out",
        className
      )}
    >
      <FormLabel
        className={cn(
          "text-sm font-medium",
          "transition-colors duration-200",
          "group-hover:text-primary",
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        )}
      >
        {label}
      </FormLabel>
      <FormControl>
        <div className="relative w-full">
          {/* Show auto-detected address in a special state */}

          <>
            <div className="absolute top-3 left-3 z-10 search-icon">
              <MapPin
                className={cn(
                  "h-4 w-4 transition-colors duration-200",
                  isLocationLoading
                    ? "text-blue-500 animate-pulse"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              />
            </div>
            <PlacesAutocomplete
              value={value}
              onChange={(value) => {
                setValue(value);
                // Reset auto-detection state when user starts
              }}
            >
              {({ getInputProps, suggestions, loading }) => {
                const inputProps = getInputProps();

                return (
                  <div className="relative flex items-center">
                    <Select
                      menuPlacement="auto"
                      styles={{
                        ...customStyles,
                        control: (base) => ({
                          ...base,
                          backgroundColor: "transparent",
                          border: `1px solid ${
                            isLocationLoading
                              ? "var(--primary)"
                              : "var(--input)"
                          }`,
                          borderRadius: "var(--radius)",
                          minHeight: "44px",
                          paddingLeft: "2.5rem",
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          paddingLeft: "0",
                        }),
                      }}
                      isLoading={loading || isLocationLoading}
                      placeholder={
                        isLocationLoading
                          ? "Detecting your location..."
                          : locationError
                          ? placeholder
                          : placeholder
                      }
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      value={state[0]}
                      escapeClearsValue={false}
                      options={suggestions}
                      getOptionLabel={(option: Suggestion) =>
                        option.description
                      }
                      getOptionValue={(option: Suggestion) => option.placeId}
                      onInputChange={(value: string) => {
                        console.log(
                          `🚀 ~ address.miniform.tsx:396 ~ value:`,
                          value
                        );

                        // Safely call the onChange without causing infinite loops
                        if (inputProps.onChange) {
                          inputProps.onChange({
                            target: { value },
                          } as any);
                        }
                      }}
                      filterOption={() => true}
                      onChange={async (value: any) => {
                        if (value) {
                          setState([value]);
                          // Handle selection immediately instead of waiting for useEffect
                          await handleSelect(value, handleFieldChange1);
                        } else {
                          setState([]);
                          // Handle clearing immediately
                          handleFieldChange1({
                            address: "",
                            position: { lat: 0, lng: 0 },
                          });
                        }
                      }}
                      isClearable={true}
                      isSearchable={true}
                      className="w-full"
                    />
                  </div>
                ) as any;
              }}
            </PlacesAutocomplete>
          </>
        </div>
      </FormControl>
    </FormItem>
  );
};

export default React.memo(AddressInput);
