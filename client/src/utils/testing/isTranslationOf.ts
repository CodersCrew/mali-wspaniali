import i18n from 'i18next';

import '../../internationalization/i18n';

export function isTranslationOf(localization: string, value: string): boolean {
    return translationOf(localization) === value;
}

export function translationOf(localization: string): string {
    return i18n.t(localization);
}
