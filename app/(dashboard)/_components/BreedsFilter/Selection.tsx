import { ListboxButton } from "@headlessui/react";
import BreedsFilterLabel from "./Label";

interface Props {
  breeds: string[];
  onClear: () => void;
}

export default function BreedsFilterSelection({ breeds, onClear }: Props) {
  const renderLabels = () => {
    if (!breeds.length) {
      return "Select breeds...";
    }

    if (breeds.length <= 5) {
      return breeds.map((breed) => (
        <BreedsFilterLabel key={breed} breed={breed} />
      ));
    }

    const firstFiveBreeds = breeds.slice(0, 5);
    const moreCount = breeds.length - 5;
    return (
      <>
        {firstFiveBreeds.map((breed) => (
          <BreedsFilterLabel key={breed} breed={breed} />
        ))}
        <span className="m-1 px-2 py-1">
          + {moreCount} {moreCount > 1 ? "breeds" : "breed"}
        </span>
      </>
    );
  };

  return (
    <ListboxButton className="flex w-full items-center gap-x-1 rounded border border-fetch-text/10 p-2 text-left">
      <div className="flex flex-1 flex-wrap">{renderLabels()}</div>
      {breeds.length > 0 && (
        <span
          className="p-2"
          role="button"
          aria-label="Clear"
          onClick={onClear}
        >
          &times;
        </span>
      )}
    </ListboxButton>
  );
}
