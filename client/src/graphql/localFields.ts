import { gql } from '@apollo/client';

export const GET_CART_ITEMS = gql`
    query GetCartItems {
        activePage @client
    }
`;
