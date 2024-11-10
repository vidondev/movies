"use client";

import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Service } from "@/services/api";
import { Language } from "@/services/models/configuration";
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

interface SelectLanguageProps {
  value?: string;
  languages: Language[];
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
            ? languages.find((language) => language.iso_639_1 === value)
                ?.english_name
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
                  value={language.english_name}
                  key={`item-${index}`}
                  onSelect={() => {
                    setRegion(language.iso_639_1);
                    setOpen(false);
                  }}
                >
                  {language.english_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
