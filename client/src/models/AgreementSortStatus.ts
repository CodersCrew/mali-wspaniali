export interface AgreementSortType {
    id: string;
}

export const AgreementSortStatus: { [index: string]: AgreementSortType } = {
    BY_NAME_RISING: {
        id: 'BY_NAME_RISING',
    },
    BY_NAME_FALLING: {
        id: 'BY_NAME_FALLING',
    },
    BY_IMAGE_RISING: {
        id: 'BY_IMAGE_RISING',
    },
    BY_IMAGE_FALLING: {
        id: 'BY_IMAGE_FALLING',
    },
    BY_MARKETING_RISING: {
        id: 'BY_MARKETING_RISING',
    },
    BY_MARKETING_FALLING: {
        id: 'BY_MARKETING_FALLING',
    },
};
