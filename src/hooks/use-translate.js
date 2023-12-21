import { useCallback, useEffect, useMemo, useState } from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

export default function useTranslate() {
  const i18n = useServices().i18n;
  const [currentLanguage, setCurrentLanguage] = useState(i18n.lang);
  const unsubscribe = useMemo(() => {
    return i18n.subscribe((currentLanguage) => {
      setCurrentLanguage(currentLanguage);
    });
  }, []);
  useEffect(() => unsubscribe, [unsubscribe]);

  return {
    lang: currentLanguage,
    setLang: (lang) => (i18n.lang = lang),
    t: useCallback((text, plural) => i18n.t(text, plural), [i18n.lang]),
    availableLanguages: i18n.config.availableLanguages,
  };
}
