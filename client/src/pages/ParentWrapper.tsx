import React, { FC, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { AddChildModal } from '../components/AddChildModal/AddChildModal';
import { UserContext } from './AppWrapper';
import { KindergartenResponse, KINDERGARTENS } from '../graphql/kindergartensRepository';
import { ADD_CHILD } from '../graphql/userRepository';
import { ChildInput } from '../graphql/types';

export const ParentWrapper: FC = ({ children }) => {
    const user = useContext(UserContext);
    const { data: kindergartenData } = useQuery<KindergartenResponse>(KINDERGARTENS);
    const [addChild] = useMutation(ADD_CHILD);

    if (!user || !kindergartenData) return null;

    return (
        <>
            <AddChildModal
                handleSubmit={child => {
                    const newChild: ChildInput = {
                        firstname: child.firstname,
                        lastname: child.lastname,
                        birthYear: parseInt(child['birth-date'], 10),
                        sex: child.sex,
                        kindergartenId: child.kindergarten,
                    };

                    addChild({
                        variables: {
                            child: newChild,
                        },
                    });
                }}
                isOpen={user.children.length === 0}
                kindergartens={kindergartenData.kindergartens}
            />
            {children}
        </>
    );
};
