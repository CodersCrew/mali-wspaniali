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
            address
            city
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
