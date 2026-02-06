import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

interface DirectionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: string;
}

export function DirectionsSheet({ open, onOpenChange, location }: DirectionsSheetProps) {
  const encodedLocation = encodeURIComponent(location);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-card border-border rounded-t-3xl pb-safe">
        <div className="sheet-handle" />
        <SheetHeader className="mb-5">
          <SheetTitle className="font-display text-xl">Get Directions</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 pb-4">
          <div className="flex items-center gap-3 bg-muted/30 rounded-2xl p-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold">{location}</div>
              <div className="text-sm text-muted-foreground">Workout location</div>
            </div>
          </div>

          <Button
            variant="spot"
            size="lg"
            className="w-full"
            onClick={() => window.open(`https://maps.google.com/maps?q=${encodedLocation}`, "_blank")}
          >
            <Navigation className="w-5 h-5" />
            Open in Google Maps
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => window.open(`https://maps.apple.com/?q=${encodedLocation}`, "_blank")}
          >
            <ExternalLink className="w-5 h-5" />
            Open in Apple Maps
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
