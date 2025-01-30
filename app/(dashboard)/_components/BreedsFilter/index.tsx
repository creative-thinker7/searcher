"use client";

import { useBreeds } from "@/api";
import { Listbox, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import FetchInput from "@/components/FetchInput";
import clsx from "clsx";
import BreedsFilterOptions from "./Options";
import BreedsFilterSelection from "./Selection";

interface Props {
  selectedBreeds: string[];
  onSelect: (breeds: string[]) => void;
}

export default function BreedsFilter({ selectedBreeds, onSelect }: Props) {
  const { data, isLoading } = useBreeds();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBreeds = (data || []).filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-w-[280px]">
      <Listbox as="div" value={selectedBreeds} onChange={onSelect} multiple>
        {({ open }) => (
          <>
            <div className="relative">
              <BreedsFilterSelection
                breeds={selectedBreeds}
                onClear={() => {
                  onSelect([]);
                }}
              />
              <ListboxOptions
                className={clsx(
                  "absolute z-10 mt-1 max-h-[240px] w-full overflow-y-auto rounded border border-fetch-text/10 bg-white",
                  {
                    block: open,
                    hidden: !open,
                  },
                )}
              >
                <div className="sticky top-0 z-10 bg-white p-1">
                  <FetchInput
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                </div>
                <BreedsFilterOptions
                  isLoading={isLoading}
                  breeds={filteredBreeds}
                />
              </ListboxOptions>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
