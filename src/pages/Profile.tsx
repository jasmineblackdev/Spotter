import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Edit3, 
  Shield, 
  Dumbbell, 
  Calendar, 
  Clock, 
  MapPin,
  Heart,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const userProfile = {
  name: "You",
  age: 26,
  photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  intent: "gym-to-bae" as const,
  trainingStyles: ["Strength Training", "HIIT"],
  frequency: "4x/week",
  times: "Evenings",
  gym: "Equinox Downtown",
  boundaries: ["No body comments", "Supportive feedback only"],
  bio: "Building strength, one rep at a time. Looking for a consistent training partner!",
  baeModeUnlocks: 1,
  totalWorkouts: 8,
};

const menuItems = [
  { icon: Edit3, label: "Edit Profile", path: "/profile/edit" },
  { icon: Shield, label: "My Boundaries", path: "/profile/boundaries" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="Profile"
        action={
          <Link to="/settings">
            <Button variant="ghost" size="icon-sm">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        }
      />

      <div className="px-4 space-y-6">
        {/* Profile header */}
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={userProfile.photo}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/30"
            />
            <Link to="/profile/edit" className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-primary-foreground" />
            </Link>
          </div>
          
          <h2 className="font-display text-2xl font-bold mt-4">
            {userProfile.name}, {userProfile.age}
          </h2>
          
          <Badge variant="gymToBae" className="mt-2">
            <Heart className="w-3 h-3" />
            Gym → Bae
          </Badge>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
            <div className="text-2xl font-bold text-primary">{userProfile.totalWorkouts}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Workouts</div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
            <div className="text-2xl font-bold text-bae">{userProfile.baeModeUnlocks}</div>
            <div className="text-xs text-muted-foreground mt-1">Bae Unlocks</div>
          </div>
        </div>

        {/* Training info */}
        <div className="bg-card rounded-2xl p-5 border border-border/50 space-y-4">
          <h3 className="font-semibold">Training Profile</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-5 h-5 text-primary" />
              <div className="flex flex-wrap gap-2">
                {userProfile.trainingStyles.map((style) => (
                  <Badge key={style} variant="training">{style}</Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{userProfile.frequency}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{userProfile.times}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{userProfile.gym}</span>
            </div>
          </div>
        </div>

        {/* Boundaries */}
        <div className="bg-card rounded-2xl p-5 border border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-success" />
            <h3 className="font-semibold">My Boundaries</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {userProfile.boundaries.map((boundary) => (
              <Badge key={boundary} variant="success">✓ {boundary}</Badge>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-card rounded-2xl p-5 border border-border/50">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {userProfile.bio}
          </p>
        </div>

        {/* Menu items */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
