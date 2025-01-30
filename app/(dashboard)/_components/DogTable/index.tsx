"use client";

import { useDogDetails, useDogs, useLocation } from "@/api";
import Header from "./Header";
import { Dog, SortBy, SortOrder } from "@/types";
import Loader from "@/components/Loader";
import Row from "./Row";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import PageSizer from "@/components/PageSizer";
import LocationInfoDialog from "./LocationInfoDialog";

interface Props {
  breeds: string[];
  ageFilter: {
    min: number;
    max: number;
  } | null;
  zipCodes: string[];
  selectedDogIds: string[];
  onSelect: (dogIds: string[]) => void;
  onUpdateTotal: (total: number) => void;
}

export default function DogTable({
  breeds,
  zipCodes,
  ageFilter,
  selectedDogIds,
  onSelect,
  onUpdateTotal,
}: Props) {
  const [sortBy, setSortBy] = useState<SortBy>("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [size, setSize] = useState(25);
  const [page, setPage] = useState(1);
  const [showLocationDetails, setShowLocationDetails] = useState(false);

  const { data: pageData, isFetching: pageFetching } = useDogs({
    breeds,
    zipCodes,
    ageMin: ageFilter ? ageFilter.min : undefined,
    ageMax: ageFilter ? ageFilter.max : undefined,
    size,
    from: (page - 1) * size,
    sortBy,
    sortOrder,
  });
  const { data: dogsData, isFetching: dogsFetching } = useDogDetails(
    pageData?.resultIds || [],
  );
  const {
    mutate,
    data: locationData,
    isPending: locationPending,
  } = useLocation();

  useEffect(() => {
    // Whenever a new bread filter is selected,
    // go to the first page and reset selection.
    setPage(1);
    onSelect([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breeds, ageFilter, zipCodes]);

  useEffect(() => {
    onUpdateTotal(pageData?.total || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData?.total]);

  const isAllSelected = useMemo(() => {
    if (!pageData || !pageData.resultIds.length) {
      return false;
    }

    const selectedCount = pageData.resultIds.filter((id) =>
      selectedDogIds.includes(id),
    ).length;
    return selectedCount === pageData.resultIds.length;
  }, [selectedDogIds, pageData]);

  const handleSort = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Check all.
      onSelect([
        ...new Set([...selectedDogIds, ...(pageData?.resultIds || [])]),
      ]);
    } else {
      // Uncheck all.
      onSelect(
        selectedDogIds.filter(
          (id) => !(pageData?.resultIds || []).includes(id),
        ),
      );
    }
  };

  const handleSelectRow = (dog: Dog, checked: boolean) => {
    if (checked) {
      onSelect([...new Set([...selectedDogIds, dog.id])]);
    } else {
      onSelect(selectedDogIds.filter((id) => dog.id !== id));
    }
  };

  const handleGetLocation = async (zipCode: string) => {
    try {
      await mutate(zipCode);

      setShowLocationDetails(true);
    } catch {
      // Show failure message.
      setShowLocationDetails(true);
    }
  };

  return (
    <div className="relative flex flex-col gap-y-4 overflow-x-auto">
      {(pageFetching || dogsFetching) && <Loader />}
      <table className="min-w-full border border-fetch-text/10 bg-white">
        <Header
          sortBy={sortBy}
          sortOrder={sortOrder}
          isAllSelected={isAllSelected}
          onSort={handleSort}
          onSelectAll={handleSelectAll}
        />
        <tbody>
          {(dogsData || []).length === 0 ? (
            <tr className="hover:bg-fetch-bg">
              <td className="border px-4 py-2" colSpan={4}>
                No dogs found
              </td>
            </tr>
          ) : (
            dogsData?.map((dog) => (
              <Row
                key={dog.id}
                dog={dog}
                isSelected={selectedDogIds.includes(dog.id)}
                onSelect={handleSelectRow}
                onGetLocation={handleGetLocation}
              />
            ))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-x-6">
        <Pagination
          currentPage={page}
          total={Math.ceil((pageData?.total || 0) / size)}
          onChange={setPage}
        />
        <PageSizer size={size} label="dogs" onChange={setSize} />
      </div>
      <LocationInfoDialog
        open={!locationPending && showLocationDetails}
        location={locationData}
        onClose={() => {
          setShowLocationDetails(false);
        }}
      />
    </div>
  );
}
