export interface AgreementKindergartenFilter {
    id: string;
    displayName: string;
    displayNameKey: string;
    selected: boolean;
}

export const AgreementKindergartenFilters: { [index: string]: AgreementKindergartenFilter } = {
    SHOW_ALL: {
        id: 'SHOW_ALL',
        displayNameKey: 'agreements.show-all',
        displayName: '',
        selected: true,
    },
};
