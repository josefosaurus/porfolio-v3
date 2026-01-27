import { ui, defaultLang, languages, type Lang, type TranslationKey } from './ui';

/**
 * Extract the language from a URL path
 * e.g., /en/about -> 'en', /es/blog -> 'es'
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * Returns a translation function for the given language
 */
export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang]?.[key] || ui[defaultLang][key];
  };
}

/**
 * Get the path for a specific locale
 * e.g., getLocalePath('es', '/about') -> '/es/about'
 */
export function getLocalePath(lang: Lang, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${lang}${cleanPath ? `/${cleanPath}` : ''}`;
}

/**
 * Switch language while preserving the current path
 * e.g., if current URL is /en/blog, switching to 'es' returns /es/blog
 */
export function getPathInOtherLang(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  const pathname = url.pathname;

  // Remove the current language prefix if it exists
  let pathWithoutLang = pathname;
  if (pathname.startsWith(`/${currentLang}`)) {
    pathWithoutLang = pathname.slice(`/${currentLang}`.length) || '/';
  }

  // Add the target language prefix
  if (pathWithoutLang === '/' || pathWithoutLang === '') {
    return `/${targetLang}`;
  }
  return `/${targetLang}${pathWithoutLang}`;
}

/**
 * Get all available languages
 */
export function getLanguages() {
  return Object.entries(languages).map(([code, name]) => ({
    code: code as Lang,
    name,
  }));
}

/**
 * Check if a language code is valid
 */
export function isValidLang(lang: string): lang is Lang {
  return lang in languages;
}

export { defaultLang, languages, type Lang };
