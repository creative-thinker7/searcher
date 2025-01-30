import FetchCheckbox from "@/components/FetchCheckbox";
import { Dog } from "@/types";
import Image from "next/image";
import { MouseEvent } from "react";

interface Props {
  dog: Dog;
  isSelected: boolean;
  onSelect: (dog: Dog, checked: boolean) => void;
  onGetLocation: (zipCode: string) => Promise<void>;
}

export default function Row({
  dog,
  isSelected,
  onSelect,
  onGetLocation,
}: Props) {
  const handleClick = () => {
    onSelect(dog, !isSelected);
  };

  const handleClickMoreInfo = async (event: MouseEvent) => {
    event.stopPropagation();

    await onGetLocation(dog.zip_code);
  };

  return (
    <tr className="cursor-pointer hover:bg-fetch-bg" onClick={handleClick}>
      <td className="w-[64px] border px-4 py-2 text-center">
        <FetchCheckbox checked={isSelected} />
      </td>
      <td className="border px-4 py-2">
        <span className="flex items-center gap-x-2">
          <Image
            src={dog.img}
            width={300}
            height={200}
            className="max-h-[64px] max-w-[64px] rounded"
            alt={dog.name}
          />{" "}
          {dog.name}
        </span>
      </td>
      <td className="border px-4 py-2">{dog.breed}</td>
      <td className="border px-4 py-2">{dog.age}</td>
      <td className="border px-4 py-2">
        <div className="flex items-center gap-x-2">
          {dog.zip_code}
          <button
            className="text-sm underline"
            aria-label="more info"
            onClick={handleClickMoreInfo}
          >
            more info
          </button>
        </div>
      </td>
    </tr>
  );
}
