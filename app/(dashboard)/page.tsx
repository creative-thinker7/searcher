"use client";

import { useState } from "react";
import BreedsFilter from "./_components/BreedsFilter";
import DogTable from "./_components/DogTable";
import MatchFinder from "./_components/MatchFinder";
import AgeFilter from "./_components/AgeFilter";
import LocationFilter from "./_components/LocationFilter";

export default function Home() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [ageFilter, setAgeFilter] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDogIds, setSelectedDogIds] = useState<string[]>([]);

  const handleFilterAge = (ageMin: number, ageMax: number) => {
    setAgeFilter({
      min: ageMin,
      max: ageMax,
    });
  };

  let countLabel: string;
  if (totalCount === 0) {
    countLabel = "No dog found";
  } else if (totalCount === 1) {
    countLabel = "1 dog found";
  } else {
    countLabel = `${totalCount.toLocaleString()} dogs found`;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-y-4 px-4 pb-4 pt-24">
      <div className="flex flex-col items-center gap-x-4 gap-y-2 xl:flex-row">
        <BreedsFilter selectedBreeds={breeds} onSelect={setBreeds} />
        <AgeFilter
          isFilterApplied={ageFilter !== null}
          onFilter={handleFilterAge}
          onReset={() => {
            setAgeFilter(null);
          }}
        />
        <LocationFilter selectedZipCodes={zipCodes} onFilter={setZipCodes} />
      </div>
      <div className="flex flex-col items-center justify-between gap-y-2 xl:flex-row">
        <span>{countLabel}</span>
        <MatchFinder dogIds={selectedDogIds} />
      </div>
      <DogTable
        breeds={breeds}
        ageFilter={ageFilter}
        zipCodes={zipCodes}
        selectedDogIds={selectedDogIds}
        onSelect={setSelectedDogIds}
        onUpdateTotal={setTotalCount}
      />
    </div>
  );
}
