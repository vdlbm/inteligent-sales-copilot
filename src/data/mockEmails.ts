import { EmailAnalysis } from "@/types/email";

export const mockEmails: EmailAnalysis[] = [
  {
    email_id: "1",
    from: "maria.gonzalez@techcorp.com",
    to: "sales@ibm.com",
    subject: "URGENT: RFP Cloud Infrastructure - Deadline Oct 15th",
    language: "en",
    summary: "Client requests cloud migration proposal with critical 5-day deadline. Estimated budget $2M.",
    summary_original: "Client requests cloud migration proposal with critical 5-day deadline. Estimated budget $2M.",
    summary_translated: "Client requests cloud migration proposal with critical 5-day deadline. Estimated budget $2M.",
    urgency_score: 5,
    urgency_label: "Critical",
    body: "Dear Team,\n\nI am writing to request a formal proposal (RFP) for migrating our current infrastructure to the cloud. This is an urgent project and we need to receive proposals before October 15th.\n\nEstimated budget: $2M\n\nThank you,\nMaria Gonzalez\nCTO TechCorp",
    extracted_entities: {
      people: ["Maria Gonzalez", "CTO TechCorp"],
      companies: ["TechCorp", "IBM"],
      roles: ["CTO", "IT Director"],
      dates: ["October 15th 2025"],
      tasks: ["Prepare RFP", "Cost estimation", "Technical presentation"],
      deadlines: ["10/15/2025"]
    },
    recommended_actions: [
      {
        action: "Schedule urgent technical team meeting today",
        priority: 1,
        template: "Dear Maria,\n\nWe have received your RFP request for the cloud migration. We are pleased to confirm we can present a complete proposal before 10/15. Could we schedule a call tomorrow to clarify specific requirements?\n\nBest regards,\n[Your name]",
        contact: "maria.gonzalez@techcorp.com"
      },
      {
        action: "Request detailed technical documentation from client",
        priority: 1
      },
      {
        action: "Prepare draft of technical and commercial proposal",
        priority: 2
      }
    ],
    contact_suggestions: [
      {
        name: "Peter Martinez - Senior Cloud Architect",
        reason: "Expert in large-scale cloud migrations",
        last_interaction: "3 days ago"
      },
      {
        name: "Anna Lopez - TechCorp Account Manager",
        reason: "Existing relationship with the client",
        last_interaction: "1 week ago"
      }
    ],
    notes: "High-value client. Review previous TechCorp proposals for reference.",
    date: "2025-10-10T09:15:00Z"
  },
  {
    email_id: "2",
    from: "carlos.ruiz@financorp.com",
    to: "sales@ibm.com",
    subject: "Follow-up on AI and Analytics Meeting",
    language: "en",
    summary: "Client interested in AI solutions after meeting. Requests additional information about Watson.",
    summary_original: "Client interested in AI solutions after meeting. Requests additional information about Watson.",
    summary_translated: "Client interested in AI solutions after meeting. Requests additional information about Watson.",
    urgency_score: 3,
    urgency_label: "Medium",
    body: "Hi IBM team,\n\nThank you for last week's meeting about AI solutions. I would like to receive more information about Watson Analytics and see how we could implement it in our innovation department.\n\nCould you send me some success stories?\n\nBest regards,\nCarlos Ruiz\nInnovation Director",
    extracted_entities: {
      people: ["Carlos Ruiz", "Innovation Director"],
      companies: ["FinanCorp", "IBM Watson"],
      roles: ["Innovation Director"],
      dates: ["Next week"],
      tasks: ["Send Watson documentation", "Prepare demo", "Schedule follow-up"]
    },
    recommended_actions: [
      {
        action: "Send informative Watson materials within 24h",
        priority: 1,
        template: "Dear Carlos,\n\nThank you for your interest in our AI solutions. Attached you will find detailed information about Watson Analytics and success stories in the financial sector.\n\nWould a personalized demo next week work for you?\n\nBest regards,\n[Your name]"
      },
      {
        action: "Schedule personalized Watson demo",
        priority: 2
      }
    ],
    contact_suggestions: [
      {
        name: "Laura Sanchez - Watson Specialist",
        reason: "Expert in financial implementations",
        last_interaction: "2 weeks ago"
      }
    ],
    date: "2025-10-09T14:30:00Z"
  },
  {
    email_id: "3",
    from: "info@smallbiz.com",
    to: "sales@ibm.com",
    subject: "General inquiry about services",
    language: "en",
    summary: "General inquiry from small company about cloud services. No apparent urgency.",
    summary_original: "General inquiry from small company about cloud services. No apparent urgency.",
    summary_translated: "General inquiry from small company about cloud services. No apparent urgency.",
    urgency_score: 1,
    urgency_label: "Minimal",
    body: "Good morning,\n\nWe are a small business and would like to learn more about your cloud services. Could you send us general information?\n\nThank you.",
    extracted_entities: {
      companies: ["SmallBiz"],
      tasks: ["Respond with general information"]
    },
    recommended_actions: [
      {
        action: "Respond with services catalog within 48-72h",
        priority: 3,
        template: "Dear Sir/Madam,\n\nThank you for your interest in IBM. Attached you will find information about our cloud solutions for businesses.\n\nI remain at your disposal for any additional questions.\n\nBest regards,\n[Your name]"
      }
    ],
    contact_suggestions: [],
    notes: "Low priority lead. Automated response appropriate.",
    date: "2025-10-08T16:45:00Z"
  },
  {
    email_id: "4",
    from: "j.fernandez@retailchain.com",
    to: "sales@ibm.com",
    subject: "Maintenance Contract Renewal - Expires Oct 31st",
    language: "en",
    summary: "Existing client requests information about contract renewal expiring in 21 days.",
    summary_original: "Existing client requests information about contract renewal expiring in 21 days.",
    summary_translated: "Existing client requests information about contract renewal expiring in 21 days.",
    urgency_score: 4,
    urgency_label: "High",
    body: "Hello,\n\nOur maintenance contract expires on October 31st. We need to discuss the renewal and see if there are new options available.\n\nCan we schedule a meeting this week?\n\nJavier Fernandez\nCOO, RetailChain",
    extracted_entities: {
      people: ["Javier Fernandez", "COO"],
      companies: ["RetailChain", "IBM"],
      roles: ["COO"],
      dates: ["October 31st 2025"],
      deadlines: ["10/31/2025"],
      tasks: ["Prepare renewal proposal", "Review current contract"]
    },
    recommended_actions: [
      {
        action: "Review current contract terms and prepare improved proposal",
        priority: 1
      },
      {
        action: "Contact this week to discuss renewal",
        priority: 1,
        template: "Dear Javier,\n\nWe have received your request about the maintenance contract renewal. We are preparing an updated proposal that includes service improvements.\n\nCould we schedule a meeting this week to present it to you?\n\nBest regards,\n[Your name]"
      }
    ],
    contact_suggestions: [
      {
        name: "Roberto Gil - RetailChain Account Manager",
        reason: "Has managed the account for 3 years",
        last_interaction: "5 days ago"
      }
    ],
    notes: "Loyal client. Important to maintain relationship. Consider service upgrade.",
    date: "2025-10-09T11:20:00Z"
  },
  {
    email_id: "5",
    from: "patricia.moreno@healthtech.com",
    to: "sales@ibm.com",
    subject: "Interest in cybersecurity solutions for healthcare sector",
    language: "en",
    summary: "New healthcare contact interested in cybersecurity solutions and regulatory compliance.",
    summary_original: "New healthcare contact interested in cybersecurity solutions and regulatory compliance.",
    summary_translated: "New healthcare contact interested in cybersecurity solutions and regulatory compliance.",
    urgency_score: 2,
    urgency_label: "Low",
    body: "Good morning,\n\nI am the CISO of HealthTech Solutions and we are looking to improve our cybersecurity solutions. We would like to know about IBM Security options especially focused on the healthcare sector and regulatory compliance.\n\nCould you share information?\n\nBest regards,\nPatricia Moreno",
    extracted_entities: {
      people: ["Patricia Moreno", "CISO"],
      companies: ["HealthTech Solutions", "IBM Security"],
      roles: ["CISO", "Chief Information Security Officer"],
      tasks: ["Schedule exploratory meeting", "Prepare healthcare sector materials"]
    },
    recommended_actions: [
      {
        action: "Send information about IBM Security solutions for healthcare",
        priority: 2,
        template: "Dear Patricia,\n\nThank you for your interest in our cybersecurity solutions. In the healthcare sector, we have extensive experience helping organizations comply with regulations such as GDPR and ensure the protection of sensitive data.\n\nWould you be interested in learning about sector-specific success stories?\n\nBest regards,\n[Your name]"
      },
      {
        action: "Contact healthcare sector specialist to explore opportunity",
        priority: 2
      }
    ],
    contact_suggestions: [
      {
        name: "Michael Torres - Healthcare Security Consultant",
        reason: "Specialist in security solutions for healthcare sector",
        last_interaction: "1 month ago"
      }
    ],
    notes: "Interesting opportunity in regulated sector. High medium-term potential.",
    date: "2025-10-10T08:00:00Z"
  }
];
