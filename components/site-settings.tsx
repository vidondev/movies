import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SelectTheme } from "./select-theme";
import { Label } from "./ui/label";
import { SelectLanguage } from "./select-language";
import { cookies } from "next/headers";
import { Service } from "@/services/api";

export default async function SiteSettings() {
  const region = cookies().get("region")?.value ?? "en-US";

  const languages = await Service.configuration.primary_translations();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant={`outline`}>
          <Settings size={16} />
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-2 ">
        <h5>Settings</h5>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Languages</Label>
          <SelectLanguage value={region} languages={languages} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Theme</Label>
          <SelectTheme />
        </div>
      </PopoverContent>
    </Popover>
  );
}
