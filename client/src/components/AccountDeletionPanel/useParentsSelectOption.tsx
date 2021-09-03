import { useTranslation } from 'react-i18next';

export interface Option {
    value: string;
    label: string;
    helperLabel?: string;
}

export function useParentsSelectOptions(): { getOptions: (name: string) => Option[] } {
    const { t } = useTranslation();

    const options: { [index: string]: Option[] } = {
        'settings-message': [
            {
                value: 'testResult',
                label: t('settings-modal.select-options.2'),
            },
            {
                value: 'classesInKindergarden',
                label: t('settings-modal.select-options.3'),
            },
            {
                value: 'deleteAccount',
                label: t('settings-modal.select-options.4'),
            },
            {
                value: 'others',
                label: t('settings-modal.select-options.5'),
            },
        ],
    };

    return {
        getOptions: (name: string) => options[name],
    };
}
