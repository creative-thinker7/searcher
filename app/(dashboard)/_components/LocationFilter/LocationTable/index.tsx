import { useLocations } from "@/api";
import Loader from "@/components/Loader";
import { Location } from "@/types";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";
import PageSizer from "@/components/PageSizer";
import Header from "./Header";
import Row from "./Row";

interface Props {
  city: string;
  selectedZipCodes: string[];
  onSelect: (zipCodes: string[]) => void;
}

export default function LocationTable({
  city,
  selectedZipCodes,
  onSelect,
}: Props) {
  const [size, setSize] = useState(25);
  const [page, setPage] = useState(1);

  const { data, isFetching } = useLocations({
    city,
    size,
    from: (page - 1) * size,
  });

  useEffect(() => {
    // Whenever a new city is entered,
    // go to the first page and reset selection.
    setPage(1);
    onSelect([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const isAllSelected = useMemo(() => {
    if (!data || !data.results.length) {
      return false;
    }

    const selectedCount = data.results.filter((location) =>
      selectedZipCodes.includes(location.zip_code),
    ).length;
    return selectedCount === data.results.length;
  }, [selectedZipCodes, data]);

  const handleSelectAll = (checked: boolean) => {
    const currentPageZipCodes = (data?.results || []).map(
      (location) => location.zip_code,
    );

    if (checked) {
      // Check all.
      onSelect([...new Set([...selectedZipCodes, ...currentPageZipCodes])]);
    } else {
      // Uncheck all.
      onSelect(
        selectedZipCodes.filter(
          (zipCode) => !currentPageZipCodes.includes(zipCode),
        ),
      );
    }
  };

  const handleSelectRow = (location: Location, checked: boolean) => {
    if (checked) {
      onSelect([...new Set([...selectedZipCodes, location.zip_code])]);
    } else {
      onSelect(
        selectedZipCodes.filter((zipCode) => location.zip_code !== zipCode),
      );
    }
  };

  const renderCount = () => {
    if (selectedZipCodes.length === 0) {
      return "No zip codes selected";
    }

    if (selectedZipCodes.length === 1) {
      return "1 zip code selected";
    }

    return `${selectedZipCodes.length.toLocaleString()} zip codes selected`;
  };

  return (
    <div className="relative flex flex-col gap-y-4 overflow-x-auto">
      {isFetching && <Loader />}
      <div>{renderCount()}</div>
      <table className="min-w-full border border-fetch-text/10 bg-white">
        <Header isAllSelected={isAllSelected} onSelectAll={handleSelectAll} />
        <tbody>
          {(data?.results || []).length === 0 ? (
            <tr className="hover:bg-fetch-bg">
              <td className="border px-4 py-2" colSpan={4}>
                No zip codes found
              </td>
            </tr>
          ) : (
            (data?.results || [])?.map((location) => (
              <Row
                key={location.zip_code}
                location={location}
                isSelected={selectedZipCodes.includes(location.zip_code)}
                onSelect={handleSelectRow}
              />
            ))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-x-6">
        <Pagination
          currentPage={page}
          total={Math.ceil((data?.total || 0) / size)}
          maxButtons={3}
          onChange={setPage}
        />
        <PageSizer size={size} label="locations" onChange={setSize} />
      </div>
    </div>
  );
}
