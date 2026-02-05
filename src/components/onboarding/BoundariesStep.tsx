import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Lightbulb } from "lucide-react";

interface BoundariesStepProps {
  selectedBoundaries: string[];
  onToggleBoundary: (boundary: string) => void;
  onNext: () => void;
}

const boundaries = [
  {
    id: "no-body-comments",
    title: "No body comments",
    description: "Keep feedback focused on technique and form",
  },
  {
    id: "supportive-feedback",
    title: "Supportive feedback only",
    description: "Encouragement > criticism",
  },
  {
    id: "take-slow",
    title: "I prefer taking things slow",
    description: "Building trust takes time",
  },
];

export function BoundariesStep({ selectedBoundaries, onToggleBoundary, onNext }: BoundariesStepProps) {
  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        Set your boundaries
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Your matches will see these preferences on your profile.
      </p>

      <div className="space-y-3 mb-6">
        {boundaries.map((boundary) => {
          const isSelected = selectedBoundaries.includes(boundary.id);
          
          return (
            <div
              key={boundary.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "border-success bg-success/10"
                  : "border-border"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="font-medium">{boundary.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {boundary.description}
                  </div>
                </div>
                <Switch
                  checked={isSelected}
                  onCheckedChange={() => onToggleBoundary(boundary.id)}
                  className="data-[state=checked]:bg-success"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 mb-8">
        <Lightbulb className="w-5 h-5 text-warm shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          These are <span className="text-foreground font-medium">ON by default</span> — we recommend keeping them active
        </p>
      </div>

      <Button variant="spot" size="xl" className="w-full" onClick={onNext}>
        Continue
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
