import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/Firebase';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center,
  margin-right: 50px
`;

interface Child {
  firstName: string;
  lastName: string;
  userId: string
}

export const ChildProfile = () => {

  const { childID } = useParams();
  const [error, setError] = useState('');
  const [child, setChild] = useState({
    firstName: '',
    lastName: '',
    userId: ''
  });
  const { t } = useTranslation();

  const fetchChild = async () => {
    const childRef = await firebase.childQueries.getChildDoc(childID);
    const childDoc = await childRef.get();

    if (!childDoc.exists) {
      setError('No such child!');
      console.log('No such child!');
    }
    else {
      const childInfo = childDoc.data() as Child;
      console.log('Document data:', childInfo);
      setChild(childInfo);
    }
  };

  useEffect(() => {
    fetchChild();
  }, [childID]);

  return (
    <>
      <Link to="/">{ t('homePage') }</Link>
      <Container>
        <span>{ t('child-profile') } </span>
        { child && `\n${child.userId}\n${child.firstName}\n${child.lastName}` }
      </Container>
    </>
  );
};



