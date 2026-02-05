import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin, Home, Globe } from "lucide-react";
import { useState } from "react";

interface GymPreferenceStepProps {
  onNext: () => void;
  onSkip: () => void;
}

const nearbyGyms = [
  { id: "planet-fitness", name: "Planet Fitness - Uptown", distance: "0.5 miles away" },
  { id: "24-hour", name: "24 Hour Fitness - Downtown", distance: "1.2 miles away" },
];

export function GymPreferenceStep({ onNext, onSkip }: GymPreferenceStepProps) {
  const [selectedGym, setSelectedGym] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="animate-fade-in-scale">
      <h2 className="font-display text-2xl font-bold mb-2 text-center">
        Where do you usually train?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Optional — helps find nearby matches
      </p>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for your gym..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pl-12 rounded-2xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-3 mb-4">
        {nearbyGyms.map((gym) => (
          <button
            key={gym.id}
            onClick={() => setSelectedGym(gym.id)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
              selectedGym === gym.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <MapPin className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <div className="font-medium">{gym.name}</div>
              <div className="text-sm text-muted-foreground">{gym.distance}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-3 mb-8">
        <button
          onClick={() => setSelectedGym("home")}
          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
            selectedGym === "home"
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <Home className="w-5 h-5 text-muted-foreground" />
          <div className="font-medium">I train at home</div>
        </button>

        <button
          onClick={() => setSelectedGym("flexible")}
          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
            selectedGym === "flexible"
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <Globe className="w-5 h-5 text-muted-foreground" />
          <div className="font-medium">I'm flexible / multiple gyms</div>
        </button>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" size="xl" className="flex-1" onClick={onSkip}>
          Skip
        </Button>
        <Button variant="spot" size="xl" className="flex-1" onClick={onNext}>
          Continue
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
