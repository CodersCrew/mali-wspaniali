import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUserById } from '../../queries/userQueries';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Parent } from './types';
import { useAuthorization } from '../../hooks/useAuthorization';

export const ParentProfile = () => {
    useAuthorization(true, '/', ['admin']);
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const parent = useSubscribed<Parent | null>((callback: OnSnapshotCallback<Parent>) =>
        getUserById(id, callback),
    ) as Parent | null;

    return parent ? (
        <>
            <div>{t('parent-profile.parent')}</div>
            <div>{parent.email}</div>
        </>
    ) : (
        <div>{t('parent-profile.no-parent')}</div>
    );
};
