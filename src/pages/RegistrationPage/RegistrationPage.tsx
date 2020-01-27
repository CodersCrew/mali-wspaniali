import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Typography, makeStyles } from '@material-ui/core/';
import {
  RegisterUserType,
  registerUser,
} from '../../actions/registrationActions';
import { RegistrationForm } from './RegistrationForm';
import { AlertDialog } from './AlertDialog';
import { RegistrationState } from './types';

type RegistrationPageProps = {
  registerUser: RegisterUserType;
  users: RegistrationState;
};

const RegistrationPage = (props: RegistrationPageProps) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isAlert, setAlert] = useState(false);
  const classes = useStyles();
  // eslint-disable-next-line consistent-return
  const handleSubmit = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const { email, password } = user;

    if (email === '' || password === '') return setAlert(true);
    props.registerUser(user);
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
      <Container maxWidth="sm" className={classes.container}>
        <Typography variant="h4" gutterBottom className={classes.h4}>
          Zarejestruj się
        </Typography>
        <RegistrationForm
          user={user}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
        {isAlert && <AlertDialog isOpen={isAlert} setAlert={setAlert} />}
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: '100px',
  },
  h4: {
    display: 'flex',
  },
});

function mapStateToProps(
  users: RegistrationState,
): Pick<RegistrationPageProps, 'users'> {
  return {
    users,
  };
}

const mapDispatchToProps = {
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationPage);
