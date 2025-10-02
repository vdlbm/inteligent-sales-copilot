import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmailCard } from "@/components/EmailCard";
import { EmailDetail } from "@/components/EmailDetail";
import { ComposeEmailDialog } from "@/components/ComposeEmailDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mockEmails } from "@/data/mockEmails";
import { EmailAnalysis } from "@/types/email";
import { Search, Filter, Sparkles, Mail } from "lucide-react";

const Index = () => {
  const [selectedEmail, setSelectedEmail] = React.useState<EmailAnalysis | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [urgencyFilter, setUrgencyFilter] = React.useState<string>("all");
  const [composeOpen, setComposeOpen] = React.useState(false);

  const filteredEmails = mockEmails
    .filter((email) => {
      const matchesSearch = 
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesUrgency = 
        urgencyFilter === "all" || 
        email.urgency_score.toString() === urgencyFilter;
      
      return matchesSearch && matchesUrgency;
    })
    .sort((a, b) => b.urgency_score - a.urgency_score);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">IBM Email Analyzer</h1>
                <p className="text-sm text-muted-foreground">Asistente inteligente para comerciales</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button className="gap-2" onClick={() => setComposeOpen(true)}>
                <Mail className="h-4 w-4" />
                Compose Email
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Email List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar correos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por urgencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las urgencias</SelectItem>
                    <SelectItem value="5">Crítica (5)</SelectItem>
                    <SelectItem value="4">Alta (4)</SelectItem>
                    <SelectItem value="3">Media (3)</SelectItem>
                    <SelectItem value="2">Baja-Media (2)</SelectItem>
                    <SelectItem value="1">Baja (1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
              {filteredEmails.map((email) => (
                <EmailCard
                  key={email.email_id}
                  email={email}
                  onClick={() => setSelectedEmail(email)}
                  selected={selectedEmail?.email_id === email.email_id}
                />
              ))}
              {filteredEmails.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No se encontraron correos</p>
                </div>
              )}
            </div>
          </div>

          {/* Email Detail */}
          <div className="lg:col-span-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {selectedEmail ? (
              <EmailDetail email={selectedEmail} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <Mail className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">Selecciona un correo para ver los detalles</p>
                  <p className="text-sm mt-2">El análisis completo aparecerá aquí</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComposeEmailDialog open={composeOpen} onOpenChange={setComposeOpen} />
    </div>
  );
};

export default Index;
