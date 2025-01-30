import { Input, InputProps } from "@headlessui/react";
import clsx from "clsx";

export default function FetchInput({ className, ...props }: InputProps) {
  return (
    <Input
      {...props}
      className={clsx(
        className,
        "block w-full rounded-lg border border-fetch-text/10 bg-white px-3 py-1.5 text-sm/6",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-fetch-text/25",
      )}
    />
  );
}
