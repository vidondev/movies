import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { SideNav } from "./sideNav";
import SiteSettings from "./site-settings";

export default function Header() {
  return (
    <header className="grid grid-cols-3 lg:flex lg:justify-between items-center px-5 py-3 sticky top-0 bg-background z-20">
      <div className="lg:hidden">
        <SideNav />
      </div>
      <div className="logo">
        <Link href="/">
          <Icons.Logo
            className="size-12 mx-auto  bg-gray-600 text-white rounded-full p-2"
            strokeWidth={1}
          />
        </Link>
      </div>
      <div className="ml-auto flex gap-x-2">
        <Button size="icon" variant={`outline`}>
          <Search size={16} />
        </Button>
        <SiteSettings />
      </div>
    </header>
  );
}
