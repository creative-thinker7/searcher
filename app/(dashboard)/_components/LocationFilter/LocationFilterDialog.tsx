import FetchButton from "@/components/FetchButton";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import TabManual from "./TabManual";
import TabSearch from "./TabSearch";

const enum TabType {
  MANUAL = "MANUAL",
  SEARCH = "SEARCH",
}

const tabList = [
  { value: TabType.MANUAL, label: "Enter zip codes manually" },
  { value: TabType.SEARCH, label: "Search zip codes by city" },
];

const MANUAL_TAB_INDEX = 0;

interface Props {
  open: boolean;
  selectedZipCodes: string[];
  onFilter: (zipCodes: string[]) => void;
  onClose: () => void;
}

export default function LocationFilterDialog({
  open,
  selectedZipCodes,
  onFilter,
  onClose,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(MANUAL_TAB_INDEX);
  const [manualZipCodes, setManualZipCodes] = useState<string[]>([]);
  const [searchZipCodes, setSearchZipCodes] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setManualZipCodes(selectedZipCodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleFilter = () => {
    let zipCodes: string[];

    if (selectedIndex === MANUAL_TAB_INDEX) {
      zipCodes = manualZipCodes;
    } else {
      zipCodes = searchZipCodes;
    }

    if (!zipCodes.length) {
      return;
    }

    onFilter(zipCodes);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-h-full max-w-full space-y-4 border border-fetch-text/10 bg-white p-4 shadow-lg lg:min-w-[768px]">
          <DialogTitle className="font-bold">Filter by Location</DialogTitle>
          <TabGroup
            className="max-h-[400px] overflow-y-auto"
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          >
            <TabList className="mb-2 flex gap-4">
              {tabList.map((tab) => (
                <Tab
                  key={tab.value}
                  className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:outline-none data-[hover]:bg-fetch-purple/5 data-[selected]:bg-fetch-purple/10 data-[selected]:data-[hover]:bg-fetch-purple/10 data-[focus]:outline-1 data-[focus]:outline-fetch-text/25"
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <TabManual
                  selectedZipCodes={manualZipCodes}
                  onChange={setManualZipCodes}
                />
              </TabPanel>
              <TabPanel>
                <TabSearch
                  selectedZipCodes={searchZipCodes}
                  onChange={setSearchZipCodes}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <div className="flex items-center justify-end gap-x-2">
            <FetchButton aria-label="close" onClick={onClose}>
              Cancel
            </FetchButton>
            <FetchButton aria-label="filter" onClick={handleFilter}>
              Filter
            </FetchButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
