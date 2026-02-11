import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Clock, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const inviteOptions = [
  { id: "leg-day", icon: "🦵", label: "Leg Day", defaultTime: "Tomorrow, 6pm" },
  { id: "cardio", icon: "🏃", label: "Cardio + Coffee", defaultTime: "This Weekend" },
  { id: "upper", icon: "💪", label: "Need a Spot", defaultTime: "Today, 5pm" },
  { id: "full-body", icon: "🏋️", label: "Full Body", defaultTime: "Tomorrow, 8am" },
  { id: "hiit", icon: "🔥", label: "HIIT Session", defaultTime: "This Evening" },
  { id: "yoga", icon: "🧘", label: "Yoga / Stretch", defaultTime: "Saturday Morning" },
  { id: "outdoor", icon: "⛰️", label: "Outdoor Run", defaultTime: "Sunday, 7am" },
  { id: "sports", icon: "🎾", label: "Play Sports", defaultTime: "This Weekend" },
];

const buddies = [
  { id: 1, name: "Alex", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face", style: "Strength" },
  { id: 2, name: "Jordan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", style: "CrossFit" },
  { id: 3, name: "Sam", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", style: "Powerlifting" },
];

export function CreateInviteSheet() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"activity" | "details">("activity");
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [selectedBuddy, setSelectedBuddy] = useState<number | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSend = () => {
    if (!selectedWorkout || !selectedBuddy) return;
    const buddy = buddies.find((b) => b.id === selectedBuddy);
    const workout = inviteOptions.find((w) => w.id === selectedWorkout);
    toast.success(`Invite sent to ${buddy?.name}!`, {
      description: `${workout?.label} — ${customTime || workout?.defaultTime}${location ? ` at ${location}` : ""}`,
    });
    setOpen(false);
    resetState();
  };

  const resetState = () => {
    setStep("activity");
    setSelectedWorkout(null);
    setSelectedBuddy(null);
    setCustomTime("");
    setLocation("");
  };

  const selectedWorkoutData = inviteOptions.find((w) => w.id === selectedWorkout);

  return (
    <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetState(); }}>
      <SheetTrigger asChild>
        <Button variant="spot" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl pb-safe max-h-[85vh] overflow-y-auto">
        <div className="sheet-handle" />
        <SheetHeader className="mb-5">
          <SheetTitle className="font-display text-xl">
            {step === "activity" ? "What kind of workout?" : "Finalize your invite"}
          </SheetTitle>
        </SheetHeader>

        {step === "activity" ? (
          <div className="space-y-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {inviteOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedWorkout(opt.id);
                    setStep("details");
                  }}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all hover:border-primary/50 group",
                    "border-border bg-muted/30"
                  )}
                >
                  <div className="text-3xl mb-2">{opt.icon}</div>
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {opt.defaultTime}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5 pb-4">
            {/* Selected activity summary */}
            {selectedWorkoutData && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <span className="text-2xl">{selectedWorkoutData.icon}</span>
                <div>
                  <div className="font-semibold text-sm">{selectedWorkoutData.label}</div>
                  <button
                    onClick={() => setStep("activity")}
                    className="text-xs text-primary hover:underline"
                  >
                    Change activity
                  </button>
                </div>
              </div>
            )}

            {/* Time */}
            <div>
              <span className="text-sm font-medium mb-2 block">When?</span>
              <Input
                placeholder={selectedWorkoutData?.defaultTime || "Suggest a time"}
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>

            {/* Location */}
            <div>
              <span className="text-sm font-medium mb-2 block">Where? (optional)</span>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Gold's Gym, the park, etc."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-muted/50 border-border pl-10"
                />
              </div>
            </div>

            {/* Buddy selection */}
            <div>
              <span className="text-sm font-medium mb-3 block">Who do you want to invite?</span>
              <div className="flex gap-3">
                {buddies.map((buddy) => (
                  <button
                    key={buddy.id}
                    onClick={() => setSelectedBuddy(buddy.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all flex-1",
                      selectedBuddy === buddy.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-muted/30"
                    )}
                  >
                    <img src={buddy.avatar} alt={buddy.name} className="w-12 h-12 rounded-full object-cover" />
                    <span className="text-sm font-medium">{buddy.name}</span>
                    <span className="text-[10px] text-muted-foreground">{buddy.style}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="spot"
              size="lg"
              className="w-full"
              onClick={handleSend}
              disabled={!selectedBuddy}
            >
              Send Invite
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
