"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Box,
  CalendarDays,
  Clapperboard,
  Heart,
  Home,
  Play,
  Star,
  Tv,
  UserRound,
} from "lucide-react";
import { NavItem } from "./site-nav";
import Link from "next/link";
import { useActiveNav } from "@/hooks/useActiveNav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const navItems: NavItem[] = [
    {
      title: "Movies",
      href: "/movies",
      Icon: Clapperboard,
      items: [
        {
          title: "Popular",
          href: "/movies/popular",
          Icon: Heart,
        },
        {
          title: "Now Playing",
          href: "/movies/now-playing",
          Icon: Play,
        },
        {
          title: "Upcoming",
          href: "/movies/upcoming",
          Icon: CalendarDays,
        },
        {
          title: "Top Rated",
          href: "/movies/top-rated",
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
    <div className={cn(className, "hidden lg:block")}>
      <div className="py-4 space-y-4">
        <div className="logo">
          <Link href="/">
          <Box className="size-14 mx-auto  bg-gray-600 text-white rounded-full p-2" strokeWidth={1}/>
          </Link>
        </div>
        {navItems.map((navItem, index) => {
          return (
            <div className="px-3 py-2" key={`nav-item-${index}`}>
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {navItem.title}
              </h2>
              <div className="space-y-1">
                {navItem.items?.map((item, index) => (
                  <SiteNavItem {...item} key={`item-${index}`}/>
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
  const {isActive} = useActiveNav(href);
  return (
    <Button
      variant={`ghost`}
      className={cn("w-full justify-start hover:bg-gray-600 hover:text-white", isActive && "bg-gray-600 text-white")}
      asChild
    >
      <Link href={href} className="flex">
        {Icon && <Icon className="mr-2 size-4" />}
        {title}
      </Link>
    </Button>
  );
};
