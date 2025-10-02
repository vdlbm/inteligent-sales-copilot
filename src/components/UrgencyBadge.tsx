import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface UrgencyBadgeProps {
  score: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

export const UrgencyBadge = ({ score, className }: UrgencyBadgeProps) => {
  const { t } = useTranslation();
  
  const urgencyColors = {
    1: "bg-urgency-1 hover:bg-urgency-1/80",
    2: "bg-urgency-2 hover:bg-urgency-2/80",
    3: "bg-urgency-3 hover:bg-urgency-3/80",
    4: "bg-urgency-4 hover:bg-urgency-4/80",
    5: "bg-urgency-5 hover:bg-urgency-5/80",
  };

  const getUrgencyLabel = (score: 1 | 2 | 3 | 4 | 5): string => {
    const labelKey = `urgency${score}` as keyof typeof import("@/i18n/translations").translations.en;
    return t(labelKey);
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
            {score} - {getUrgencyLabel(score)}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">{t("urgencyTooltipTitle")}</p>
            <p className="text-sm">{t("urgencyTooltipDescription")}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
