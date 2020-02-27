import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchChild } from '../../queries/childQueries';


const divStyle = {
  margin: '40px',
  border: '5px solid #99e699',
  width: 'fit-content'
};

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
    setChild(fetchChild(childID) as Child);
  }, [childID]);

  return (
    <>
      <Link to="/">{ t('homePage') }</Link>
      <div style={ divStyle }>
        <span>{ t('child-profile.child-profile') } </span>
        { child && `\n${child.userId}\n${child.firstName}\n${child.lastName}` }
      </div>
    </>
  );
};





