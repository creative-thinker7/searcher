interface Props {
  breed: string;
  onDeselect: (breed: string) => void;
}

export default function BreedsFilterLabel({ breed, onDeselect }: Props) {
  const handleDeselect = () => {
    onDeselect(breed);
  };

  return (
    <button
      type="button"
      className="m-1 cursor-pointer rounded-full bg-fetch-purple px-2 py-1 text-white"
      onClick={handleDeselect}
    >
      {breed}
    </button>
  );
}
