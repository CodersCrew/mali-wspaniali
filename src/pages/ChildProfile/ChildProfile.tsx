import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { fetchChild } from '../../queries/childQueries';
import { ChildData, Child } from '../../firebase/childRepository';

const Container = styled.div`
  margin: '40px',
  border: '5px solid #99e699',
  width: 'fit-content'
`;

export const ChildProfile = () => {
  const { t } = useTranslation();
  const { childID } = useParams();
  const [childError, setChildError] = useState('');
  const [child, setChild] = useState<Child | undefined>();

  const childDocSuccess = (childDoc: ChildData) => {
    const childDocument = childDoc.data();
    if (childDocument) {
      setChild({
        firstName: childDocument.firstName,
        lastName: childDocument.lastName,
        userId: childDocument.userId,
      });
    }
  };

  const childDocError = (message: string) => {
    setChildError(message);
    setChild(undefined);
  };

  useEffect(() => {
    fetchChild(childID, childDocSuccess, childDocError);
  }, [childID]);

  return (
    <>
      <Link to="/">{t('homePage')}</Link>
      <Container>
        {t('child-profile.child-profile')}
        {child
          ? `\n ${child.userId}\n ${child.firstName}\n ${child.lastName}`
          : ` \n ${t(childError)}`}
      </Container>
    </>
  );
};
