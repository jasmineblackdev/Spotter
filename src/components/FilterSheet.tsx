import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const trainingStyles = [
  { id: "strength", label: "Strength", icon: "🏋️" },
  { id: "cardio", label: "Cardio", icon: "🏃" },
  { id: "yoga", label: "Yoga", icon: "🧘" },
  { id: "crossfit", label: "CrossFit", icon: "🤸" },
  { id: "boxing", label: "Boxing", icon: "🥊" },
  { id: "swimming", label: "Swimming", icon: "🏊" },
];

const timeSlots = [
  { id: "early-morning", label: "Early Morning", icon: "🌅" },
  { id: "morning", label: "Morning", icon: "☀️" },
  { id: "afternoon", label: "Afternoon", icon: "🌤️" },
  { id: "evening", label: "Evening", icon: "🌆" },
  { id: "night", label: "Night", icon: "🌙" },
];

export function FilterSheet() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [minMatch, setMinMatch] = useState([50]);
  const [open, setOpen] = useState(false);

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleTime = (id: string) => {
    setSelectedTimes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSelectedStyles([]);
    setSelectedTimes([]);
    setMinMatch([50]);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl pb-safe">
        <div className="sheet-handle" />
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-xl">Filters</SheetTitle>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6 pb-4">
          {/* Min match % */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Minimum Match</span>
              <span className="text-sm font-bold text-primary">{minMatch[0]}%</span>
            </div>
            <Slider value={minMatch} onValueChange={setMinMatch} min={30} max={95} step={5} />
          </div>

          {/* Training style */}
          <div>
            <span className="text-sm font-medium mb-3 block">Training Style</span>
            <div className="flex flex-wrap gap-2">
              {trainingStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 border transition-all",
                    selectedStyles.includes(style.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/50 text-muted-foreground"
                  )}
                >
                  <span>{style.icon}</span>
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred times */}
          <div>
            <span className="text-sm font-medium mb-3 block">Preferred Times</span>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time.id}
                  onClick={() => toggleTime(time.id)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 border transition-all",
                    selectedTimes.includes(time.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/50 text-muted-foreground"
                  )}
                >
                  <span>{time.icon}</span>
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          <Button variant="spot" size="lg" className="w-full" onClick={() => setOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
