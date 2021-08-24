export interface AgreementStatusFilter {
    id: string;
    displayNameKey: string;
    displayName: '';
    selected: boolean;
}

export const AgreementStatusFilters: { [index: string]: AgreementStatusFilter } = {
    GIVEN_AGREEMENT: {
        id: 'GIVEN_AGREEMENT',
        displayNameKey: 'agreements.given',
        displayName: '',
        selected: true,
    },
    NOT_GIVEN_AGREEMENT: {
        id: 'NOT_GIVEN_AGREEMENT',
        displayNameKey: 'agreements.not-given',
        displayName: '',
        selected: false,
    },
};
