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
  firstName: string;
  lastName: string;
  userId: string
}


export const childProfilePage = () => {  

  const { childID  }  = useParams();  

  const [error, setError] = useState('');
  let  [child, setChild]  = useState({
    firstName: '',
    lastName: '',
    userId: ''
  });  
  
  const { t } = useTranslation();

  const fetchDataOfChildFromFB = async () => {
    console.log(childID);  

    const childRef = firebase.auth.getDB().collection('child').doc(childID);
      try {
        let doc = await childRef.get()     
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            child = doc.data() as Child;
            console.log('Document data:', child);           
            setChild(child);
          }
        }        
      catch(errorMes) {
        setError(errorMes);
        console.log('Error getting document', errorMes);
      }
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

        { (child !== null)? child.firstName +'\n'+ child.lastName +'\n'+ child.userId : '' } 

        <span>{(error) && t('child-error')}</span>      
    </Container>
    </>
    );
  };
