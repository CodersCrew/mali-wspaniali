import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/client';

import { AddChildModal } from '../components/AddChildModal/AddChildModal';
import { UserContext } from './AppWrapper';
import { KindergartenResponse, KINDERGARTENS } from '../graphql/kindergartensRepository';

export const ParentWrapper: FC = ({ children }) => {
    const user = useContext(UserContext);
    const { data: kindergartenData } = useQuery<KindergartenResponse>(KINDERGARTENS);

    if (!user || !kindergartenData) return null;

    return (
        <>
            <AddChildModal
                handleSubmit={data => console.log(data)}
                isOpen={user.children.length === 0}
                kindergartens={kindergartenData.kindergartens}
            />
            {children}
        </>
    );
};
