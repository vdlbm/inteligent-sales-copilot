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
    contact?: string;
  }>;
  contact_suggestions: Array<{
    name: string;
    reason: string;
    last_interaction?: string;
  }>;
  confidence_overall: 'high' | 'medium' | 'low';
  notes?: string;
  date: string;
  confidential?: boolean;
  user_confirmation_for_confidential?: boolean;
  audit_hash?: string;
  ui_language?: "en" | "es";
}

export interface EmailDraft {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
  confidential: boolean;
  user_confirmation_for_confidential: boolean;
  audit_hash: string;
  attachments?: File[];
  linked_compose_draft_id?: string;
}

export interface AdminDashboardData {
  user_selected: string;
  confidential_usage_percent: {
    used: number;
    not_used: number;
  };
}
