import FetchCheckbox from "@/components/FetchCheckbox";
import { Location } from "@/types";

interface Props {
  location: Location;
  isSelected: boolean;
  onSelect: (location: Location, checked: boolean) => void;
}

export default function Row({ location, isSelected, onSelect }: Props) {
  const handleClick = () => {
    onSelect(location, !isSelected);
  };

  return (
    <tr className="cursor-pointer hover:bg-fetch-bg" onClick={handleClick}>
      <td className="w-[64px] border px-4 py-2 text-center">
        <FetchCheckbox checked={isSelected} />
      </td>
      <td className="border px-4 py-2">{location.zip_code}</td>
      <td className="border px-4 py-2">{location.county}</td>
      <td className="border px-4 py-2">{location.city}</td>
      <td className="border px-4 py-2">{location.state}</td>
    </tr>
  );
}
