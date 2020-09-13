import { gql } from '@apollo/client';

import { AgreementTypeFilter } from '../../../models/AgreementTypeFilters';

export interface GetAgreementsTypeFilterQuery {
    agreementsTypeFilter: AgreementTypeFilter;
}

export const GET_AGREEMENTS_TYPE_FILTER = gql`
    query GetAgreementsTypeFilter {
        agreementsTypeFilter @client {
            id
            displayNameKey
        }
    }
`;
