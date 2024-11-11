"use client";

import * as React from "react";
import { setRegion } from "@/app/actions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { getLanguageName } from "@/lib/utils";

interface SelectLanguageProps {
  value?: string;
  languages: string[];
}

export const SelectLanguage: React.FC<SelectLanguageProps> = ({
  value,
  languages,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-start w-full"
        >
          {value
            ? getLanguageName(
                languages.find((language) => language === value),
                value
              )
            : "Select Language"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search language" className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language, index) => (
                <CommandItem
                  value={getLanguageName(value, language)}
                  key={`item-${index}`}
                  onSelect={() => {
                    setRegion(language);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {getLanguageName(value, language)}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
