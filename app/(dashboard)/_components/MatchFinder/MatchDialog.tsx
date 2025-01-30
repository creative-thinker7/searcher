import FetchButton from "@/components/FetchButton";
import { Dog } from "@/types";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";

interface Props {
  open: boolean;
  dog?: Dog | null;
  onClose: () => void;
}

export default function MatchDialog({ open, dog, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border border-fetch-text/10 bg-white p-4 shadow-lg">
          <DialogTitle className="font-bold">Match Result</DialogTitle>
          {!dog ? (
            <Description>Unable to find a match</Description>
          ) : (
            <div className="flex items-center gap-x-4">
              <Image
                src={dog.img}
                width={300}
                height={200}
                className="max-h-[128px] max-w-[128px] rounded"
                alt={dog.name}
              />
              <div>
                <div>
                  <label className="font-bold">Name: </label>
                  {dog.name}
                </div>
                <div>
                  <label className="font-bold">Breed: </label>
                  {dog.breed}
                </div>
                <div>
                  <label className="font-bold">Age: </label>
                  {dog.age}
                </div>
                <div>
                  <label className="font-bold">Zip Code: </label>
                  {dog.zip_code}
                </div>
              </div>
            </div>
          )}
          <div className="text-right">
            <FetchButton aria-label="close" onClick={onClose}>
              Close
            </FetchButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
