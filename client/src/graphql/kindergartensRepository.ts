import { gql } from '@apollo/client';

import { Kindergarten } from './types';

export interface KindergartenResponse {
    kindergartens: Kindergarten[];
}

export const KINDERGARTENS = gql`
    {
        kindergartens {
            _id
            name
            number
        }
    }
`;
