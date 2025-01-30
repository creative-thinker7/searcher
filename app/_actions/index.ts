"use server";

import { cookies } from "next/headers";
import { AUTH_STATUS_COOKIE } from "@/app/constants";
import { redirect } from "next/navigation";

const ONE_MINUTE_IN_MS = 60 * 1000;
const ONE_HOUR_IN_MS = 60 * ONE_MINUTE_IN_MS;

export async function saveAuthStatus() {
  const cookieStore = await cookies();
  // Since the Fetch access token expires in 1 hour,
  // we set our custom auth cookie to expire
  // just slightly before the 1-hour mark.
  cookieStore.set(AUTH_STATUS_COOKIE, "true", {
    expires: Date.now() + (ONE_HOUR_IN_MS - ONE_MINUTE_IN_MS), // 59 minutes
  });

  redirect("/");
}

export async function removeAuthStatus() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_STATUS_COOKIE);

  redirect("/login");
}
