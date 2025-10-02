import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UrgencyBadge } from "./UrgencyBadge";
import { EmailAnalysis } from "@/types/email";
import {
  Mail,
  Calendar,
  Users,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  MessageSquare,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

interface EmailDetailProps {
  email: EmailAnalysis;
}

export const EmailDetail = ({ email }: EmailDetailProps) => {
  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    toast.success("Plantilla copiada al portapapeles");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-3">{email.subject}</CardTitle>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">De:</span> {email.from}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">Para:</span> {email.to}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Fecha:</span>{" "}
                  {new Date(email.date).toLocaleString('es-ES')}
                </div>
              </div>
            </div>
            <UrgencyBadge score={email.urgency_score} label={email.urgency_label} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Resumen</h4>
            <p className="text-foreground">{email.summary}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Acciones Recomendadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {email.recommended_actions.map((action, idx) => (
            <div key={idx} className="border-l-4 border-l-primary pl-4 py-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-medium">{action.action}</p>
                <Badge variant={action.priority === 1 ? "default" : "secondary"}>
                  Prioridad {action.priority}
                </Badge>
              </div>
              {action.template && (
                <div className="mt-3 bg-muted/30 p-3 rounded text-sm relative group">
                  <p className="pr-8">{action.template}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyTemplate(action.template!)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Entidades Extraídas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {email.extracted_entities.companies && email.extracted_entities.companies.length > 0 && (
              <div>
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Empresas
                </h5>
                <div className="flex flex-wrap gap-2">
                  {email.extracted_entities.companies.map((company, idx) => (
                    <Badge key={idx} variant="secondary">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {email.extracted_entities.people && email.extracted_entities.people.length > 0 && (
              <div>
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personas
                </h5>
                <div className="flex flex-wrap gap-2">
                  {email.extracted_entities.people.map((person, idx) => (
                    <Badge key={idx} variant="secondary">
                      {person}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {email.extracted_entities.deadlines && email.extracted_entities.deadlines.length > 0 && (
              <div>
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fechas Límite
                </h5>
                <div className="flex flex-wrap gap-2">
                  {email.extracted_entities.deadlines.map((deadline, idx) => (
                    <Badge key={idx} variant="outline">
                      {deadline}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Contactos Sugeridos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {email.contact_suggestions.map((contact, idx) => (
              <div key={idx} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">{contact.name}</p>
                  {contact.last_interaction && (
                    <Badge variant="outline" className="text-xs">
                      {contact.last_interaction}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{contact.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {email.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Notas Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{email.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
