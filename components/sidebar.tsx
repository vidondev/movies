"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  CalendarDays,
  Clapperboard,
  Heart,
  LucideIcon,
  Play,
  Star,
  Tv,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useActiveNav } from "@/hooks/useActiveNav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
type NavItem = {
  title: string;
  href: string;
  Icon?: LucideIcon;
  description?: string;
  items?: NavItem[];
};

export function Sidebar({ className }: SidebarProps) {
  const navItems: NavItem[] = [
    {
      title: "Movies",
      href: "/movies",
      Icon: Clapperboard,
      items: [
        {
          title: "Popular",
          href: "/movies/category/popular",
          Icon: Heart,
        },
        {
          title: "Now Playing",
          href: "/movies/category/now-playing",
          Icon: Play,
        },
        {
          title: "Upcoming",
          href: "/movies/category/upcoming",
          Icon: CalendarDays,
        },
        {
          title: "Top Rated",
          href: "/movies/category/top-rated",
          Icon: Star,
        },
      ],
    },
    {
      title: "TV shows",
      href: "/tv",
      Icon: Tv,
      items: [
        {
          title: "Popular",
          href: "/tv/popular",
          Icon: Heart,
        },
        {
          title: "Now Playing",
          href: "/tv/now-playing",
          Icon: Play,
        },
        {
          title: "Upcoming",
          href: "/tv/upcoming",
          Icon: CalendarDays,
        },
        {
          title: "Top Rated",
          href: "/tv/top-rated",
          Icon: Star,
        },
      ],
    },
    {
      title: "People",
      href: "/person",
      items: [
        {
          title: "Popular People",
          href: "/person",
          Icon: UserRound,
        },
      ],
    },
  ];

  return (
    <div className="pl-4 hidden lg:block">
      <div className={cn(className, " border rounded-md sticky top-[72px]")}>
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
