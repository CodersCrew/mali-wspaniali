import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core/';
import { authenticate } from '../../actions/authActions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LoginPageTypes {
  authenticate: () => void;
}

const LoginPage = ({ authenticate }: LoginPageTypes) => {
  return (
    <Container>
      <form autoComplete="off">
        <TextField
          required
          // onChange={onChange}
          // value={user.email}
          id="email"
          label="E-mail"
          // error={errors.email}
          fullWidth
        />
        <TextField
          required
          // onChange={onChange}
          // value={user.password}
          id="password"
          label="Password"
          // error={errors.password}`
          fullWidth
        />
        <Button
          // onClick={onSubmit}
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

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(authenticate, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(LoginPage);
