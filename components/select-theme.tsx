"use client";

import * as React from "react";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";

export function SelectTheme() {
  const { setTheme, theme } = useTheme();

  const iconProps = {
    className: "size-4",
  };

  function handleClick(value: string) {
    setTheme(value);
  }

  const themes = [
    {
      value: "light",
      text: "Light",
      Icon: <Sun {...iconProps} />,
    },
    {
      value: "dark",
      text: "Dark",
      Icon: <Moon {...iconProps} />,
    },
    { value: "system", text: "System", Icon: <MonitorCog {...iconProps} /> },
  ];
  return (
    <Select defaultValue={theme} onValueChange={setTheme}>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme, index) => (
          <SelectItem
            value={theme.value}
            key={`item-${index}`}
            className="flex items-center space-x-1"
          >
            <div className="flex items-center gap-2">
              {theme.Icon} <span>{theme.text}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
