"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { useActiveNav } from "@/hooks/useActiveNav";
import { NavItem, navItems } from "@/config/site";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        className,
        "lg:border lg:border-input lg:rounded-lg lg:sticky lg:top-[72px]"
      )}
    >
      <div className="py-4 space-y-4">
        {navItems.map((navItem, index) => {
          return (
            <div className="px-3 py-2" key={`nav-item-${index}`}>
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {navItem.title}
              </h2>
              <div className="space-y-1">
                {navItem.items?.map((item, index) => (
                  <SiteNavItem {...item} key={`item-${index}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SiteNavItem: React.FC<NavItem> = ({ href, title, Icon }) => {
  const { isActive } = useActiveNav(href);
  return (
    <Button
      variant={`ghost`}
      className={cn(
        "w-full justify-start hover:bg-gray-600 hover:text-white",
        isActive && "bg-gray-600 text-white"
      )}
      asChild
    >
      <Link href={href} className="flex">
        {Icon && <Icon className="mr-2 size-4" />}
        {title}
      </Link>
    </Button>
  );
};
