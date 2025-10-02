import { EmailAnalysis } from "@/types/email";

export const mockEmails: EmailAnalysis[] = [
  {
    email_id: "1",
    from: "maria.gonzalez@techcorp.es",
    to: "comercial@ibm.com",
    subject: "URGENTE: RFP Cloud Infrastructure - Deadline 15/10",
    language: "es",
    summary: "Cliente solicita propuesta para migración cloud con deadline crítico de 5 días. Presupuesto estimado 2M€.",
    urgency_score: 5,
    urgency_label: "Crítica",
    extracted_entities: {
      people: ["María González", "CTO TechCorp"],
      companies: ["TechCorp", "IBM"],
      roles: ["CTO", "Directora IT"],
      dates: ["15 de octubre 2025"],
      tasks: ["Preparar RFP", "Estimación de costes", "Presentación técnica"],
      deadlines: ["15/10/2025"]
    },
    recommended_actions: [
      {
        action: "Convocar reunión urgente equipo técnico hoy",
        priority: 1,
        template: "Estimada María,\n\nHemos recibido su solicitud de RFP para la migración cloud. Nos complace confirmar que podemos presentar una propuesta completa antes del 15/10. ¿Podríamos agendar una llamada mañana para aclarar requisitos específicos?\n\nSaludos,\n[Tu nombre]"
      },
      {
        action: "Solicitar documentación técnica detallada al cliente",
        priority: 1
      },
      {
        action: "Preparar borrador de propuesta técnica y comercial",
        priority: 2
      }
    ],
    contact_suggestions: [
      {
        name: "Pedro Martínez - Arquitecto Cloud Senior",
        reason: "Experto en migraciones cloud de gran envergadura",
        last_interaction: "Hace 3 días"
      },
      {
        name: "Ana López - Account Manager TechCorp",
        reason: "Relación existente con el cliente",
        last_interaction: "Hace 1 semana"
      }
    ],
    confidence_overall: "high",
    notes: "Cliente de alto valor. Revisar propuestas anteriores de TechCorp para referencias.",
    date: "2025-10-10T09:15:00Z"
  },
  {
    email_id: "2",
    from: "carlos.ruiz@financorp.com",
    to: "comercial@ibm.com",
    subject: "Seguimiento reunión IA y Analytics",
    language: "es",
    summary: "Cliente interesado en soluciones de IA tras reunión. Solicita información adicional sobre Watson.",
    urgency_score: 3,
    urgency_label: "Media",
    extracted_entities: {
      people: ["Carlos Ruiz", "Director Innovación"],
      companies: ["FinanCorp", "IBM Watson"],
      roles: ["Director de Innovación"],
      dates: ["Próxima semana"],
      tasks: ["Enviar documentación Watson", "Preparar demo", "Agendar seguimiento"]
    },
    recommended_actions: [
      {
        action: "Enviar material informativo sobre Watson en 24h",
        priority: 1,
        template: "Estimado Carlos,\n\nGracias por tu interés en nuestras soluciones de IA. Adjunto encontrarás información detallada sobre Watson Analytics y casos de éxito en el sector financiero.\n\n¿Te vendría bien una demo personalizada la próxima semana?\n\nSaludos,\n[Tu nombre]"
      },
      {
        action: "Programar demo personalizada de Watson",
        priority: 2
      }
    ],
    contact_suggestions: [
      {
        name: "Laura Sánchez - Watson Specialist",
        reason: "Experta en implementaciones financieras",
        last_interaction: "Hace 2 semanas"
      }
    ],
    confidence_overall: "high",
    date: "2025-10-09T14:30:00Z"
  },
  {
    email_id: "3",
    from: "info@smallbiz.es",
    to: "comercial@ibm.com",
    subject: "Consulta general sobre servicios",
    language: "es",
    summary: "Consulta general de empresa pequeña sobre servicios cloud. Sin urgencia aparente.",
    urgency_score: 1,
    urgency_label: "Baja",
    extracted_entities: {
      companies: ["SmallBiz"],
      tasks: ["Responder con información general"]
    },
    recommended_actions: [
      {
        action: "Responder con catálogo de servicios en 48-72h",
        priority: 3,
        template: "Estimado/a,\n\nGracias por su interés en IBM. Adjunto encontrará información sobre nuestras soluciones cloud para empresas.\n\nQuedo a su disposición para cualquier consulta adicional.\n\nSaludos cordiales,\n[Tu nombre]"
      }
    ],
    contact_suggestions: [],
    confidence_overall: "medium",
    notes: "Lead de baja prioridad. Respuesta automatizada apropiada.",
    date: "2025-10-08T16:45:00Z"
  },
  {
    email_id: "4",
    from: "j.fernandez@retailchain.com",
    to: "comercial@ibm.com",
    subject: "Renovación contrato mantenimiento - Vence 31/10",
    language: "es",
    summary: "Cliente existente solicita información sobre renovación de contrato que vence en 21 días.",
    urgency_score: 4,
    urgency_label: "Alta",
    extracted_entities: {
      people: ["Javier Fernández", "COO"],
      companies: ["RetailChain", "IBM"],
      roles: ["COO"],
      dates: ["31 de octubre 2025"],
      deadlines: ["31/10/2025"],
      tasks: ["Preparar propuesta renovación", "Revisar contrato actual"]
    },
    recommended_actions: [
      {
        action: "Revisar términos del contrato actual y preparar propuesta mejorada",
        priority: 1
      },
      {
        action: "Contactar esta semana para discutir renovación",
        priority: 1,
        template: "Estimado Javier,\n\nHemos recibido tu solicitud sobre la renovación del contrato de mantenimiento. Estamos preparando una propuesta actualizada que incluye mejoras en el servicio.\n\n¿Podríamos agendar una reunión esta semana para presentártela?\n\nSaludos,\n[Tu nombre]"
      }
    ],
    contact_suggestions: [
      {
        name: "Roberto Gil - Account Manager RetailChain",
        reason: "Gestiona la cuenta desde hace 3 años",
        last_interaction: "Hace 5 días"
      }
    ],
    confidence_overall: "high",
    notes: "Cliente fidelizado. Importante mantener la relación. Considerar upgrade de servicios.",
    date: "2025-10-09T11:20:00Z"
  },
  {
    email_id: "5",
    from: "patricia.moreno@healthtech.es",
    to: "comercial@ibm.com",
    subject: "Interés en soluciones de ciberseguridad para sector salud",
    language: "es",
    summary: "Nuevo contacto del sector salud interesado en soluciones de ciberseguridad y cumplimiento normativo.",
    urgency_score: 2,
    urgency_label: "Baja-Media",
    extracted_entities: {
      people: ["Patricia Moreno", "CISO"],
      companies: ["HealthTech Solutions", "IBM Security"],
      roles: ["CISO", "Chief Information Security Officer"],
      tasks: ["Agendar reunión exploratoria", "Preparar material sector salud"]
    },
    recommended_actions: [
      {
        action: "Enviar información sobre soluciones IBM Security para salud",
        priority: 2,
        template: "Estimada Patricia,\n\nGracias por su interés en nuestras soluciones de ciberseguridad. En el sector salud, tenemos amplia experiencia ayudando a organizaciones a cumplir con normativas como GDPR y garantizar la protección de datos sensibles.\n\n¿Le interesaría conocer casos de éxito específicos del sector?\n\nSaludos,\n[Tu nombre]"
      },
      {
        action: "Contactar especialista en sector salud para explorar oportunidad",
        priority: 2
      }
    ],
    contact_suggestions: [
      {
        name: "Miguel Ángel Torres - Security Consultant Healthcare",
        reason: "Especialista en soluciones de seguridad para sector salud",
        last_interaction: "Hace 1 mes"
      }
    ],
    confidence_overall: "medium",
    notes: "Oportunidad interesante en sector regulado. Alto potencial a medio plazo.",
    date: "2025-10-10T08:00:00Z"
  }
];
