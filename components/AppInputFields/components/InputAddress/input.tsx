import { FormField } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "../../InputField";
import AddressInput from "./components/mini_form";

const InputAddress: React.FC<Omit<InputFieldProps, "form">> = (props) => {
  const { name } = props;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const form = useFormContext();

  if (!form) {
    throw new Error("InputAddress must be used within a FormProvider");
  }

  // 1. Check if API Key is missing and return early
  if (!apiKey) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-md text-sm text-red-600">
        <p className="font-semibold">Configuration Error</p>
        <p>Google Maps API Key is missing. Please add it to your environment variables.</p>
      </div>
    );
  }

  useEffect(() => {
    const scriptId = "google-maps-script";

    // 2. Handle Google Maps Authentication Failure
    // @ts-ignore
    window.gm_authFailure = () => {
      setLoadError("Google Maps API Key is invalid. Please check your console for more details.");
    };

    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setLoadError("Failed to load Google Maps script. Please check your connection.");
      };
      document.body.appendChild(script);
    }

    const onScriptLoad = () => setScriptLoaded(true);
    script.addEventListener("load", onScriptLoad);

    return () => {
      script.removeEventListener("load", onScriptLoad);
    };
  }, [apiKey]);

  if (loadError) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-md text-sm text-red-600">
        <p className="font-semibold">Map Error</p>
        <p>{loadError}</p>
      </div>
    );
  }

  if (!scriptLoaded) {
    return <p className="text-sm text-muted-foreground animate-pulse">Loading Map...</p>;
  }

  return (
    <FormField
      disabled={props.disabled}
      control={form.control}
      name={name}
      render={({ field }) => {
        // Assuming userCountry and isLoaded are defined elsewhere or passed as props
        // For demonstration, let's define them as placeholders
        const userCountry = "US"; // Placeholder for user's country
        const isLoaded = scriptLoaded; // Using scriptLoaded as a proxy for isLoaded

        /* Effect to default to user country if not set */
        useEffect(() => {
          if (!field.value?.country && userCountry) {
            if (userCountry.toUpperCase() === "IN") {
              field.onChange({
                ...field.value,
                country: "India",
              });
            }
          }
        }, [userCountry, field.value?.country]); // eslint-disable-line react-hooks/exhaustive-deps

        if (!isLoaded) return <div>Loading...</div>;

        return (
          <AddressInput
            field={field}
            inputProps={{
              ...props,
              Icon: props.Icon,
            }}
          />
        );
      }}
    />
  );
};

export default React.memo(InputAddress);
