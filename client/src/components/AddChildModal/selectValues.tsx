// SELECT VALUES
export interface Option {
    value: string;
    label: string;
    helperLabel?: string;
}

export const selectValues: { [index: string]: Option[] } = {
    sex: [
        {
            value: 'mężczyzna',
            label: 'mężczyzna',
        },
        {
            value: 'kobieta',
            label: 'kobieta',
        },
    ],
    'birth-date': [
        ...new Array(20).fill(null).map((x, i) => ({
            value: (new Date().getFullYear() - i).toString(),
            label: (new Date().getFullYear() - i).toString(),
        })),
    ],
    'birth-quarter': [
        {
            value: 'pierwsza',
            label: 'I',
            helperLabel: '(styczen-marzec)',
        },
        {
            value: 'druga',
            label: 'II',
            helperLabel: '(kwiecień-czerwiec)',
        },
        {
            value: 'trzecia',
            label: 'III',
            helperLabel: '(lipiec-wrzesień)',
        },
        {
            value: 'czwarta',
            label: 'IV',
            helperLabel: '(październik-grudzień)',
        },
    ],
    city: [
        {
            value: 'Wrocław',
            label: 'Wrocław',
        },
    ],
    kindergarten: [
        {
            value: 'Krasnoludki',
            label: 'Krasnoludki',
        },
    ],
};
