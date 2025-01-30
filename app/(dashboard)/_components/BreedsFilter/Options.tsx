import { ListboxOption } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  isLoading: boolean;
  breeds: string[];
}

export default function BreedsFilterOptions({ isLoading, breeds }: Props) {
  if (isLoading) {
    return (
      <ListboxOption value="" disabled>
        <span className="block p-2 text-fetch-text">Loading breeds...</span>
      </ListboxOption>
    );
  }

  if (!breeds.length) {
    return (
      <ListboxOption value="" disabled>
        <span className="block p-2 text-fetch-text">No breeds found</span>
      </ListboxOption>
    );
  }

  return breeds.map((breed) => (
    <ListboxOption
      key={breed}
      value={breed}
      className={(breed) =>
        clsx("relative cursor-default select-none p-2", {
          "bg-fetch-purple text-white": breed.selected,
          "text-fetch-text hover:bg-fetch-purple/50": !breed.selected,
        })
      }
    >
      {breed}
    </ListboxOption>
  ));
}
