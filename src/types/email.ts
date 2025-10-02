export interface EmailAnalysis {
  email_id: string;
  from: string;
  to: string;
  subject: string;
  language: string;
  summary: string;
  urgency_score: 1 | 2 | 3 | 4 | 5;
  urgency_label: string;
  extracted_entities: {
    people?: string[];
    companies?: string[];
    roles?: string[];
    dates?: string[];
    tasks?: string[];
    deadlines?: string[];
  };
  recommended_actions: Array<{
    action: string;
    priority: number;
    template?: string;
  }>;
  contact_suggestions: Array<{
    name: string;
    reason: string;
    last_interaction?: string;
  }>;
  confidence_overall: 'high' | 'medium' | 'low';
  notes?: string;
  date: string;
}
