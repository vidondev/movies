import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState } from "react";

interface FilterUserScoreProps {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  steps: number;
  stepSize: number;
}

export const FilterUserScore: React.FC<FilterUserScoreProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  steps,
  stepSize,
}) => {
  return (
    <div className="space-y-2 ">
      <Label className="text-muted-foreground">{label}</Label>
      <div className="mx-1 pb-2">
        <Slider
          min={min}
          max={max}
          step={stepSize}
          defaultValue={value}
          onValueChange={onChange}
          minStepsBetweenThumbs={1}
        />

        <div className="mt-4 flex justify-between border-t ">
          {Array.from({ length: steps }, (_, i) => (
            <div key={i} className="relative pt-2">
              <span
                className={cn(
                  "text-[9px]",
                  value.indexOf(i) > -1 && "text-muted-foreground"
                )}
              >
                {i * stepSize}
              </span>
              <span className="absolute left-1/2 top-0 block h-1/3 w-px -translate-x-px bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
