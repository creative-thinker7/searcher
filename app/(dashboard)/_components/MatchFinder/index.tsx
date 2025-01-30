import { useMatch } from "@/api";
import FetchButton from "@/components/FetchButton";
import Loader from "@/components/Loader";
import { useState } from "react";
import MatchDialog from "./MatchDialog";

interface Props {
  dogIds: string[];
}

export default function MatchFinder({ dogIds }: Props) {
  const { mutate, data, isPending } = useMatch();
  const [showResult, setShowResult] = useState(false);

  const handleMatch = async () => {
    try {
      await mutate(dogIds);

      setShowResult(true);
    } catch {
      // Show failure message.
      setShowResult(true);
    }
  };

  const renderSelection = () => {
    const count = dogIds.length;

    if (!count) {
      return "No dog selected";
    }

    if (count === 1) {
      return "1 dog selected";
    }

    return `${count.toLocaleString()} dogs selected`;
  };

  return (
    <div className="relative flex items-center gap-x-2">
      {isPending && <Loader />}
      {renderSelection()}
      <FetchButton
        disabled={dogIds.length === 0 || isPending}
        aria-label="find match"
        onClick={handleMatch}
      >
        Find Match
      </FetchButton>
      <MatchDialog
        open={!isPending && showResult}
        dog={data}
        onClose={() => {
          setShowResult(false);
        }}
      />
    </div>
  );
}
