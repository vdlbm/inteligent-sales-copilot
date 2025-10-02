import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
  score: 1 | 2 | 3 | 4 | 5;
  label: string;
  className?: string;
}

export const UrgencyBadge = ({ score, label, className }: UrgencyBadgeProps) => {
  const urgencyColors = {
    1: "bg-urgency-1 hover:bg-urgency-1/80",
    2: "bg-urgency-2 hover:bg-urgency-2/80",
    3: "bg-urgency-3 hover:bg-urgency-3/80",
    4: "bg-urgency-4 hover:bg-urgency-4/80",
    5: "bg-urgency-5 hover:bg-urgency-5/80",
  };

  return (
    <Badge
      className={cn(
        "font-semibold text-white border-0",
        urgencyColors[score],
        className
      )}
    >
      {score} - {label}
    </Badge>
  );
};
