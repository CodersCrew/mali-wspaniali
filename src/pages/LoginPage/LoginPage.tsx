import React, { FormEvent, useState } from 'react';
import { TextField, Button } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { User, UserCredential } from '../../firebase/firebase';
import {
  handleSignInWithEmailAndPassword,
  onAuthStateChanged,
} from '../../queries/authQueries';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { t } = useTranslation();
  const history = useHistory();

  const handleSubmitSuccess = ({ user }: UserCredential) => {
    if (user) history.push('/');
  };

  const handleSubmitError = (error: Error) => setLoginError(error.message);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSignInWithEmailAndPassword(
      email,
      password,
      handleSubmitSuccess,
      handleSubmitError,
    );
    setEmail('');
    setPassword('');
  };

  onAuthStateChanged((user: User | null) => {
    if (user) {
      history.push('/');
    }
  });

  return (
    <>
      <Link to="/">{ t('go-to-home-page') }</Link>
      <Container>
        <form onSubmit={ handleSubmit } autoComplete="off">
          <TextField
            required
            onChange={ event => setEmail(event.target.value) }
            value={ email }
            id="email"
            label={ t('e-mail') }
          />
          <TextField
            required
            onChange={ event => setPassword(event.target.value) }
            value={ password }
            id="password"
            label={ t('password') }
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={ { marginTop: '20px', float: 'right' } }
          >
            { t('login-page.login') }
          </Button>
        </form>
        <span>{ loginError && t('login-page.login-error') }</span>
      </Container>
    </>
  );
};