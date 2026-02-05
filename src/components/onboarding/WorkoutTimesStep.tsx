import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface WorkoutTimesStepProps {
  selectedTimes: string[];
  onToggleTime: (time: string) => void;
  onNext: () => void;
}

const workoutTimes = [
  { id: "early-morning", emoji: "🌅", label: "Early Morning", time: "5am - 8am" },
  { id: "morning", emoji: "☀️", label: "Morning", time: "8am - 12pm" },
  { id: "afternoon", emoji: "🌤️", label: "Afternoon", time: "12pm - 5pm" },
  { id: "evening", emoji: "🌆", label: "Evening", time: "5pm - 9pm" },
  { id: "night", emoji: "🌙", label: "Night Owl", time: "9pm+" },
];

export function WorkoutTimesStep({ selectedTimes, onToggleTime, onNext }: WorkoutTimesStepProps) {
  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        When do you usually train?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Select all that work for you
      </p>

      <div className="space-y-3 mb-8">
        {workoutTimes.map((time) => {
          const isSelected = selectedTimes.includes(time.id);
          
          return (
            <button
              key={time.id}
              onClick={() => onToggleTime(time.id)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-2xl">{time.emoji}</div>
              <div className="flex-1">
                <div className="font-medium">{time.label}</div>
                <div className="text-sm text-muted-foreground">{time.time}</div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "border-2 border-muted-foreground/30"
              }`}>
                {isSelected && <Check className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </div>

      <Button
        variant="spot"
        size="xl"
        className="w-full"
        onClick={onNext}
        disabled={selectedTimes.length === 0}
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
