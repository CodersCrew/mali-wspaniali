export interface Option {
    value: string;
    label: string;
    helperLabel?: string;
}
function generateDates() {
    return new Array(20).fill(null).map((x, i) => {
        const date = (new Date().getFullYear() - i).toString();

        return {
            value: date,
            label: date,
        };
    });
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
    'birth-date': [...generateDates()],
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
