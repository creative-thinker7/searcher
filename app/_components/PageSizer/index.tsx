import { Select } from "@headlessui/react";
import clsx from "clsx";

const sizes = [5, 10, 25, 50, 100];

interface Props {
  size: number;
  label: string;
  onChange: (size: number) => void;
}

export default function PageSizer({ size, label, onChange }: Props) {
  return (
    <div className="flex items-center gap-x-1">
      <Select
        className={clsx(
          "block w-full min-w-12 appearance-none rounded-lg border border-fetch-text/10 bg-white px-3 py-1.5 text-sm/6",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-fetch-text/25",
          "*:text-black",
        )}
        aria-label="Page size"
        value={size}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
      >
        {sizes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <span className="whitespace-nowrap">{label} per page</span>
    </div>
  );
}
