import React, { FC, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useMe } from '../utils/useMe';
import { useKindergartens } from '../operations/queries/Kindergartens/getKindergartens';
import { openAddChildModal } from '../components/AddChildModal/AddChildModal';
import { ChildInput } from '../graphql/types';
import { AddChildResult } from '../components/AddChildModal/AddChildModal.types';
import { ADD_CHILD } from '../graphql/userRepository';

export const ParentWrapper: FC = ({ children }) => {
    const user = useMe();
    const modalInstances = useRef(false);
    const { kindergartenList } = useKindergartens();
    const [addChild] = useMutation(ADD_CHILD)

    if (!user || !kindergartenList) return null;

    const hasNoChildren = user.role === 'parent' && user.children.length === 0;

    function handleModalSubmit(child: AddChildResult) {
        const newChild: ChildInput = {
            firstname: child.firstname,
            lastname: child.lastname,
            birthYear: parseInt(child['birth-date'], 10),
            birthQuarter: parseInt(child['birth-quarter'], 10),
            sex: child.sex,
            kindergartenId: child.kindergarten,
        };

        addChild({
            variables: {
                child: newChild,
            },
        });
    }

    if (hasNoChildren && !modalInstances.current) {
        modalInstances.current = true;

        openAddChildModal({
            kindergartens: kindergartenList,
            isCancelButtonVisible: true,
        }).then((results) => {
            if (results.decision?.accepted) {
                handleModalSubmit(results.decision.child)
            }
        });
    }

    return <>{children}</>;
};
