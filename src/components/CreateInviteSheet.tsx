import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const inviteOptions = [
  { id: "leg-day", icon: "🦵", label: "Leg Day", defaultTime: "Tomorrow, 6pm" },
  { id: "cardio", icon: "🏃", label: "Cardio + Coffee", defaultTime: "This Weekend" },
  { id: "upper", icon: "💪", label: "Need a Spot", defaultTime: "Today, 5pm" },
  { id: "full-body", icon: "🏋️", label: "Full Body", defaultTime: "Tomorrow, 8am" },
  { id: "hiit", icon: "🔥", label: "HIIT Session", defaultTime: "This Evening" },
  { id: "yoga", icon: "🧘", label: "Yoga / Stretch", defaultTime: "Saturday Morning" },
];

const buddies = [
  { id: 1, name: "Alex", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face" },
  { id: 2, name: "Jordan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 3, name: "Sam", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
];

export function CreateInviteSheet() {
  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [selectedBuddy, setSelectedBuddy] = useState<number | null>(null);
  const [customTime, setCustomTime] = useState("");

  const handleSend = () => {
    if (!selectedWorkout || !selectedBuddy) return;
    const buddy = buddies.find((b) => b.id === selectedBuddy);
    const workout = inviteOptions.find((w) => w.id === selectedWorkout);
    toast.success(`Invite sent to ${buddy?.name}!`, {
      description: `${workout?.label} — ${customTime || workout?.defaultTime}`,
    });
    setOpen(false);
    setSelectedWorkout(null);
    setSelectedBuddy(null);
    setCustomTime("");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="spot" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl pb-safe max-h-[85vh] overflow-y-auto">
        <div className="sheet-handle" />
        <SheetHeader className="mb-5">
          <SheetTitle className="font-display text-xl">Create Workout Invite</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 pb-4">
          {/* Workout type */}
          <div>
            <span className="text-sm font-medium mb-3 block">What kind of workout?</span>
            <div className="grid grid-cols-2 gap-2">
              {inviteOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedWorkout(opt.id)}
                  className={cn(
                    "p-3 rounded-2xl border text-left transition-all",
                    selectedWorkout === opt.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30"
                  )}
                >
                  <div className="text-2xl mb-1">{opt.icon}</div>
                  <div className="font-medium text-sm">{opt.label}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {opt.defaultTime}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom time */}
          {selectedWorkout && (
            <div>
              <span className="text-sm font-medium mb-2 block">Suggest a time (optional)</span>
              <Input
                placeholder={inviteOptions.find((w) => w.id === selectedWorkout)?.defaultTime}
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>
          )}

          {/* Buddy selection */}
          {selectedWorkout && (
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
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            variant="spot"
            size="lg"
            className="w-full"
            onClick={handleSend}
            disabled={!selectedWorkout || !selectedBuddy}
          >
            Send Invite
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
