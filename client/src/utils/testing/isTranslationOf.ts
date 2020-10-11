import i18n from 'i18next';

import '../../internationalization/i18n';

export function isTranslationOf(localization: string, value: string) {
    return translationOf(localization) === value;
}

export function translationOf(localization: string) {
    return i18n.t(localization);
}
