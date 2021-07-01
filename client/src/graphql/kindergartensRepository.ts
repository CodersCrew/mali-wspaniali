import { gql } from '@apollo/client';

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
                    birthQuarter
                    kindergarten {
                        _id
                    }
                }
                agreements {
                    _id
                    createdAt
                    text
                    isSigned
                }
            }
        }
    }
`;
