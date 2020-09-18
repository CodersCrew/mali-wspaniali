import { gql } from '@apollo/client';
import { AgreementKindergartenFilter } from '../../../models/AgreementKindergartenFilters';

export interface GetAgreementsKindergartenFilterQuery {
    agreementsKindergartenFilter: AgreementKindergartenFilter[];
}

export const GET_AGREEMENTS_KINDERGARTEN_FILTER = gql`
    query GetAgreementsKindergartenFilter {
        agreementsKindergartenFilter @client {
            id
            displayName
            displayNameKey
            selected
        }
    }
`;
