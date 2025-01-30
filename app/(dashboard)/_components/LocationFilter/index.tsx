import FetchButton from "@/components/FetchButton";
import { useState } from "react";
import LocationFilterDialog from "./LocationFilterDialog";

interface Props {
  selectedZipCodes: string[];
  onFilter: (zipCodes: string[]) => void;
}

export default function LocationFilter({ selectedZipCodes, onFilter }: Props) {
  const [open, setOpen] = useState(false);

  const handleFilter = (zipCodes: string[]) => {
    onFilter(zipCodes);
    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <FetchButton
          aria-label="filter by location"
          onClick={() => {
            setOpen(true);
          }}
        >
          Filter by Location
        </FetchButton>
        {selectedZipCodes.length > 0 && (
          <FetchButton
            aria-label="reset"
            onClick={() => {
              onFilter([]);
            }}
          >
            Reset
          </FetchButton>
        )}
      </div>
      <LocationFilterDialog
        open={open}
        selectedZipCodes={selectedZipCodes}
        onFilter={handleFilter}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
