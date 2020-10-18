import React, { FC } from 'react';
import { useMutation } from '@apollo/client';

import { AddChildModal } from '../components/AddChildModal/AddChildModal';
import { ADD_CHILD } from '../graphql/userRepository';
import { ChildInput } from '../graphql/types';
import { useMe } from '../utils/useMe';
import { useKindergartens } from '../operations/queries/Kindergartens/getKindergartens';

export const ParentWrapper: FC = ({ children }) => {
    const user = useMe();
    const { kindergartenList } = useKindergartens();
    const [addChild] = useMutation(ADD_CHILD);

    if (!user || !kindergartenList) return null;

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
                isOpen={user.children.length === 0 && user.role === 'parent'}
                kindergartens={kindergartenList}
            />
            {children}
        </>
    );
};
