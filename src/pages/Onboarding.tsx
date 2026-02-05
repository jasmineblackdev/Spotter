import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { IntentStep } from "@/components/onboarding/IntentStep";
import { TrainingStyleStep } from "@/components/onboarding/TrainingStyleStep";
import { FrequencyStep } from "@/components/onboarding/FrequencyStep";
import { WorkoutTimesStep } from "@/components/onboarding/WorkoutTimesStep";
import { GymPreferenceStep } from "@/components/onboarding/GymPreferenceStep";
import { BoundariesStep } from "@/components/onboarding/BoundariesStep";
import { PhotosStep } from "@/components/onboarding/PhotosStep";
import { ProfilePreviewStep } from "@/components/onboarding/ProfilePreviewStep";

const steps = [
  "welcome",
  "intent",
  "training-style",
  "frequency",
  "workout-times",
  "gym-preference",
  "boundaries",
  "photos",
  "preview",
] as const;

type Step = typeof steps[number];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [selectedIntent, setSelectedIntent] = useState<string | null>("gym-to-bae"); // Default recommended
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [frequency, setFrequency] = useState(4);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedBoundaries, setSelectedBoundaries] = useState<string[]>([
    "no-body-comments",
    "supportive-feedback",
    "take-slow",
  ]); // All ON by default

  const stepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length - 1; // Exclude welcome from count
  const progressStepIndex = Math.max(0, stepIndex - 1); // Start counting after welcome
  const progress = stepIndex > 0 ? ((progressStepIndex + 1) / (totalSteps)) * 100 : 0;

  const nextStep = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const toggleBoundary = (id: string) => {
    setSelectedBoundaries((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const finishOnboarding = () => {
    navigate("/");
  };

  const showHeader = currentStep !== "welcome";
  const stepNumber = progressStepIndex + 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button and progress */}
      {showHeader && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevStep}
              className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-muted-foreground">
              {stepNumber} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto">
        {currentStep === "welcome" && <WelcomeStep onNext={nextStep} />}

        {currentStep === "intent" && (
          <IntentStep
            selectedIntent={selectedIntent}
            onSelectIntent={setSelectedIntent}
            onNext={nextStep}
          />
        )}

        {currentStep === "training-style" && (
          <TrainingStyleStep
            selectedStyles={selectedStyles}
            onToggleStyle={toggleStyle}
            onNext={nextStep}
          />
        )}

        {currentStep === "frequency" && (
          <FrequencyStep
            frequency={frequency}
            onFrequencyChange={setFrequency}
            onNext={nextStep}
          />
        )}

        {currentStep === "workout-times" && (
          <WorkoutTimesStep
            selectedTimes={selectedTimes}
            onToggleTime={toggleTime}
            onNext={nextStep}
          />
        )}

        {currentStep === "gym-preference" && (
          <GymPreferenceStep onNext={nextStep} onSkip={nextStep} />
        )}

        {currentStep === "boundaries" && (
          <BoundariesStep
            selectedBoundaries={selectedBoundaries}
            onToggleBoundary={toggleBoundary}
            onNext={nextStep}
          />
        )}

        {currentStep === "photos" && (
          <PhotosStep onNext={nextStep} onSkip={nextStep} />
        )}

        {currentStep === "preview" && (
          <ProfilePreviewStep
            intent={selectedIntent}
            styles={selectedStyles}
            frequency={frequency}
            times={selectedTimes}
            boundaries={selectedBoundaries}
            onFinish={finishOnboarding}
          />
        )}
      </div>
    </div>
  );
}
