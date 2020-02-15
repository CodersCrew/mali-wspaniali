import React, { FormEvent, useState, useContext } from 'react';
import { TextField, Button} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation, withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {firebase} from '../../firebase/Firebase';
import firebaseApp from 'firebase/app';


export interface LoginActionTypes {
  email: string | null;
  password: string | null
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

let flag:boolean;

export function isUserLogged ():boolean {
  firebase.auth.onAuthStateChanged(function(user) {
    if (user) flag = true
    else flag = false
  });
  return flag
}

const LoginPage = () => {
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState("");
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
        console.log(res.user)
        history.push('/')
        }
      })
    })      
    .catch((event) => {
      setErrors(event.message);
    });    
  };

let signedUser = () => {
  if (isUserLogged()) history.push('/')
}
  
  return (      
    <Container> 
      { signedUser() } 
    <Link to="/">{t('homePage')}</Link>   
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
       autoComplete="off">
        <TextField
          required
          onChange={event => setEmail(event.target.value)}
          value={email}
          id="email"
          label="E-mail"
        />
        <TextField
          required
          onChange={event => setPassword(event.target.value)}
          value={password}
          id="password"
          label="Password"
          type="password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', float: 'right' }}
        >
          Log In
        </Button>
      </form>     
        <span>{(error)? t("Sorry, you've provided wrong credentials or haven't been registered..."): null}</span>      
    </Container>
    )     
};


export default withTranslation()(LoginPage);
