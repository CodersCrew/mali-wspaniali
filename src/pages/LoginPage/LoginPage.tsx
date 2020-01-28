import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core/';
import { authenticate } from '../../actions/authActions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = ({ authenticate }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    authenticate({ email, password });
  };

  return (
    <Container>
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
    </Container>
  );
};

const mapDispatchToProps = { authenticate };

export default connect(
  null,
  mapDispatchToProps,
)(LoginPage);
