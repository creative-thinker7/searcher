import FetchCheckbox from "@/components/FetchCheckbox";
import { SortBy, SortOrder } from "@/types";
import clsx from "clsx";

interface Heading {
  value: string;
  label: string;
  sortable: boolean;
}

const headings: Heading[] = [
  { value: "name", label: "Name", sortable: true },
  { value: "breed", label: "Breed", sortable: true },
  { value: "age", label: "Age", sortable: true },
  { value: "zipCode", label: "Zip Code", sortable: false },
];

interface Props {
  sortBy: SortBy;
  sortOrder: SortOrder;
  isAllSelected: boolean;
  onSort: (sortBy: SortBy) => void;
  onSelectAll: (checked: boolean) => void;
}

export default function Header({
  sortBy,
  sortOrder,
  isAllSelected,
  onSort,
  onSelectAll,
}: Props) {
  const handleClick = (heading: Heading) => {
    if (!heading.sortable) {
      return;
    }

    onSort(heading.value as SortBy);
  };

  return (
    <thead className="bg-fetch-purple text-white">
      <tr>
        <th className="w-[64px] border px-4 py-2 text-center">
          <FetchCheckbox checked={isAllSelected} onChange={onSelectAll} />
        </th>
        {headings.map((heading) => (
          <th
            key={heading.value}
            className={clsx("border px-4 py-2", {
              "cursor-pointer": heading.sortable,
            })}
            onClick={() => {
              handleClick(heading);
            }}
          >
            <span className="flex items-center gap-x-1">
              {heading.label}
              {sortBy === heading.value && (
                <span>{sortOrder === "asc" ? <>&#9650;</> : <>&#9660;</>}</span>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
