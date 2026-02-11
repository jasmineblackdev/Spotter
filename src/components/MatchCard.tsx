import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Calendar, Heart, X, Target, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  name: string;
  age: number;
  photo: string;
  matchPercent: number;
  trainingStyle: string;
  frequency: string;
  times: string;
  intent: "gym-buddy" | "open-dating" | "gym-to-bae";
  bio: string;
  goals?: string[];
  onSpot?: () => void;
  onPass?: () => void;
}

export function MatchCard({
  name,
  age,
  photo,
  matchPercent,
  trainingStyle,
  frequency,
  times,
  intent,
  bio,
  goals = [],
  onSpot,
  onPass,
}: MatchCardProps) {
  const intentLabel = {
    "gym-buddy": "Gym Buddy",
    "open-dating": "Open to Dating",
    "gym-to-bae": "Gym → Bae",
  };

  const intentVariant = {
    "gym-buddy": "gymBuddy",
    "open-dating": "openToDating",
    "gym-to-bae": "gymToBae",
  } as const;

  return (
    <div className="bg-card rounded-3xl overflow-hidden card-interactive border border-border/50">
      {/* Stats hero section — fitness data ABOVE the photo */}
      <div className="p-5 pb-4">
        {/* Match score + intent row */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="match" className="text-sm px-3 py-1.5">
            <Target className="w-3.5 h-3.5" />
            {matchPercent}% Spot Match
          </Badge>
          <Badge variant={intentVariant[intent]}>
            {intent === "open-dating" && <Heart className="w-3 h-3" />}
            {intentLabel[intent]}
          </Badge>
        </div>

        {/* Training stats grid — the hero data */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-muted/60 rounded-2xl p-3 text-center">
            <Dumbbell className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Style</div>
            <div className="text-sm font-semibold mt-0.5 leading-tight">{trainingStyle}</div>
          </div>
          <div className="bg-muted/60 rounded-2xl p-3 text-center">
            <Flame className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Frequency</div>
            <div className="text-sm font-semibold mt-0.5">{frequency}</div>
          </div>
          <div className="bg-muted/60 rounded-2xl p-3 text-center">
            <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Trains</div>
            <div className="text-sm font-semibold mt-0.5">{times}</div>
          </div>
        </div>

        {/* Training goals if available */}
        {goals.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {goals.map((goal) => (
              <Badge key={goal} variant="training" className="text-xs">
                {goal}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Profile section — photo + identity BELOW stats */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-14 h-14 rounded-full p-0.5 shrink-0"
            style={{
              background: `conic-gradient(hsl(var(--primary)) ${matchPercent}%, hsl(var(--muted)) 0%)`,
            }}
          >
            <img
              src={photo}
              alt={name}
              className="w-full h-full rounded-full object-cover border-2 border-card"
            />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">
              {name}, {age}
            </h3>
            <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-2">
              "{bio}"
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 px-5 pb-5">
        <Button
          variant="pass"
          size="lg"
          className="flex-1"
          onClick={onPass}
        >
          <X className="w-5 h-5" />
          Pass
        </Button>
        <Button
          variant="spot"
          size="lg"
          className="flex-1"
          onClick={onSpot}
        >
          <Dumbbell className="w-5 h-5" />
          Request Spot
        </Button>
      </div>
    </div>
  );
}
