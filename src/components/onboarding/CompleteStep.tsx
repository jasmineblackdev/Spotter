import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

interface CompleteStepProps {
  onFinish: () => void;
}

export function CompleteStep({ onFinish }: CompleteStepProps) {
  return (
    <div className="text-center animate-fade-in-scale">
      <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-success" />
      </div>
      <h1 className="font-display text-3xl font-bold mb-4">
        You're all set!
      </h1>
      <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
        Time to find your perfect gym buddy. Let's get spotting!
      </p>
      <Button variant="spot" size="xl" onClick={onFinish}>
        Start Matching
        <Sparkles className="w-5 h-5" />
      </Button>
    </div>
  );
}
