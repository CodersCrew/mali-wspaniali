import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from './locales/en/translation.json';
import translationPl from './locales/pl/translation.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        react: {
            useSuspense: false,
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
        },
        resources: {
            pl: {
                translation: translationPl,
            },
            en: {
                translation: translationEn,
            },
        },
        fallbackLng: 'pl',
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupFromPathIndex: 0,
            lookupFromSubdomainIndex: 0,
            caches: ['localStorage', 'cookie'],
            excludeCacheFor: ['cimode'],
        },
    });

export const translation = i18n;
