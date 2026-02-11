import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface TrainingStyleStepProps {
  selectedStyles: string[];
  onToggleStyle: (style: string) => void;
  onNext: () => void;
}

const trainingStyles = [
  { id: "strength", label: "Strength", emoji: "🏋️", goal: "Build power & muscle" },
  { id: "cardio", label: "Endurance", emoji: "🏃", goal: "Boost stamina" },
  { id: "yoga", label: "Wellness", emoji: "🧘", goal: "Mind-body balance" },
  { id: "crossfit", label: "Functional", emoji: "🤸", goal: "Full-body conditioning" },
  { id: "boxing", label: "Combat", emoji: "🥊", goal: "Agility & power" },
  { id: "swimming", label: "Aquatic", emoji: "🏊", goal: "Low-impact fitness" },
  { id: "cycling", label: "Cycling", emoji: "🚴", goal: "Endurance & legs" },
  { id: "hiking", label: "Outdoor", emoji: "⛰️", goal: "Nature & movement" },
  { id: "sports", label: "Team Sports", emoji: "🎾", goal: "Play & compete" },
];

export function TrainingStyleStep({ selectedStyles, onToggleStyle, onNext }: TrainingStyleStepProps) {
  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        What are you training for?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Select all that resonate with you
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
              <div className="text-3xl mb-1">{style.emoji}</div>
              <div className="text-sm font-semibold">{style.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{style.goal}</div>
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
