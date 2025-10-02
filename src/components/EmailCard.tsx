import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UrgencyBadge } from "./UrgencyBadge";
import { Badge } from "@/components/ui/badge";
import { EmailAnalysis } from "@/types/email";
import { Mail, Clock, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailCardProps {
  email: EmailAnalysis;
  onClick: () => void;
  selected?: boolean;
}

export const EmailCard = ({ email, onClick, selected }: EmailCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md border-l-4",
        selected ? "ring-2 ring-primary" : "",
        email.urgency_score >= 4
          ? "border-l-urgency-5"
          : email.urgency_score === 3
          ? "border-l-urgency-3"
          : "border-l-urgency-1"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate mb-1">{email.subject}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span className="truncate">{email.from}</span>
            </div>
          </div>
          <UrgencyBadge score={email.urgency_score} label={email.urgency_label} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground mb-3 line-clamp-2">{email.summary}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {email.extracted_entities.companies?.slice(0, 2).map((company, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              <Building2 className="h-3 w-3 mr-1" />
              {company}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {new Date(email.date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <Badge variant="outline" className="text-xs">
            {email.confidence_overall}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
