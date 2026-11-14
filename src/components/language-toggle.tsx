import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageContext, UI_TEXT, useLanguage, type Language } from "@/lib/i18n";

const STORAGE_KEY = "kadr.lang";

function applyHtmlLang(lang: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("ru");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ru") {
        setLangState(stored);
        applyHtmlLang(stored);
        return;
      }
    } catch {
      /* ignore */
    }
    applyHtmlLang("ru");
  }, []);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    applyHtmlLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "ru" ? "en" : "ru");
  }, [lang, setLang]);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const t = UI_TEXT[lang];

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleLang}
      className="h-11 shrink-0 gap-1.5 px-3"
      aria-label={t.langToggleAria}
      title={t.langToggleAria}
    >
      <Globe className="size-4" />
      <span className="text-xs font-semibold tracking-wide">{t.langLabel}</span>
    </Button>
  );
}
