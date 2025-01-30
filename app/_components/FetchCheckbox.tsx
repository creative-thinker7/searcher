import { Checkbox, CheckboxProps } from "@headlessui/react";

export default function FetchCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      {...props}
      className="group inline-block size-4 rounded border border-fetch-text/10 bg-white"
    >
      <svg
        className="stroke-fetch-purple opacity-0 group-data-[checked]:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Checkbox>
  );
}
