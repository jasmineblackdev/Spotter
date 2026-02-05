import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";

interface FrequencyStepProps {
  frequency: number;
  onFrequencyChange: (value: number) => void;
  onNext: () => void;
}

export function FrequencyStep({ frequency, onFrequencyChange, onNext }: FrequencyStepProps) {
  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        How often do you train?
      </h2>
      <p className="text-muted-foreground text-center mb-12">
        We'll match you with people on a similar schedule
      </p>

      <div className="text-center mb-8">
        <div className="inline-flex items-baseline gap-1 bg-muted px-8 py-4 rounded-2xl">
          <span className="text-5xl font-bold text-primary">{frequency}x</span>
          <span className="text-xl text-muted-foreground">per week</span>
        </div>
      </div>

      <div className="px-4 mb-8">
        <Slider
          value={[frequency]}
          onValueChange={(values) => onFrequencyChange(values[0])}
          min={2}
          max={7}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-3">
          <span>2x</span>
          <span>7x</span>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mb-8">
        Most compatible matches train{" "}
        <span className="text-primary font-medium">3-5x per week</span>
      </p>

      <Button variant="spot" size="xl" className="w-full" onClick={onNext}>
        Continue
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
