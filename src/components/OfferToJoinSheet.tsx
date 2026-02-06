import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface OfferToJoinSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: { name: string; avatar: string; time: string; note: string };
}

export function OfferToJoinSheet({ open, onOpenChange, person }: OfferToJoinSheetProps) {
  const [message, setMessage] = useState(`Hey ${person.name}! I'd love to join you.`);

  const handleSend = () => {
    toast.success(`Offer sent to ${person.name}!`, {
      description: "They'll be notified you want to join.",
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl pb-safe">
        <div className="sheet-handle" />
        <SheetHeader className="mb-5">
          <SheetTitle className="font-display text-xl">Offer to Join</SheetTitle>
        </SheetHeader>

        <div className="space-y-5 pb-4">
          <div className="flex items-center gap-3 bg-muted/30 rounded-2xl p-4">
            <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-semibold">{person.name}</div>
              <div className="text-sm text-muted-foreground">{person.time}</div>
              <div className="text-sm text-primary mt-0.5">"{person.note}"</div>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium mb-2 block">Add a message</span>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-muted/50 border-border"
            />
          </div>

          <Button variant="spot" size="lg" className="w-full" onClick={handleSend}>
            Send Offer
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
