"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useActiveNav = (href: string) => {
  const [isActive, setIsActive] = useState(false)
  const pathname = usePathname();

  useEffect(() => {
    if (href === "/") {
       setIsActive(pathname === href);
    } else {
      setIsActive(pathname.startsWith(href))
    }
  }, [pathname])
  
  return {isActive}
};
