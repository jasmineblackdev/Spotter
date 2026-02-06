import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const trainingStyles = [
  { id: "strength", label: "Strength", icon: "🏋️" },
  { id: "cardio", label: "Cardio", icon: "🏃" },
  { id: "yoga", label: "Yoga", icon: "🧘" },
  { id: "crossfit", label: "CrossFit", icon: "🤸" },
  { id: "boxing", label: "Boxing", icon: "🥊" },
  { id: "hiit", label: "HIIT", icon: "🔥" },
  { id: "swimming", label: "Swimming", icon: "🏊" },
  { id: "cycling", label: "Cycling", icon: "🚴" },
];

const intents = [
  { id: "gym-buddy", label: "Gym Buddy Only", icon: "🏋️" },
  { id: "gym-to-bae", label: "Gym → Bae", icon: "🧡" },
  { id: "open-dating", label: "Open to Dating", icon: "💕" },
];

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("You");
  const [age, setAge] = useState("26");
  const [bio, setBio] = useState("Building strength, one rep at a time. Looking for a consistent training partner!");
  const [selectedStyles, setSelectedStyles] = useState(["strength", "hiit"]);
  const [selectedIntent, setSelectedIntent] = useState("gym-to-bae");
  const [frequency, setFrequency] = useState("4");
  const [times, setTimes] = useState("Evenings");
  const [gym, setGym] = useState("Equinox Downtown");

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    toast.success("Profile updated!");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="px-4 pt-safe pb-3 flex items-center gap-3 bg-card/95 backdrop-blur-lg border-b border-border/50">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate("/profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-display text-xl font-bold flex-1">Edit Profile</h1>
        <Button variant="spot" size="sm" onClick={handleSave}>Save</Button>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Photo */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/30"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Basic info */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-muted/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Age</label>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="bg-muted/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Bio</label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} className="bg-muted/50 border-border min-h-[80px]" />
          </div>
        </div>

        {/* Intent */}
        <div>
          <label className="text-sm font-medium mb-3 block">What brings you here?</label>
          <div className="space-y-2">
            {intents.map((intent) => (
              <button
                key={intent.id}
                onClick={() => setSelectedIntent(intent.id)}
                className={cn(
                  "w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all",
                  selectedIntent === intent.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/30"
                )}
              >
                <span className="text-xl">{intent.icon}</span>
                <span className="font-medium text-sm">{intent.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Training styles */}
        <div>
          <label className="text-sm font-medium mb-3 block">Training Styles</label>
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

        {/* Schedule */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Weekly Frequency</label>
            <Input value={`${frequency}x/week`} onChange={(e) => setFrequency(e.target.value.replace(/[^0-9]/g, ""))} className="bg-muted/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Preferred Times</label>
            <Input value={times} onChange={(e) => setTimes(e.target.value)} className="bg-muted/50 border-border" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Home Gym</label>
            <Input value={gym} onChange={(e) => setGym(e.target.value)} className="bg-muted/50 border-border" />
          </div>
        </div>
      </div>
    </div>
  );
}
