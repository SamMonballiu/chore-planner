import { useMemo } from "react";
import {
  ResourceCollection,
  Resource,
  translations,
} from "../models/resourceCollection";

export function useTranslation(): { t: Resource } {
  const language = import.meta.env.VITE_LANGUAGE as keyof ResourceCollection;

  const t = useMemo(() => {
    return translations[language] ?? translations.en;
  }, []);

  return { t };
}
