import FetchTextarea from "@/components/FetchTextarea";
import { isValidZipCode } from "@/libs";
import { ChangeEvent, useState } from "react";

interface Props {
  selectedZipCodes: string[];
  onChange: (zipCodes: string[]) => void;
}

export default function TabManual({ selectedZipCodes, onChange }: Props) {
  const [value, setValue] = useState(selectedZipCodes.join("\n"));

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    const lines = newValue.split("\n");
    const zipCodes: string[] = [];
    lines.forEach((line) => {
      const zipCode = line.trim();
      if (!isValidZipCode(zipCode)) {
        return;
      }
      zipCodes.push(zipCode);
    });

    onChange(zipCodes);
  };

  return (
    <FetchTextarea
      rows={5}
      placeholder="Enter one zip code per line"
      value={value}
      onChange={handleChange}
    />
  );
}
