'use client';

import { useLanguage } from '@/contexts/language-context';

export function useTranslations(namespace?: string) {
  const { messages } = useLanguage();

  return (key: string, params?: Record<string, any>) => {
    const keys = namespace ? `${namespace}.${key}` : key;
    const keyParts = keys.split('.');
    
    let value = messages;
    for (const part of keyParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        // Fallback to the key itself if translation is not found
        return key;
      }
    }

    // Handle string interpolation
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return typeof value === 'string' ? value : key;
  };
}

export function useLocale() {
  const { locale } = useLanguage();
  return locale;
} 