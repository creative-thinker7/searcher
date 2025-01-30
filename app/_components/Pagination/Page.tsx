import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  currentPage?: number;
  page?: number;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: (page: number) => void;
}

export default function Page({
  currentPage,
  page,
  disabled,
  children,
  onClick,
}: Props) {
  return (
    <button
      className={clsx(
        "rounded border border-transparent px-4 py-2 hover:bg-fetch-bg",
        {
          "!border-fetch-purple": !disabled && currentPage === page,
          "cursor-not-allowed opacity-50": disabled,
        },
      )}
      disabled={disabled}
      onClick={() => onClick && onClick(page || 0)}
    >
      {children ? children : page}
    </button>
  );
}
