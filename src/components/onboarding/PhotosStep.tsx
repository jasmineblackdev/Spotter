import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Camera } from "lucide-react";

interface PhotosStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export function PhotosStep({ onNext, onSkip }: PhotosStepProps) {
  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        Add a photo
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Show your training vibe — photos are optional but recommended
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-all flex items-center justify-center bg-muted/50"
          >
            {index === 0 ? (
              <Camera className="w-8 h-8 text-muted-foreground" />
            ) : (
              <Plus className="w-6 h-6 text-muted-foreground" />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-muted/50 mb-8">
        <p className="text-sm font-medium mb-2">Tips for great photos:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Show you in your element</li>
          <li>• Gym selfies are totally fine</li>
          <li>• Action shots work great</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" size="xl" className="flex-1" onClick={onSkip}>
          Skip for now
        </Button>
        <Button variant="spot" size="xl" className="flex-1" onClick={onNext}>
          Continue
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
