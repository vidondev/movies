import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Menu, Search, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-5 py-3 sticky top-0 bg-white z-20">
      <div className="logo">
        <Link href="/">
          <Icons.Logo
            className="size-12 mx-auto  bg-gray-600 text-white rounded-full p-2"
            strokeWidth={1}
          />
        </Link>
      </div>
      <div className="lg:hidden">
        <Button size="icon" variant={`outline`}>
          <Menu size={16} />
        </Button>
      </div>
      <div className="ml-auto flex space-x-2">
        <Button size="icon" variant={`outline`}>
          <Search size={16} />
        </Button>
        <Button size="icon" variant={`outline`}>
          <Settings size={16} />
        </Button>
      </div>
    </header>
  );
}
