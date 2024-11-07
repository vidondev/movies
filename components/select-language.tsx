"use client";

import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Service } from "@/services/api";
import { Language } from "@/services/models/configuration";
import { setRegion } from "@/app/actions";

interface SelectLanguageProps {
  value?: string;
}

export const SelectLanguage: React.FC<SelectLanguageProps> = ({ value }) => {
  const [languages, setLanguages] = React.useState<Language[]>([]);

  const fetchLanguages = async () => {
    const languages = await Service.configuration.languages({
      language: "zh-hk",
    });
    setLanguages(languages);
  };

  React.useEffect(() => {
    fetchLanguages();
  }, []);

  const handleChange = (value: string) => {
    setRegion(value);
  };

  return (
    <Select defaultValue={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language, index) => (
          <SelectItem
            value={language.iso_639_1}
            key={`item-${index}`}
            className="flex items-center space-x-1"
          >
            {language.english_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
