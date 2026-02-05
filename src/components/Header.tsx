import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, action, className }: HeaderProps) {
  return (
    <header className={cn("px-5 pt-safe pb-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
