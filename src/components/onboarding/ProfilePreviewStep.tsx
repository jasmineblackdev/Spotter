import { Button } from "@/components/ui/button";
import { Sparkles, Check, User } from "lucide-react";

interface ProfilePreviewStepProps {
  intent: string | null;
  styles: string[];
  frequency: number;
  times: string[];
  boundaries: string[];
  onFinish: () => void;
}

const intentLabels: Record<string, { label: string; emoji: string }> = {
  "gym-buddy": { label: "Gym Buddy Only", emoji: "🏋️" },
  "gym-to-bae": { label: "Gym Buddy → Bae", emoji: "🧡" },
  "open-dating": { label: "Open to Dating", emoji: "💕" },
};

const styleLabels: Record<string, string> = {
  strength: "🏋️ Strength",
  cardio: "🏃 Cardio",
  yoga: "🧘 Yoga",
  crossfit: "🤸 CrossFit",
  boxing: "🥊 Boxing",
  swimming: "🏊 Swim",
  cycling: "🚴 Cycling",
  hiking: "⛰️ Hiking",
  sports: "🎾 Sports",
};

const timeLabels: Record<string, string> = {
  "early-morning": "Early AM",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
};

const boundaryLabels: Record<string, string> = {
  "no-body-comments": "No body comments",
  "supportive-feedback": "Supportive feedback only",
  "take-slow": "Taking things slow",
};

export function ProfilePreviewStep({
  intent,
  styles,
  frequency,
  times,
  boundaries,
  onFinish,
}: ProfilePreviewStepProps) {
  const intentInfo = intent ? intentLabels[intent] : null;
  const selectedTimes = times.map((t) => timeLabels[t]).filter(Boolean);

  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        Here's how you'll appear
      </h2>
      <p className="text-muted-foreground text-center mb-6">
        You can edit this anytime in your profile settings
      </p>

      <div className="p-6 rounded-3xl border-2 border-border bg-card mb-8">
        {/* Profile photo placeholder */}
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-muted-foreground" />
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-center mb-3">Your Name, 25</h3>

        {/* Intent badge */}
        {intentInfo && (
          <div className="flex justify-center mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              intent === "gym-buddy"
                ? "bg-primary/20 text-primary"
                : "bg-bae/20 text-bae"
            }`}>
              {intentInfo.emoji} {intentInfo.label}
            </span>
          </div>
        )}

        {/* Training styles */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {styles.slice(0, 3).map((style) => (
            <span
              key={style}
              className="px-3 py-1 rounded-full bg-muted text-sm"
            >
              {styleLabels[style]}
            </span>
          ))}
        </div>

        {/* Schedule */}
        <p className="text-center text-muted-foreground mb-4">
          📅 {frequency}x/week • {selectedTimes.join(", ")}
        </p>

        {/* Boundaries */}
        {boundaries.length > 0 && (
          <>
            <div className="border-t border-border my-4" />
            <div className="text-sm">
              <p className="text-muted-foreground mb-2 text-center">My Boundaries:</p>
              <div className="space-y-1">
                {boundaries.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-2 text-success justify-center"
                  >
                    <Check className="w-4 h-4" />
                    <span>{boundaryLabels[b]}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Button variant="spot" size="xl" className="w-full" onClick={onFinish}>
        Looks good!
        <Sparkles className="w-5 h-5" />
      </Button>
    </div>
  );
}
