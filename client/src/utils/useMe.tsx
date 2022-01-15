import { useContext, createContext } from 'react';

import { Me } from '../graphql/types';

export const UserContext = createContext<Me | null>(null);

export function useMe(): Me | null {
    return useContext(UserContext);
}
