import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Send, MoreVertical, Dumbbell } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const chatData: Record<string, { name: string; avatar: string; messages: { id: number; text: string; fromMe: boolean; time: string; isInvite?: boolean }[] }> = {
  "1": {
    name: "Alex",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face",
    messages: [
      { id: 1, text: "Hey! Excited to train together 💪", fromMe: false, time: "10:30 AM" },
      { id: 2, text: "Same! What's your split looking like this week?", fromMe: true, time: "10:32 AM" },
      { id: 3, text: "Push/Pull/Legs. Want to hit legs tomorrow?", fromMe: false, time: "10:33 AM" },
      { id: 4, text: "Absolutely! I've been slacking on legs 😅", fromMe: true, time: "10:35 AM" },
      { id: 5, text: "Ready for leg day tomorrow?", fromMe: false, time: "11:00 AM" },
    ],
  },
  "2": {
    name: "Sam",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    messages: [
      { id: 1, text: "That bench PR was insane! 🎉", fromMe: false, time: "3:00 PM" },
      { id: 2, text: "Couldn't have done it without the spot. Thanks!", fromMe: true, time: "3:05 PM" },
      { id: 3, text: "Great session today! 💪", fromMe: false, time: "4:30 PM" },
    ],
  },
  "3": {
    name: "Jordan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    messages: [
      { id: 1, text: "Early bird gets the gains! 🌅", fromMe: false, time: "6:00 AM" },
      { id: 2, text: "I'll be there at 6:30 sharp!", fromMe: true, time: "6:05 AM" },
      { id: 3, text: "See you Saturday morning!", fromMe: false, time: "8:00 AM" },
    ],
  },
  "4": {
    name: "Taylor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    messages: [
      { id: 1, text: "Hey! Nice to match with you 😊", fromMe: false, time: "2:00 PM" },
      { id: 2, text: "Hey Taylor! Love your training style", fromMe: true, time: "2:10 PM" },
      { id: 3, text: "Coffee after workout? ☕️", fromMe: false, time: "2:15 PM" },
    ],
  },
};

const activityInvites = [
  { icon: "🦵", label: "Leg Day", time: "Tomorrow, 6pm" },
  { icon: "🏃", label: "Cardio + Coffee", time: "This Weekend" },
  { icon: "💪", label: "Need a Spotter", time: "Today, 5pm" },
  { icon: "🏋️", label: "Full Body", time: "Tomorrow, 8am" },
  { icon: "🔥", label: "HIIT Session", time: "This Evening" },
  { icon: "🧘", label: "Yoga / Stretch", time: "Saturday AM" },
];

export default function ChatConversation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(chatData[id || "1"]?.messages || []);
  const [showInvites, setShowInvites] = useState(false);

  const chat = chatData[id || "1"];
  if (!chat) return null;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: newMessage, fromMe: true, time: "Now" },
    ]);
    setNewMessage("");
  };

  const handleQuickInvite = (invite: typeof activityInvites[0]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `${invite.icon} ${invite.label}\n📅 ${invite.time}`,
        fromMe: true,
        time: "Now",
        isInvite: true,
      },
    ]);
    setShowInvites(false);
    toast.success("Workout invite sent!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 pt-safe pb-3 bg-card/95 backdrop-blur-lg border-b border-border/50 flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate("/chats")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <img src={chat.avatar} alt={chat.name} className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1">
          <div className="font-display font-semibold">{chat.name}</div>
          <div className="text-xs text-muted-foreground">Active now</div>
        </div>
        <Button variant="ghost" size="icon-sm">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.fromMe ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line",
                msg.isInvite
                  ? "bg-primary/15 border border-primary/30 text-foreground rounded-br-md"
                  : msg.fromMe
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border/50 text-foreground rounded-bl-md"
              )}
            >
              {msg.isInvite && (
                <div className="flex items-center gap-1.5 mb-1">
                  <Dumbbell className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">Workout Invite</span>
                </div>
              )}
              {msg.text}
              <div className={cn(
                "text-[10px] mt-1",
                msg.isInvite ? "text-muted-foreground" : msg.fromMe ? "text-primary-foreground/60" : "text-muted-foreground"
              )}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Invite Sheet */}
      <Sheet open={showInvites} onOpenChange={setShowInvites}>
        <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl pb-safe">
          <div className="sheet-handle" />
          <SheetHeader className="mb-4">
            <SheetTitle className="font-display text-lg">Invite to Workout</SheetTitle>
          </SheetHeader>
          <p className="text-sm text-muted-foreground mb-4">
            Pick an activity — {chat.name} will get a one-tap invite
          </p>
          <div className="grid grid-cols-2 gap-2 pb-4">
            {activityInvites.map((invite) => (
              <button
                key={invite.label}
                onClick={() => handleQuickInvite(invite)}
                className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-muted/30 hover:bg-primary/10 hover:border-primary/30 transition-all text-left"
              >
                <span className="text-2xl">{invite.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{invite.label}</div>
                  <div className="text-xs text-muted-foreground">{invite.time}</div>
                </div>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Input bar */}
      <div className="px-4 py-3 bg-card/95 backdrop-blur-lg border-t border-border/50 pb-safe">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" onClick={() => setShowInvites(true)}>
            <Dumbbell className="w-5 h-5 text-primary" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-muted/50 border-border rounded-full"
          />
          <Button variant="spot" size="icon-sm" onClick={handleSend} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
