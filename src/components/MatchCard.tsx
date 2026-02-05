import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Calendar, Heart, X, Target } from "lucide-react";
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
    <div className="bg-card rounded-3xl p-5 card-interactive border border-border/50">
      {/* Header with photo and match score */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-full p-0.5"
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
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">
              {name}, {age}
            </h3>
            <Badge variant="match" className="text-sm">
              <Target className="w-3 h-3" />
              {matchPercent}% Match
            </Badge>
          </div>
          <Badge variant={intentVariant[intent]} className="mt-1">
            {intent === "open-dating" && <Heart className="w-3 h-3" />}
            {intentLabel[intent]}
          </Badge>
        </div>
      </div>

      {/* Stats grid */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Dumbbell className="w-4 h-4 text-primary" />
          <span>{trainingStyle}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{frequency}, {times}</span>
        </div>
      </div>

      {/* Bio quote */}
      <p className="text-sm text-foreground/80 italic mb-5 leading-relaxed">
        "{bio}"
      </p>

      {/* Action buttons */}
      <div className="flex gap-3">
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
