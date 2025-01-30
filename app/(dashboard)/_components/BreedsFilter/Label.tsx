interface Props {
  breed: string;
}

export default function BreedsFilterLabel({ breed }: Props) {
  return (
    <span className="m-1 rounded-full bg-fetch-purple px-2 py-1 text-white">
      {breed}
    </span>
  );
}
