import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
  score: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

export const UrgencyBadge = ({ score, className }: UrgencyBadgeProps) => {
  const urgencyColors = {
    1: "bg-urgency-1 hover:bg-urgency-1/80",
    2: "bg-urgency-2 hover:bg-urgency-2/80",
    3: "bg-urgency-3 hover:bg-urgency-3/80",
    4: "bg-urgency-4 hover:bg-urgency-4/80",
    5: "bg-urgency-5 hover:bg-urgency-5/80",
  };

  const urgencyLabels = {
    1: "Minimal",
    2: "Low",
    3: "Medium",
    4: "High",
    5: "Critical",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className={cn(
              "font-semibold text-white border-0 cursor-help",
              urgencyColors[score],
              className
            )}
          >
            {score} - {urgencyLabels[score]}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">Urgency (1-5)</p>
            <p className="text-sm">
              Scale showing how urgently a reply or action is required: 5 = Very High (respond within 24h), 1 = Very Low (no response needed).
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
