import { useState } from "react";
import { Header } from "@/components/Header";
import { MatchCard } from "@/components/MatchCard";
import { Button } from "@/components/ui/button";
import { FilterSheet } from "@/components/FilterSheet";
import { toast } from "sonner";

const mockMatches = [
  {
    id: 1,
    name: "Alex",
    age: 28,
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=face",
    matchPercent: 85,
    trainingStyle: "Strength Training",
    frequency: "4x/week",
    times: "Evenings",
    intent: "open-dating" as const,
    bio: "Currently working on progressive overload. Looking for a consistent spot partner!",
  },
  {
    id: 2,
    name: "Jordan",
    age: 25,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    matchPercent: 92,
    trainingStyle: "CrossFit & HIIT",
    frequency: "5x/week",
    times: "Mornings",
    intent: "gym-buddy" as const,
    bio: "Early bird catches the gains! Love high-intensity sessions.",
  },
  {
    id: 3,
    name: "Sam",
    age: 31,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    matchPercent: 78,
    trainingStyle: "Powerlifting",
    frequency: "3x/week",
    times: "Afternoons",
    intent: "gym-to-bae" as const,
    bio: "Training for my first competition. Need a reliable spotter for heavy days.",
  },
];

export default function SpotFeed() {
  const [matches, setMatches] = useState(mockMatches);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSpot = () => {
    toast.success(`Spot request sent to ${matches[currentIndex].name}!`, {
      description: "They'll be notified about your interest.",
    });
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="Find Your Spot"
        subtitle="Gym buddies matched to your vibe"
        action={<FilterSheet />}
      />

      <div className="px-4 space-y-4">
        {currentIndex < matches.length ? (
          <MatchCard
            key={matches[currentIndex].id}
            {...matches[currentIndex]}
            onSpot={handleSpot}
            onPass={handlePass}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No more matches for now</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setCurrentIndex(0)}
            >
              Start Over
            </Button>
          </div>
        )}
        
        {/* Preview next cards */}
        {matches.slice(currentIndex + 1, currentIndex + 3).map((match, i) => (
          <div 
            key={match.id}
            className="opacity-30 scale-95 pointer-events-none"
            style={{ transform: `scale(${0.95 - i * 0.02})` }}
          >
            <MatchCard {...match} />
          </div>
        ))}
      </div>
    </div>
  );
}
