import React from 'react';

import { useMe } from '../utils/useMe';
import { useKindergartens } from '../operations/queries/Kindergartens/getKindergartens';
import { openAddChildModal } from '../components/ChilModals/AddChildModal';
import { useAddChild } from '../operations/mutations/User/addChild';

export const ParentWrapper: React.FC = ({ children }) => {
    const user = useMe();
    const modalInstanceExists = React.useRef(false);
    const { kindergartenList } = useKindergartens();
    const { addChild } = useAddChild();

    if (!user || kindergartenList.length === 0) return null;

    const hasNoChildren = user.role === 'parent' && user.children.length === 0;

    if (hasNoChildren && !modalInstanceExists.current) {
        modalInstanceExists.current = true;

        openAddChildModal({
            kindergartens: kindergartenList,
            preventClose: true,
        }).then((results) => {
            if (results.decision && results.decision.accepted) {
                addChild(results.decision.child);
            }
        });
    }

    return <>{children}</>;
};
