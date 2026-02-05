import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Heart, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatPreview {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  baeMode?: boolean;
}

const gymBuddyChats: ChatPreview[] = [
  {
    id: 1,
    name: "Alex",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Ready for leg day tomorrow?",
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    name: "Sam",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Great session today! 💪",
    time: "1h",
    unread: false,
  },
  {
    id: 3,
    name: "Jordan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    lastMessage: "See you Saturday morning!",
    time: "3h",
    unread: true,
  },
];

const baeModeChats: ChatPreview[] = [
  {
    id: 4,
    name: "Taylor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Coffee after workout? ☕️",
    time: "5m",
    unread: true,
    baeMode: true,
  },
];

function ChatItem({ chat }: { chat: ChatPreview }) {
  return (
    <Link 
      to={`/chat/${chat.id}`}
      className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors"
    >
      <div className="relative">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {chat.baeMode && (
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-bae rounded-full flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`font-medium ${chat.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
            {chat.name}
          </span>
          <span className="text-xs text-muted-foreground">{chat.time}</span>
        </div>
        <p className={`text-sm truncate ${chat.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
          {chat.lastMessage}
        </p>
      </div>
      
      {chat.unread && (
        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
      )}
    </Link>
  );
}

export default function Chats() {
  const hasBaeMode = baeModeChats.length > 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="Chats"
        action={
          <Button variant="ghost" size="icon-sm">
            <Settings className="w-5 h-5" />
          </Button>
        }
      />

      <div className="px-4">
        <Tabs defaultValue="gym-buddies">
          <TabsList className="w-full mb-4 bg-muted/50">
            <TabsTrigger value="gym-buddies" className="flex-1 gap-2">
              <Dumbbell className="w-4 h-4" />
              Gym Buddies
            </TabsTrigger>
            <TabsTrigger value="bae-mode" className="flex-1 gap-2">
              <Heart className="w-4 h-4" />
              Bae Mode
              {hasBaeMode && (
                <Badge variant="notification" className="ml-1">
                  {baeModeChats.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gym-buddies" className="space-y-1">
            {gymBuddyChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </TabsContent>

          <TabsContent value="bae-mode" className="space-y-1">
            {hasBaeMode ? (
              baeModeChats.map((chat) => (
                <ChatItem key={chat.id} chat={chat} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-bae/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-bae" />
                </div>
                <h3 className="font-display font-semibold mb-2">No Bae Mode yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Train with your gym buddies 2-3 times to unlock Bae Mode features!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
