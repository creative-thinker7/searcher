import FetchCheckbox from "@/components/FetchCheckbox";

interface Heading {
  value: string;
  label: string;
}

const headings: Heading[] = [
  { value: "zipCode", label: "Zip Code" },
  { value: "county", label: "County" },
  { value: "city", label: "City" },
  { value: "state", label: "State" },
];

interface Props {
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

export default function Header({ isAllSelected, onSelectAll }: Props) {
  return (
    <thead className="bg-fetch-purple text-white">
      <tr>
        <th className="w-[64px] border px-4 py-2 text-center">
          <FetchCheckbox checked={isAllSelected} onChange={onSelectAll} />
        </th>
        {headings.map((heading) => (
          <th key={heading.value} className="border px-4 py-2">
            <span className="flex items-center gap-x-1">{heading.label}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
