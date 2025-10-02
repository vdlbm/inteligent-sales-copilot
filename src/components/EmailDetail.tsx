import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UrgencyBadge } from "./UrgencyBadge";
import { EmailAnalysis } from "@/types/email";
import { Calendar, User, Building2, Briefcase, CalendarDays, CheckCircle2, Clock, Users, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface EmailDetailProps {
  email: EmailAnalysis;
  onActionClick?: (action: { to: string; subject: string; body: string }) => void;
}

export const EmailDetail = ({ email, onActionClick }: EmailDetailProps) => {
  const { t, language } = useTranslation();
  const [viewLanguage, setViewLanguage] = React.useState<"original" | "selected">("original");

  const translateText = (text: string): string => {
    // Simple mock translation - in production, this would call a translation API
    if (viewLanguage === "original" || email.language === language) {
      return text;
    }
    // Return original for now - would integrate with translation service
    return text;
  };

  const handleActionClick = (action: any) => {
    if (action.template && action.contact && onActionClick) {
      onActionClick({
        to: action.contact,
        subject: `Follow-up: ${translateText(email.subject)}`,
        body: action.template,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{translateText(email.subject)}</CardTitle>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span><strong>{t("from")}:</strong> {email.from}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span><strong>{t("to")}:</strong> {email.to}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span><strong>{t("date")}:</strong> {email.date}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <UrgencyBadge score={email.urgency_score} label={email.urgency_label} />
            <Select value={viewLanguage} onValueChange={(val) => setViewLanguage(val as "original" | "selected")}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">{t("viewInOriginal")}</SelectItem>
                <SelectItem value="selected">{t("viewInSelected")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary */}
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t("summary")}
          </h3>
          <p className="text-muted-foreground">{translateText(email.summary)}</p>
        </div>

        <Separator />

        {/* Urgency Analysis */}
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {t("urgency")}
          </h3>
          <p className="text-muted-foreground">
            This email has been classified as <strong>{email.urgency_label}</strong> urgency 
            with a score of {email.urgency_score}/5.
          </p>
        </div>

        {/* Extracted Entities */}
        {email.extracted_entities && Object.keys(email.extracted_entities).length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                {t("extractedEntities")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {email.extracted_entities.people && email.extracted_entities.people.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <User className="h-4 w-4" />
                      {t("people")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {email.extracted_entities.people.map((person, idx) => (
                        <Badge key={idx} variant="secondary">{person}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {email.extracted_entities.companies && email.extracted_entities.companies.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Building2 className="h-4 w-4" />
                      {t("companies")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {email.extracted_entities.companies.map((company, idx) => (
                        <Badge key={idx} variant="secondary">{company}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {email.extracted_entities.roles && email.extracted_entities.roles.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Briefcase className="h-4 w-4" />
                      {t("roles")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {email.extracted_entities.roles.map((role, idx) => (
                        <Badge key={idx} variant="secondary">{role}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {email.extracted_entities.dates && email.extracted_entities.dates.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CalendarDays className="h-4 w-4" />
                      {t("dates")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {email.extracted_entities.dates.map((date, idx) => (
                        <Badge key={idx} variant="secondary">{date}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {email.extracted_entities.tasks && email.extracted_entities.tasks.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      {t("tasks")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {email.extracted_entities.tasks.map((task, idx) => (
                        <Badge key={idx} variant="secondary">{task}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {email.extracted_entities.deadlines && email.extracted_entities.deadlines.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="h-4 w-4" />
                      {t("deadlines")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {email.extracted_entities.deadlines.map((deadline, idx) => (
                        <Badge key={idx} variant="destructive">{deadline}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Recommended Actions */}
        {email.recommended_actions && email.recommended_actions.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                {t("recommendedActions")}
              </h3>
              <div className="space-y-3">
                {email.recommended_actions.map((action, idx) => (
                  <div key={idx} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        {t("priority")} {action.priority}
                      </Badge>
                      <div className="flex-1">
                        <p className="font-medium">{translateText(action.action)}</p>
                        {action.template && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            "{translateText(action.template)}"
                          </p>
                        )}
                        {action.template && action.contact && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-3"
                            onClick={() => handleActionClick(action)}
                          >
                            {t("composeEmail")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Contact Suggestions */}
        {email.contact_suggestions && email.contact_suggestions.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t("suggestedContacts")}
              </h3>
              <div className="space-y-3">
                {email.contact_suggestions.map((contact, idx) => (
                  <div key={idx} className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>{t("reason")}:</strong> {translateText(contact.reason)}
                    </p>
                    {contact.last_interaction && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("lastInteraction")}: {contact.last_interaction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Original Email Body */}
        <Separator />
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {t("originalEmailRaw")}
          </h3>
          <div className="bg-muted/30 rounded-lg p-4">
            <pre className="text-sm whitespace-pre-wrap font-mono text-foreground">{email.body}</pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
