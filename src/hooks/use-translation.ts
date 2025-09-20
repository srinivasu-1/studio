
import { useLanguage } from '@/context/language-context';

export const useTranslation = () => {
  const { translations } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key;
      }
    }
    return result || key;
  };

  return { t };
};
