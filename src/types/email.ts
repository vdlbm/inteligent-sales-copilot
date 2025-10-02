export interface EmailAnalysis {
  email_id: string;
  from: string;
  to: string;
  subject: string;
  language: string;
  summary: string;
  summary_original?: string;
  summary_translated?: string;
  urgency_score: 1 | 2 | 3 | 4 | 5;
  urgency_label: string;
  body: string;
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
  notes?: string;
  date: string;
  confidential?: boolean;
  user_confirmation_for_confidential?: boolean;
  audit_hash?: string;
  ui_language?: "en" | "es";
}

export interface UserStats {
  name: string;
  username: string;
  total_processed: number;
  confidential_used_count: number;
  confidential_percentage: number;
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
  users: UserStats[];
  selected_user: string | null;
}
