import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  return { t, language };
}
