import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface TrainingStyleStepProps {
  selectedStyles: string[];
  onToggleStyle: (style: string) => void;
  onNext: () => void;
}

const trainingStyles = [
  { id: "strength", label: "Strength", emoji: "🏋️" },
  { id: "cardio", label: "Cardio", emoji: "🏃" },
  { id: "yoga", label: "Yoga", emoji: "🧘" },
  { id: "crossfit", label: "CrossFit", emoji: "🤸" },
  { id: "boxing", label: "Boxing", emoji: "🥊" },
  { id: "swimming", label: "Swim", emoji: "🏊" },
  { id: "cycling", label: "Cycling", emoji: "🚴" },
  { id: "hiking", label: "Hiking", emoji: "⛰️" },
  { id: "sports", label: "Sports", emoji: "🎾" },
];

export function TrainingStyleStep({ selectedStyles, onToggleStyle, onNext }: TrainingStyleStepProps) {
  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        What's your training style?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Select all that apply
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {trainingStyles.map((style) => {
          const isSelected = selectedStyles.includes(style.id);
          
          return (
            <button
              key={style.id}
              onClick={() => onToggleStyle(style.id)}
              className={`p-4 rounded-2xl border-2 text-center transition-all relative ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <div className="text-3xl mb-2">{style.emoji}</div>
              <div className="text-sm font-medium">{style.label}</div>
            </button>
          );
        })}
      </div>

      <Button
        variant="spot"
        size="xl"
        className="w-full"
        onClick={onNext}
        disabled={selectedStyles.length === 0}
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
