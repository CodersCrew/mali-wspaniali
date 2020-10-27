import { gql } from '@apollo/client';

export interface AddKindergartenInput {
    name: string;
    number: number;
    address: string;
    city: string;
}

export const KINDERGARTEN_WITH_USERS = gql`
    query Kindergarten($ids: [String!]!) {
        kindergartenWithUsers(ids: $ids) {
            _id
            name
            number
            address
            city
            users {
                _id
                mail
                children {
                    _id
                    firstname
                    lastname
                    sex
                    birthYear
                    kindergarten {
                        _id
                    }
                }
                agreements {
                    _id
                    date
                    text
                    isSigned
                }
            }
        }
    }
`;
