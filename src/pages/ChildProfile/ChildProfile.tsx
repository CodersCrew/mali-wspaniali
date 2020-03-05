import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { fetchChild } from '../../queries/childQueries';
import { Child } from '../../firebase/childRepository';

const Container = styled.div`
  margin: '40px',
  border: '5px solid #99e699',
  width: 'fit-content'
`;

export const ChildProfile = () => {
  const { t } = useTranslation();
  const childID = useParams<string>();
  const [childError, setChildError] = useState('');
  const [child, setChild] = useState<Child | undefined>();

  const childDocSuccess = (childDoc: Child) => {
    if (childDoc) {
      setChild({
        firstName: childDoc.firstName,
        lastName: childDoc.lastName,
        userId: childDoc.userId,
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
      <Link to="/">{t('home-page')}</Link>
      <Container>
        {t('child-profile.child-profile')}
        {child
          ? `\n ${child.userId}\n ${child.firstName}\n ${child.lastName}`
          : ` \n ${t(childError)}`}
      </Container>
    </>
  );
};
