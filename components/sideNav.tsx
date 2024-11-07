"use client";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const SideNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        <Menu size={16} />
      </SheetTrigger>
      <SheetContent
        side={`left`}
        className="flex flex-col px-0 border border-input"
      >
        <ScrollArea className="px-4 md:px-6">
          <Sidebar />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
