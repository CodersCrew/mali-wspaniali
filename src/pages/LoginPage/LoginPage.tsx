import React, { useState } from 'react';
import { TextField, Button} from '@material-ui/core/';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import firebaseApp from 'firebase/app';
import { authenticate } from '../../actions/authActions';
import i18next from 'i18next';
import { withRouter } from 'react-router-dom'
import * as firebase from 'firebase'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = ({ login, history } : any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).
    then( ()=>{
      login({ email, password })
      .then( (res:any)=>{
        if (res.user) 
        history.push('/')
      })
    })      
    .catch(e => {
      setErrors(e.message);
    });
    
  };

  return (
    <Container>  
    <Link to="/">{i18next.t('homePage')}</Link>
    <br></br>   
      <form onSubmit={e => onSubmit(e)} autoComplete="off">
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
      <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', float: 'right' }}
          onClick={() => console.log(firebaseApp.auth().currentUser)}
      >
        Check
      </Button>
      <br></br>      
        <span>{error}</span>       
    </Container>
  );
};




const mapDispatchToProps = { login: authenticate };

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(LoginPage));
