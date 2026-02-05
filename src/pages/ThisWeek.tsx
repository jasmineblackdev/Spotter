import { Header } from "@/components/Header";
import { WorkoutInviteCard } from "@/components/WorkoutInviteCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Dumbbell, PersonStanding } from "lucide-react";
import { toast } from "sonner";

const pendingInvites = [
  {
    id: 1,
    from: "Alex",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face",
    workoutType: "Leg Day",
    workoutIcon: "🦵",
    dateTime: "Tomorrow 6pm",
  },
  {
    id: 2,
    from: "Jordan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    workoutType: "Morning Cardio",
    workoutIcon: "🏃",
    dateTime: "Sat 8am",
  },
];

const confirmedSessions = [
  {
    id: 3,
    from: "Sam",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    workoutType: "Upper Body",
    workoutIcon: "💪",
    dateTime: "Today 5pm",
    location: "Gold's Gym Downtown",
  },
];

const nearbyTraining = [
  {
    id: 4,
    name: "Taylor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    time: "Today 6-8pm",
    note: "Need a spot for bench",
  },
];

export default function ThisWeek() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="This Week"
        action={
          <Button variant="spot" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
        }
      />

      <div className="px-4 space-y-6">
        {/* Date display */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>📍 Today, {today}</span>
        </div>

        {/* Pending invites */}
        <section>
          <h2 className="micro mb-3">⏰ Pending Invites ({pendingInvites.length})</h2>
          <div className="space-y-3">
            {pendingInvites.map((invite) => (
              <WorkoutInviteCard
                key={invite.id}
                type="pending"
                {...invite}
                onAccept={() => toast.success(`Accepted workout with ${invite.from}!`)}
                onDecline={() => toast.info(`Declined workout with ${invite.from}`)}
              />
            ))}
          </div>
        </section>

        {/* Confirmed sessions */}
        <section>
          <h2 className="micro mb-3">✅ Confirmed Sessions ({confirmedSessions.length})</h2>
          <div className="space-y-3">
            {confirmedSessions.map((session) => (
              <WorkoutInviteCard
                key={session.id}
                type="confirmed"
                {...session}
                onMessage={() => toast.info(`Opening chat with ${session.from}`)}
              />
            ))}
          </div>
        </section>

        {/* Who's training nearby */}
        <section>
          <h2 className="micro mb-3">👀 Who's Training Nearby</h2>
          <div className="space-y-3">
            {nearbyTraining.map((person) => (
              <div 
                key={person.id}
                className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-3"
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{person.name}</div>
                  <div className="text-sm text-muted-foreground">{person.time}</div>
                  <div className="text-sm text-primary mt-1">"{person.note}"</div>
                </div>
                <Button variant="outline" size="sm">
                  Offer to Join
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
