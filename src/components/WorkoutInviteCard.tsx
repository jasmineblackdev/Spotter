import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Dumbbell, PersonStanding } from "lucide-react";

interface WorkoutInviteCardProps {
  type: "pending" | "confirmed";
  from: string;
  avatar: string;
  workoutType: string;
  workoutIcon: React.ReactNode;
  dateTime: string;
  location?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onMessage?: () => void;
  onDirections?: () => void;
}

export function WorkoutInviteCard({
  type,
  from,
  avatar,
  workoutType,
  workoutIcon,
  dateTime,
  location,
  onAccept,
  onDecline,
  onMessage,
  onDirections,
}: WorkoutInviteCardProps) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border/50 card-interactive">
      <div className="flex items-start gap-3">
        <img
          src={avatar}
          alt={from}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{workoutIcon}</span>
            <span className="text-sm font-medium text-muted-foreground">
              {type === "pending" ? "From" : "With"} {from}
            </span>
          </div>
          <h4 className="font-semibold text-foreground mb-2">{workoutType}</h4>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{dateTime}</span>
            </div>
            {location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions based on type */}
      <div className="flex gap-2 mt-4">
        {type === "pending" ? (
          <>
            <Button variant="secondary" size="sm" className="flex-1" onClick={onDecline}>
              Decline
            </Button>
            <Button variant="spot" size="sm" className="flex-1" onClick={onAccept}>
              Accept
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" size="sm" className="flex-1" onClick={onMessage}>
              Message {from}
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={onDirections}>
              Get Directions
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
