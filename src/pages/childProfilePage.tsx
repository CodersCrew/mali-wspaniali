import React, { useState } from 'react';
import { useParams} from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation} from 'react-i18next';
import { Button } from '@material-ui/core';
import {firebase} from '../firebase/Firebase';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center
`;

interface Child {
  firstname: string;
  lastname: string;
  userId: string
}

let childInfo : Child;

export const childProfilePage = () => {  

  const { childID  }  = useParams();  

  const [error, setError] = useState('');
  const  [childiD, setChildId]  = useState('');  
  const { t } = useTranslation();

  const fetchDataOfChildFromFB =  () => {
    console.log(childID);  

    const childRef = firebase.auth.getDB().collection('child').doc(childID);
    const getDoc = childRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          childInfo = doc.data() as Child;
          console.log('Document data:', childInfo);           
          setChildId(childInfo.userId);
        }
      })
      .catch(errorMes => {
        setError(errorMes);
        console.log('Error getting document', errorMes);
      });
  };

 return ( 
   <>  
   <Link to="/">{t('homePage')}</Link>      
    <Container>          
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', float: 'right' }}
          value = "Child Info"
          onClick = {fetchDataOfChildFromFB}
        >
          {t('Child Info')}
        </Button>  

        {childiD} 

        <span>{(error) && t('child-error')}</span>      
    </Container>
    </>
    );
  };
