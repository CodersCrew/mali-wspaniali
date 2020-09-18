export interface AgreementTypeFilter {
    id: string;
    displayNameKey: string;
}

export const AgreementTypeFilters: { [index: string]: AgreementTypeFilter } = {
    SHOW_ALL: {
        id: 'SHOW_ALL',
        displayNameKey: 'agreements.show-all',
    },
    MARKETING_AGREEMENT: {
        id: 'MARKETING_AGREEMENT',
        displayNameKey: 'agreements.marketing',
    },
    IMAGE_AGREEMENT: {
        id: 'IMAGE_AGREEMENT',
        displayNameKey: 'agreements.image',
    },
};
