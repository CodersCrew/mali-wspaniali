import React from 'react';

import { Me } from '../graphql/types';

export const UserContext = React.createContext<Me | null>(null);

export function useMe(): Me | null {
    return React.useContext(UserContext);
}
