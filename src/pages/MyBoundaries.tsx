import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, MessageCircle, Dumbbell, AlertTriangle, Bell } from "lucide-react";
import { toast } from "sonner";

interface BoundarySetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function MyBoundaries() {
  const navigate = useNavigate();

  const [coreBoundaries, setCoreBoundaries] = useState<BoundarySetting[]>([
    { id: "no-body-comments", label: "No body comments", description: "Keep feedback focused on technique and form", enabled: true },
    { id: "supportive-only", label: "Supportive feedback only", description: "Encouragement > criticism", enabled: true },
    { id: "taking-slow", label: "I prefer taking things slow", description: "Building trust takes time", enabled: true },
  ]);

  const [commBoundaries, setCommBoundaries] = useState<BoundarySetting[]>([
    { id: "matched-only", label: "Only matched users can message me", description: "Prevent messages from non-matches", enabled: true },
    { id: "invite-approval", label: "Workout invites require my approval", description: "Review before accepting any invite", enabled: true },
    { id: "remind-matches", label: "Remind matches of my boundaries", description: "Show boundaries on your profile card", enabled: true },
  ]);

  const toggleBoundary = (list: BoundarySetting[], setList: React.Dispatch<React.SetStateAction<BoundarySetting[]>>, id: string) => {
    setList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b))
    );
  };

  const handleSave = () => {
    toast.success("Boundaries updated!");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="px-4 pt-safe pb-3 flex items-center gap-3 bg-card/95 backdrop-blur-lg border-b border-border/50">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate("/profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-display text-xl font-bold flex-1">My Boundaries</h1>
        <Button variant="spot" size="sm" onClick={handleSave}>Save</Button>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Safety banner */}
        <div className="bg-success/10 border border-success/30 rounded-2xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-success mt-0.5" />
          <div>
            <div className="font-semibold text-sm">Your safety matters</div>
            <p className="text-xs text-muted-foreground mt-1">
              Your matches will see these preferences on your profile. We recommend keeping them active.
            </p>
          </div>
        </div>

        {/* Core boundaries */}
        <section>
          <h2 className="micro mb-4">🛡️ Core Boundaries</h2>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            {coreBoundaries.map((boundary, i) => (
              <div
                key={boundary.id}
                className="flex items-center gap-3 p-4 border-b border-border/50 last:border-0"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{boundary.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{boundary.description}</div>
                </div>
                <Switch
                  checked={boundary.enabled}
                  onCheckedChange={() => toggleBoundary(coreBoundaries, setCoreBoundaries, boundary.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Communication */}
        <section>
          <h2 className="micro mb-4">💬 Communication</h2>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            {commBoundaries.map((boundary) => (
              <div
                key={boundary.id}
                className="flex items-center gap-3 p-4 border-b border-border/50 last:border-0"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{boundary.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{boundary.description}</div>
                </div>
                <Switch
                  checked={boundary.enabled}
                  onCheckedChange={() => toggleBoundary(commBoundaries, setCommBoundaries, boundary.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Block/Report */}
        <section>
          <h2 className="micro mb-4">⚠️ Safety Actions</h2>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 border-b border-border/50 hover:bg-muted/50 transition-colors">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium flex-1 text-left">Block & Report a User</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium flex-1 text-left">Manage Notifications</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
