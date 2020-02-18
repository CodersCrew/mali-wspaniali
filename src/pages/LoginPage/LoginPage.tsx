import React, { FormEvent, useState } from 'react';
import { TextField, Button} from '@material-ui/core/';
import { Link,  useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation, withTranslation } from 'react-i18next';
import firebaseApp, { User } from 'firebase/app';
import {firebase} from '../../firebase/Firebase';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center
`;

export const isUserLogged = (): User| null => firebase.auth.getCurrentUser();

export const LoginPage = () => {  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const history = useHistory();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setEmail('');
    setPassword('');
    firebase.auth.handleSession().
      then( ()=>{
        firebase.auth.handleSignInWithEmailAndPassword(email, password)
          .then((res: firebaseApp.auth.UserCredential)=>{
            if (res.user) {
            history.push('/');
          }
        }).catch((errorMes) => {
          setError(errorMes.message);
        }); 
      });     
  };

  firebase.auth.onAuthStateChanged(function(user: User| null):void {
    if (user) {
      history.push('/');
    } 
  });
 
 return ( 
   <>  
   <Link to="/">{t('homePage')}</Link>      
    <Container>          
      <form onSubmit={handleSubmit}
       autoComplete="off">
        <TextField
          required
          onChange={event => setEmail(event.target.value)}
          value={email}
          id="email"
          label={t('eMail')}
        />
        <TextField
          required
          onChange={event => setPassword(event.target.value)}
          value={password}
          id="password"
          label={t('password')}
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', float: 'right' }}
        >
          {t('send')}
        </Button>
      </form>     
        <span>{(error)? t('error'): null}</span>      
    </Container>
    </>
    );
  };


//export default withTranslation()(LoginPage);
