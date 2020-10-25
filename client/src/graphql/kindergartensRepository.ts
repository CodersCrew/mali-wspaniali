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

export interface AddKindergartenInput {
    name: string;
    number: number;
    address: string;
    city: string;
}

export const CREATE_KINDERGARTEN = gql`
    mutation createKindergarten($kindergarten: CreateKindergartenInput!) {
        createKindergarten(kindergarten: $kindergarten) {
            name
        }
    }
`;

export const UPDATE_KINDERGARTEN = gql`
    mutation updateKindergarten($id: String!, $kindergarten: EditKindergartenInput!) {
        updateKindergarten(id: $id, kindergarten: $kindergarten) {
            _id
            name
            number
            address
            city
        }
    }
`;

export const DELETE_KINDERGARTEN = gql`
    mutation deleteKindergarten($id: String!) {
        deleteKindergarten(id: $id) {
            status
        }
    }
`;
