import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getUserById } from '../../graphql/userRepository';
import { User } from '../../graphql/types';

export default function ParentProfilePage() {
    const [parent, setParent] = React.useState<User | null>(null);
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    React.useEffect(() => {
        getUserById(id).then(({ data }) => setParent(data!.user));
    }, [id]);

    if (!parent) return <div>{t('parent-profile.no-parent')}</div>;

    return (
        <>
            <div>{t('parent-profile.parent')}</div>
            <div>{parent.mail}</div>
        </>
    );
}
