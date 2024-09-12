"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Clapperboard,
  Home,
  LucideIcon,
  Origami,
  Search,
  Tv,
  UserRound,
} from "lucide-react";
import { useActiveNav } from "@/hooks/useActiveNav";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

import Image from "next/image";

import { tmdbImage } from "@/config/image";

export type NavItem = {
  title: string;
  href: string;
  Icon?: LucideIcon;
  description?: string;
  items?: NavItem[];
};

const SiteNav: React.FC = () => {
  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      Icon: Home,
    },
    {
      title: "Movies",
      href: "/movies",
      Icon: Clapperboard,
      items: [
        {
          title: "Popular",
          href: "/movies/popular",
        },
        {
          title: "Now Playing",
          href: "/movies/now-playing",
        },
        {
          title: "Upcoming",
          href: "/movies/upcoming",
        },
        {
          title: "Top Rated",
          href: "/movies/top-rated",
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
        },
        {
          title: "Now Playing",
          href: "/tv/now-playing",
        },
        {
          title: "Upcoming",
          href: "/tv/upcoming",
        },
        {
          title: "Top Rated",
          href: "/tv/top-rated",
        },
      ],
    },
    {
      title: "People",
      href: "/person",
      Icon: UserRound,
    },
  ];
  return (
    <div className="flex container   h-full items-center">
      <div className="flex items-center space-x-3">
        <div>
          <Link href={`/`}>
            <Origami />
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((navItem, index) =>
              navItem.items ? (
                <SiteNavItem {...navItem} key={`item-${index}`} />
              ) : (
                <SiteNavItemSingle {...navItem} key={`item-${index}`} />
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto">
        <Button size={`icon`} variant={`ghost`}>
          <Search />
        </Button>
      </div>
    </div>
  );
};

const SiteNavItem: React.FC<NavItem> = ({ title, href, Icon, items }) => {
  const isActive = useActiveNav(href);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn(isActive && "bg-accent", "gap-2")}>
        {Icon && <Icon className="size-4" />} {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="flex">
        <ul className="lg:w-[500px] p-6 grid lg:grid-cols-[.75fr_1fr] gap-2">
          <li className={cn(`row-span-4`, "bg-slate-600")}>
            <div className="relative aspect-poster">
              <Image
                src={tmdbImage.backdrop(
                  "4TzwDWpLmb9bWJjlN3iBUdvgarw.jpg",
                  "w300"
                )}
                fill
                className="size-full z-0"
                alt=""
              />
              <h3 className="text-white relative">title</h3>
            </div>
          </li>
          {items?.map((item, index) => (
            <li key={`item-${index}`}>
              <NavigationMenuLink asChild>
                <Link href={item.href} title={item.title}>
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const SiteNavItemSingle: React.FC<NavItem> = ({ title, href, Icon }) => {
  const isActive = useActiveNav(href);
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            isActive && "bg-accent",
            "gap-2"
          )}
        >
          {Icon && <Icon className="size-4" />} {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default SiteNav;
