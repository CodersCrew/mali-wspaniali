import React, { FormEvent, useState, useContext, useEffect } from 'react';
import { TextField, Button} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../Root";
import {firebase} from '../../firebase/Firebase'
import firebaseConfig from "../../firebase/config";

export interface User{
  userId:number;
  id:number;
  title:string;
  body:string;
  response: Object
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {

  const [isLoggedIn, setLoggedIn] = useState(false);
  function readSession() {
      const user = window.sessionStorage.getItem(
              `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
          );
          if (user) setLoggedIn(true)
    }
    useEffect(() => {
      readSession()
    }, [])



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  
  const Auth = useContext(AuthContext);


  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    firebase.auth.handleSession().
    then( ()=>{
      firebase.auth.handleSignInWithEmailAndPassword(email, password)
      .then((res: any)=>{
        if (res.user) Auth.setLoggedIn(true);
        history.push('/')
      })
    })      
    .catch((e) => {
      setErrors(e.message);
    });
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
    Is logged in? {JSON.stringify(isLoggedIn)}
    <Container>  
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
        <span>{t(error)? <p>Sorry, you've provided wrong credentials or haven't been registered...</p>: null}</span>       
    </Container>
    </AuthContext.Provider>
  );
};


export default withRouter(LoginPage);