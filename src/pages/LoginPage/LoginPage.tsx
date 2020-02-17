import React, { FormEvent, useState } from 'react';
import { TextField, Button} from '@material-ui/core/';
import { Link,  useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation, withTranslation } from 'react-i18next';
import firebaseApp, { User } from 'firebase/app';
import {firebase} from '../../firebase/Firebase';



export interface LoginActionTypes {
  email: string | null;
  password: string | null
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center
`;



export function isUserLogged (): User| null {return firebase.auth.getCurrentUser();}

const LoginPage = () => {  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
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
        setErrors(errorMes.message);
      }); 
    });     
  };

if ( isUserLogged() )  history.push('/');
 return ( 
   <>  
   <Link to="/">{t('homePage')}</Link>      
    <Container>          
      <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
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
        <span>{(error)? t('login-error'): null}</span>      
    </Container>
    </>
    );
  };


export default withTranslation()(LoginPage);
