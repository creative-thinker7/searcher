import { Button, ButtonProps } from "@headlessui/react";

export default function FetchButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className="rounded bg-fetch-deep-purple px-4 py-2 text-sm text-white data-[active]:bg-fetch-purple data-[hover]:bg-fetch-purple"
    >
      {children}
    </Button>
  );
}
