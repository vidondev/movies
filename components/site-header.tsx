"use client";
import Link from "next/link";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { Menu, Search, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="grid grid-cols-3 lg:flex lg:justify-between items-center px-5 py-3 sticky top-0 bg-background z-20">
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className={cn(buttonVariants({ variant: "outline" }))}>
            <Menu size={16} />
          </SheetTrigger>
          <SheetContent side={`left`} className="flex flex-col px-0">
            <ScrollArea className="px-4 md:px-6">
              <Sidebar />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <div className="logo">
        <Link href="/">
          <Icons.Logo
            className="size-12 mx-auto  bg-gray-600 text-white rounded-full p-2"
            strokeWidth={1}
          />
        </Link>
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
