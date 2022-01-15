import { useTranslation } from 'react-i18next';

import { parseBirthQuarter } from '../../utils/parseBirthQuarter';

export interface Option {
    value: string;
    label: React.ReactNode;
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
                label: parseBirthQuarter(0),
                helperLabel: t('add-child-modal.select-options.birth-quarter.1'),
            },
            {
                value: '1',
                label: parseBirthQuarter(1),
                helperLabel: t('add-child-modal.select-options.birth-quarter.2'),
            },
            {
                value: '2',
                label: parseBirthQuarter(2),
                helperLabel: t('add-child-modal.select-options.birth-quarter.3'),
            },
            {
                value: '3',
                label: parseBirthQuarter(3),
                helperLabel: t('add-child-modal.select-options.birth-quarter.4'),
            },
        ],
    };

    return {
        getOptions: (name: string) => options[name],
    };
}

function generateDates() {
    return [...Array(5)].map((_, i) => {
        const date = (new Date().getFullYear() - 3 - i).toString();

        return {
            value: date,
            label: date,
        };
    });
}
