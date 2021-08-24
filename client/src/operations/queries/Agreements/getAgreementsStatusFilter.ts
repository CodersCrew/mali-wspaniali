import { gql } from '@apollo/client';

import { AgreementStatusFilter } from '../../../models/AgreementStatusFilter';

export interface GetAgreementsStatusFilterQuery {
    agreementsStatusFilter: AgreementStatusFilter[];
}

export const GET_AGREEMENTS_STATUS_FILTER = gql`
    query GetAgreementsStatusFilter {
        agreementsStatusFilter @client {
            id
            displayNameKey
            displayName
            selected
        }
    }
`;
