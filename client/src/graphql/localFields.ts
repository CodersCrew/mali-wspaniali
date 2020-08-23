import { gql } from '@apollo/client';

export const ACTIVE_PAGE = gql`
    query GetActivePage {
        activePage @client
    }
`;
