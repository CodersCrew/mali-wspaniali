import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { fetchChild } from '../../queries/childQueries';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center,
  margin-right: 50px
`;

export interface Child {
  firstName: string;
  lastName: string;
  userId: string
}

export const ChildProfile = () => {

  const { childID } = useParams();
  const [child, setChild] = useState({
    firstName: '',
    lastName: '',
    userId: ''
  });
  const { t } = useTranslation();

  useEffect(() => {
    setChild(fetchChild(childID));
  }, [childID]);

  return (
    <>
      <Link to="/">{ t('homePage') }</Link>
      <Container>
        <span>{ t('child-profile.child-profile') } </span>
        { child && `\n${child.userId}\n${child.firstName}\n${child.lastName}` }
      </Container>
    </>
  );
};





