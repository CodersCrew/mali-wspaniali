import { useTranslation } from 'react-i18next';

export interface Option {
    value: string;
    label: string;
    helperLabel?: string;
}

export function useSelectOptions(): { getOptions: (name: string) => Option[] } {
    const { t } = useTranslation();

    const options: { [index: string]: Option[] } = {
        sex: [
            {
                value: 'male',
                label: t('add-child-modal.select-options.sex.male'),
            },
            {
                value: 'female',
                label: t('add-child-modal.select-options.sex.female'),
            },
        ],
        'birth-date': [...generateDates()],
        'birth-quarter': [
            {
                value: '0',
                label: 'I',
                helperLabel: t('add-child-modal.select-options.birth-quarter.1'),
            },
            {
                value: '1',
                label: 'II',
                helperLabel: t('add-child-modal.select-options.birth-quarter.2'),
            },
            {
                value: '2',
                label: 'III',
                helperLabel: t('add-child-modal.select-options.birth-quarter.3'),
            },
            {
                value: '3',
                label: 'IV',
                helperLabel: t('add-child-modal.select-options.birth-quarter.4'),
            },
        ],
    };

    return {
        getOptions: (name: string) => options[name],
    };
}

function generateDates() {
    return new Array(7).fill(null).map((x, i) => {
        const date = (new Date().getFullYear() - 2 - i).toString();

        return {
            value: date,
            label: date,
        };
    });
}
