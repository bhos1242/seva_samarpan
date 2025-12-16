import { FormField } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "../../InputField";
import AddressInput from "./components/mini_form";

interface PlaceOption {
  description: string;
  placeId: string;
}

const InputAddress: React.FC<Omit<InputFieldProps, "form">> = (props) => {
  const { name, description } = props;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const form = useFormContext();

  if (!form) {
    throw new Error("InputAddress must be used within a FormProvider");
  }

  useEffect(() => {
    const scriptId = "google-maps-script";

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
      document.body.appendChild(script);
    }

    const onScriptLoad = () => setScriptLoaded(true);
    script.addEventListener("load", onScriptLoad);

    return () => {
      script.removeEventListener("load", onScriptLoad);
    };
  }, [apiKey]);

  if (!scriptLoaded) {
    return <p>Loading Script...</p>; // or return a loading spinner
  }

  return (
    <FormField
      disabled={props.disabled}
      control={form.control}
      name={name}
      render={({ field }) => {
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
