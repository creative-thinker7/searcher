import { Location } from "@/types";
import { Description, Dialog, DialogPanel } from "@headlessui/react";

interface Props {
  open: boolean;
  location?: Location | null;
  onClose: () => void;
}

export default function LocationInfoDialog({ open, location, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border border-fetch-text/10 bg-white p-4 shadow-lg">
          {!location ? (
            <Description>Unable to retrieve the location details</Description>
          ) : (
            <span>
              {location.county}, {location.city}, {location.state}
            </span>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
