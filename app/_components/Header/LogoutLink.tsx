"use client";

import { useLogout } from "@/api";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";

export default function LogoutLink() {
  const pathname = usePathname();

  const { mutate, isPending } = useLogout();

  const handleLogout: MouseEventHandler = async () => {
    try {
      await mutate();
    } catch {
      // Keep silence.
    }
  };

  // Since we check the authentication status
  // in the Next.js middleware and perform redirects
  // as necessary, we can use the pathname to determine
  // whether the current user is logged in or not.
  if (pathname === "/login") {
    return null;
  }

  return (
    <button
      className={clsx("text-fetch-red", {
        "pointer-events-none": isPending,
      })}
      role="button"
      aria-label="Logout"
      aria-disabled={isPending}
      disabled={isPending}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
