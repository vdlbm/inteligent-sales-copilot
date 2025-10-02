import * as React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export function LanguageToggle() {
  const { toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {t("translate")}
    </Button>
  );
}
