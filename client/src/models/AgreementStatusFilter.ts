export interface AgreementStatusFilter {
    id: string;
    displayNameKey: string;
}

export const AgreementStatusFilters: { [index: string]: AgreementStatusFilter } = {
    SHOW_ALL: {
        id: 'SHOW_ALL',
        displayNameKey: 'agreements.show-all',
    },
    GIVEN_AGREEMENT: {
        id: 'GIVEN_AGREEMENT',
        displayNameKey: 'agreements.given',
    },
    NOT_GIVEN_AGREEMENT: {
        id: 'NOT_GIVEN_AGREEMENT',
        displayNameKey: 'agreements.not-given',
    },
};
