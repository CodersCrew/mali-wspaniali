import { gql } from '@apollo/client';

import { AgreementSortType } from '../../../models/AgreementSortStatus';

export interface GetAgreementsSortStatusQuery {
    agreementsSortStatus: AgreementSortType;
}

export const GET_AGREEMENTS_SORT_STATUS = gql`
    query GetAgreementsSortStatus {
        agreementsSortStatus @client {
            id
        }
    }
`;
