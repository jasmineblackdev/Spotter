import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Check,
  Sun,
  Sunset,
  Moon,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  "welcome",
  "intent",
  "training-style",
  "schedule",
  "boundaries",
  "complete"
] as const;

type Step = typeof steps[number];

const trainingStyles = [
  { id: "strength", label: "Strength Training", icon: "🏋️" },
  { id: "hiit", label: "HIIT", icon: "⚡" },
  { id: "crossfit", label: "CrossFit", icon: "🔥" },
  { id: "cardio", label: "Cardio", icon: "🏃" },
  { id: "yoga", label: "Yoga & Mobility", icon: "🧘" },
  { id: "powerlifting", label: "Powerlifting", icon: "💪" },
];

const boundaries = [
  { id: "no-body-comments", label: "No body comments" },
  { id: "supportive-feedback", label: "Supportive feedback only" },
  { id: "take-slow", label: "I prefer taking things slow" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [frequency, setFrequency] = useState(4);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedBoundaries, setSelectedBoundaries] = useState<string[]>([]);

  const stepIndex = steps.indexOf(currentStep);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleTime = (time: string) => {
    setSelectedTimes(prev =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const toggleBoundary = (id: string) => {
    setSelectedBoundaries(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const finishOnboarding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      {currentStep !== "welcome" && currentStep !== "complete" && (
        <div className="p-4">
          <Progress value={progress} className="h-1" />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Welcome */}
        {currentStep === "welcome" && (
          <div className="text-center animate-fade-in-scale">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Dumbbell className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">
              Welcome to <span className="text-gradient-primary">Spotter</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              From gym buddy to bae
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
              Find your perfect workout partner. Train together. Maybe more.
            </p>
            <Button variant="spot" size="xl" onClick={nextStep}>
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Intent Selection */}
        {currentStep === "intent" && (
          <div className="animate-fade-in-scale">
            <h2 className="font-display text-2xl font-bold mb-2 text-center">
              What are you looking for?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              You can change this anytime
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedIntent("gym-buddy")}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedIntent === "gym-buddy" 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">Gym Buddy Only</div>
                    <div className="text-sm text-muted-foreground">Just here to train</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedIntent("open-dating")}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedIntent === "open-dating" 
                    ? "border-bae bg-bae/10" 
                    : "border-border hover:border-bae/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-bae" />
                  <div>
                    <div className="font-semibold">Open to Dating</div>
                    <div className="text-sm text-muted-foreground">Gym buddies welcome too</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedIntent("gym-to-bae")}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedIntent === "gym-to-bae" 
                    ? "border-primary bg-gradient-to-r from-primary/10 to-bae/10" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      Gym Buddy → Bae
                      <Badge variant="match" className="text-xs">Recommended</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Start as buddies, see what happens</div>
                  </div>
                </div>
              </button>
            </div>

            <Button 
              variant="spot" 
              size="xl" 
              className="w-full mt-8"
              onClick={nextStep}
              disabled={!selectedIntent}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Training Style */}
        {currentStep === "training-style" && (
          <div className="animate-fade-in-scale">
            <h2 className="font-display text-2xl font-bold mb-2 text-center">
              How do you train?
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Select all that apply
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {trainingStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    selectedStyles.includes(style.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <div className="text-sm font-medium">{style.label}</div>
                </button>
              ))}
            </div>

            {/* Frequency slider */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-4">
                Weekly frequency: <span className="text-primary">{frequency}x/week</span>
              </label>
              <input
                type="range"
                min="2"
                max="7"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>2x</span>
                <span>7x</span>
              </div>
            </div>

            {/* Time preferences */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Typical times</label>
              <div className="flex gap-2">
                {[
                  { id: "morning", icon: Sun, label: "AM" },
                  { id: "afternoon", icon: Sunset, label: "PM" },
                  { id: "evening", icon: Moon, label: "Eve" },
                  { id: "flexible", icon: Zap, label: "Flex" },
                ].map((time) => (
                  <button
                    key={time.id}
                    onClick={() => toggleTime(time.id)}
                    className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
                      selectedTimes.includes(time.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <time.icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-xs font-medium">{time.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              variant="spot" 
              size="xl" 
              className="w-full"
              onClick={nextStep}
              disabled={selectedStyles.length === 0}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Schedule placeholder - simplified */}
        {currentStep === "schedule" && (
          <div className="animate-fade-in-scale text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Dumbbell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">
              Where do you train?
            </h2>
            <p className="text-muted-foreground mb-8">
              Optional — helps find nearby buddies
            </p>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Search gym or location..."
                className="w-full p-4 rounded-2xl bg-muted border border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button variant="ghost" onClick={nextStep} className="text-muted-foreground">
                Skip for now
              </Button>
            </div>

            <Button 
              variant="spot" 
              size="xl" 
              className="w-full mt-4"
              onClick={nextStep}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Boundaries */}
        {currentStep === "boundaries" && (
          <div className="animate-fade-in-scale">
            <h2 className="font-display text-2xl font-bold mb-2 text-center">
              Set Your Boundaries
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Your comfort, your rules. Matches will respect these.
            </p>

            <div className="space-y-3 mb-8">
              {boundaries.map((boundary) => (
                <button
                  key={boundary.id}
                  onClick={() => toggleBoundary(boundary.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                    selectedBoundaries.includes(boundary.id)
                      ? "border-success bg-success/10"
                      : "border-border hover:border-success/50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedBoundaries.includes(boundary.id)
                      ? "bg-success text-success-foreground"
                      : "bg-muted"
                  }`}>
                    {selectedBoundaries.includes(boundary.id) && (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                  <span className="font-medium">{boundary.label}</span>
                </button>
              ))}
            </div>

            <Button 
              variant="spot" 
              size="xl" 
              className="w-full"
              onClick={nextStep}
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Complete */}
        {currentStep === "complete" && (
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
            <Button variant="spot" size="xl" onClick={finishOnboarding}>
              Start Matching
              <Sparkles className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
