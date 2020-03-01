import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUserById } from '../../queries/userQueries';
import { DocumentSnapshot } from '../../firebase/firebase';

export interface Parent {
  email: string;
}

export const ParentProfile = () => {
  const [parent, setParent] = useState<Parent | null>(null);
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const setUserCallback = (snapshot: DocumentSnapshot) => {
    const parentData = snapshot.data();

    if (parentData) {
      setParent({ email: parentData.email });
    }
  };

  useEffect(() => {
    const unsubscribe = getUserById(id, setUserCallback);

    return () => unsubscribe();
  }, [id]);

  return parent ? (
    <>
      <div>{t('parent-profile.parent')}</div>
      <div>{parent.email}</div>
    </>
  ) : (
    <div>{t('parent-profile.no-parent')}</div>
  );
};
