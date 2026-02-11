import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Heart, Sparkles, Check } from "lucide-react";

interface IntentStepProps {
  selectedIntent: string | null;
  onSelectIntent: (intent: string) => void;
  onNext: () => void;
}

const intents = [
  {
    id: "gym-buddy",
    emoji: "🏋️",
    title: "Gym Buddy Only",
    description: "Find consistent training partners. No dating expectations.",
    color: "primary",
  },
  {
    id: "gym-to-bae",
    emoji: "🧡",
    title: "Gym Buddy → Bae",
    description: "Start as workout partners, open to seeing where it goes.",
    color: "bae",
    recommended: true,
  },
  {
    id: "open-dating",
    emoji: "💕",
    title: "Open to Dating",
    description: "Looking for connection with someone who values wellness.",
    color: "bae",
  },
];

export function IntentStep({ selectedIntent, onSelectIntent, onNext }: IntentStepProps) {
  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        What brings you to Spotter?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Choose what feels right — you can always change this later.
      </p>

      <div className="space-y-3">
        {intents.map((intent) => {
          const isSelected = selectedIntent === intent.id;
          
          return (
            <button
              key={intent.id}
              onClick={() => onSelectIntent(intent.id)}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all relative ${
                isSelected
                  ? intent.color === "bae"
                    ? "border-bae bg-bae/10"
                    : "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  isSelected
                    ? intent.color === "bae"
                      ? "bg-bae/20"
                      : "bg-primary/20"
                    : "bg-muted"
                }`}>
                  {intent.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg flex items-center gap-2">
                    {intent.title}
                    {intent.recommended && (
                      <span className="text-xs bg-bae/20 text-bae px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {intent.description}
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isSelected
                    ? intent.color === "bae"
                      ? "bg-bae text-white"
                      : "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/30"
                }`}>
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button
        variant="spot"
        size="xl"
        className="w-full mt-8"
        onClick={onNext}
        disabled={!selectedIntent}
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
