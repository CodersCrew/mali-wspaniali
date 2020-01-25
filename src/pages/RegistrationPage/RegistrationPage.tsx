import React, { useState, ReactElement, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Typography } from '@material-ui/core/';
import * as registrationActions from '../../actions/registrationActions';
import RegistrationForm from './RegistrationForm';
import AlertDialog from './AlertDialog';
import { RegistrationState } from './types';

type RegistrationPageProps = {
    registerUser: Function;
    users: RegistrationState;
};

const RegistrationPage = (props: RegistrationPageProps): ReactElement => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (user.email !== '' && user.password !== '') {
      props.registerUser(user);
    } else {
      setAlert(true);
    }
    setUser({ email: '', password: '' });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [id]: value,
    }));
  };

  return (
    <>
      <Link to="/">Wróć do strony głównej</Link>
      <Container maxWidth="sm" style={{ marginTop: '100px' }}>
        <Typography variant="h4" gutterBottom style={{ display: 'flex' }}>
          Zarejestruj się
        </Typography>
        <RegistrationForm
          user={user}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
        {alert === true ? <AlertDialog open={alert} setAlert={setAlert} /> : ''}
      </Container>
    </>
  );
};

function mapStateToProps(
  state: RegistrationState,
): Pick<RegistrationPageProps, 'users'> {
  return {
    users: state,
  };
}

const mapDispatchToProps = {
  registerUser: registrationActions.registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationPage);
