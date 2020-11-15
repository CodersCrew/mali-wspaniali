import React, { FC } from 'react';
import { useMe } from '../utils/useMe';
import { useKindergartens } from '../operations/queries/Kindergartens/getKindergartens';

export const ParentWrapper: FC = ({ children }) => {
    const user = useMe();
    const { kindergartenList } = useKindergartens();

    if (!user || !kindergartenList) return null;

    return <>{children}</>;
};
