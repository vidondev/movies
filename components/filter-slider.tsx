import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";

interface FilterUserScoreProps {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min: number;
  max: number;
  steps: number;
  stepSize: number;
  skip:boolean
  skipSteps:number
}

export const FilterSlider: React.FC<FilterUserScoreProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  steps,
  stepSize,
  skipSteps = 0,
  skip
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

        <div className="flex justify-between -mx-2 mt-2">
          {Array.from({ length: steps }, (_, i) => (
              <div className={cn("flex flex-col  items-center justify-start", skip ?  'grow-0 relative pb-4' : 'flex-1')} key={`step-${i}`}>
                <Separator orientation="vertical" className="h-3" />
                {((skip && i%skipSteps === 0) || !skip) && <span className={cn("text-[9px]", skip && 'absolute top-4')}>{i*stepSize}</span>}
              </div>
          ))}
                 
        </div>

      </div>
    </div>
  );
};
