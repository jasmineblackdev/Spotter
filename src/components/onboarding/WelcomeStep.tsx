import { Button } from "@/components/ui/button";
import { Dumbbell, ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center animate-fade-in-scale">
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
        <Dumbbell className="w-10 h-10 text-primary" />
      </div>
      <h1 className="font-display text-4xl font-bold mb-4">
        <span className="text-gradient-primary">Spotter</span>
      </h1>
      <p className="text-xl text-foreground mb-2">
        From gym buddy to bae.
      </p>
      <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
        Meet people who actually show up. Let connection grow naturally.
      </p>
      <Button variant="spot" size="xl" onClick={onNext}>
        Get Started
        <ArrowRight className="w-5 h-5" />
      </Button>
      <p className="text-sm text-muted-foreground mt-6">
        Already have an account? <span className="text-primary cursor-pointer hover:underline">Log in</span>
      </p>
    </div>
  );
}
