import { useContext } from 'react';

import { UserContext } from '../pages/AppWrapper';
import { Me } from '../graphql/types';

export function useMe(): Me | null {
    const user = useContext(UserContext);

    return user;
}
