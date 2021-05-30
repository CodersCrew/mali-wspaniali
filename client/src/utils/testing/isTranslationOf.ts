import i18n from 'i18next';

import '../../internationalization/i18n';

export function isTranslationOf(
    localization: string,
    value: string,
    options?: { [key: string]: string | number },
): boolean {
    return translationOf(localization, options) === value;
}

export function translationOf(localization: string, options?: { [key: string]: string | number }): string {
    return i18n.t(localization, options);
}
