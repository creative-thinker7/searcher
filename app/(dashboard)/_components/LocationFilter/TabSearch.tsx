import FetchInput from "@/components/FetchInput";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import LocationTable from "./LocationTable";

interface Props {
  selectedZipCodes: string[];
  onChange: (zipCodes: string[]) => void;
}

export default function TabSearch({ selectedZipCodes, onChange }: Props) {
  const [city, setCity] = useState("");
  const [keyword] = useDebounce(city, 1000);

  return (
    <div className="flex flex-col gap-y-4">
      <FetchInput
        placeholder="Enter a city name..."
        value={city}
        onChange={(event) => {
          setCity(event.target.value);
        }}
      />
      <LocationTable
        city={keyword}
        selectedZipCodes={selectedZipCodes}
        onSelect={onChange}
      />
    </div>
  );
}
