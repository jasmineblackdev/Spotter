import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  Eye,
  MapPin,
  LogOut,
  Trash2,
  HelpCircle,
  FileText,
  ChevronRight,
  Moon,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface SettingItem {
  icon: React.ElementType;
  label: string;
  action?: () => void;
  path?: string;
  toggle?: boolean;
  defaultOn?: boolean;
  danger?: boolean;
}

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);

  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", action: () => navigate("/profile/edit") },
        { icon: Shield, label: "My Boundaries", action: () => navigate("/profile/boundaries") },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", toggle: true, state: notifications, setState: setNotifications },
        { icon: MapPin, label: "Location Services", toggle: true, state: locationEnabled, setState: setLocationEnabled },
        { icon: Eye, label: "Profile Visibility", toggle: true, state: profileVisible, setState: setProfileVisible },
        { icon: Moon, label: "Dark Mode", toggle: true, state: darkMode, setState: setDarkMode },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help & FAQ", action: () => toast.info("Help center coming soon!") },
        { icon: FileText, label: "Terms & Privacy", action: () => toast.info("Terms page coming soon!") },
      ],
    },
    {
      title: "Danger Zone",
      items: [
        {
          icon: LogOut,
          label: "Log Out",
          danger: false,
          action: () => {
            localStorage.removeItem("spotter_onboarding_complete");
            navigate("/onboarding");
            toast.info("Logged out");
          },
        },
        {
          icon: Trash2,
          label: "Delete Account",
          danger: true,
          action: () => toast.error("Account deletion is not available in this preview."),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="px-4 pt-safe pb-3 flex items-center gap-3 bg-card/95 backdrop-blur-lg border-b border-border/50">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate("/profile")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-display text-xl font-bold">Settings</h1>
      </header>

      <div className="px-4 py-6 space-y-6">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="micro mb-3">{section.title}</h2>
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {section.items.map((item: any) => (
                <div
                  key={item.label}
                  onClick={item.toggle ? undefined : item.action}
                  className="flex items-center gap-3 p-4 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <item.icon className={`w-5 h-5 ${item.danger ? "text-destructive" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium flex-1 ${item.danger ? "text-destructive" : ""}`}>
                    {item.label}
                  </span>
                  {item.toggle ? (
                    <Switch checked={item.state} onCheckedChange={item.setState} />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
