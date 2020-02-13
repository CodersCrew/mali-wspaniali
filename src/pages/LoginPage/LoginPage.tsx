import React, { FormEvent, useState, useContext } from 'react';
import { TextField, Button} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation, withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {firebase} from '../../firebase/Firebase';
import { AuthContext } from '../../pages/Root';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const LoginPage = () => {
  
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState("");
  const { t } = useTranslation();

  const Auth = useContext(AuthContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    firebase.auth.handleSession().
    then( ()=>{
      firebase.auth.handleSignInWithEmailAndPassword(email, password)
      .then((res: any)=>{
        if (res.user) {
        console.log(res.user)
        history.push('/')
        Auth.setLoggedIn(true)
        }
      })
    })      
    .catch((e) => {
      setErrors(e.message);
    });    
  };

function redirectUser () {  history.push('/') }
  
  return (      
    <Container> 
     { Auth.isLoggedIn ? redirectUser(): t("You are not logged in") } 
    <Link to="/">{t('homePage')}</Link>   
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
       autoComplete="off">
        <TextField
          required
          onChange={e => setEmail(e.target.value)}
          value={email}
          id="email"
          label="E-mail"
        />
        <TextField
          required
          onChange={e => setPassword(e.target.value)}
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
