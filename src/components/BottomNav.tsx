import { Link, useLocation } from "react-router-dom";
import { Dumbbell, Calendar, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: Dumbbell, label: "Spot", path: "/" },
  { icon: Calendar, label: "This Week", path: "/week", badge: 2 },
  { icon: MessageCircle, label: "Chats", path: "/chats", badge: 3 },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 relative transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
              
              <div className="relative">
                <Icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    isActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]"
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge && (
                  <Badge 
                    variant="notification" 
                    className="absolute -top-1.5 -right-2 text-[10px] animate-pulse"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
