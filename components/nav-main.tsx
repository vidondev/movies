"use client";

import { type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { NavItem } from "@/config/site";
import Link from "next/link";
import { useActiveNav } from "@/hooks/useActiveNav";
import { usePathname } from "next/navigation";

// const NavItem:React.FC<NavItem> = ({href, Icon, title}) => {
//   const { isActive } = useActiveNav(href);
//   return (
//     <Button
//       variant={`ghost`}
//       className={cn(
//         "w-full justify-start hover:bg-gray-600 hover:text-white",
//         isActive && "bg-gray-600 text-white"
//       )}
//       asChild
//     >
//       <Link href={href} className="flex">
//         {Icon && <Icon className="mr-2 size-4" />}
//         {title}
//       </Link>
//     </Button>
//   );
// }

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item, index) => (
        <SidebarGroup key={`sidebar-group-${index}`}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items?.length
                ? item.items.map(({ Icon, ...item }, subIndex) => (
                    <SidebarMenuItem key={`sidebar-menu-item-${subIndex}`}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                      >
                        <Link href={item.href}>
                          {Icon && <Icon />}
                          {item.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  ))
                : null}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
