import Image from "next/image";
import LogoutLink from "./LogoutLink";

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between bg-fetch-bg p-4 shadow-md">
      <Image
        src="/fetch.svg"
        alt="Fetch logo"
        width={210}
        height={45}
        priority
      />
      <LogoutLink />
    </div>
  );
}
