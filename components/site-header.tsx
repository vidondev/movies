import { Button } from "./ui/button";
import { Search } from "lucide-react";
import SiteSettings from "./site-settings";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  return (
    <header className="flex shrink-0  gap-2 border-b  p-4 justify-between items-center">
      <SidebarTrigger variant={`outline`} size={`icon`}/>
      <div className="flex gap-x-2">
        <Button size="icon" variant={`outline`}>
          <Search size={16} />
        </Button>
        <SiteSettings />
      </div>
    </header>
  );
}
