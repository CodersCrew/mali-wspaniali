import React, { useState, ReactElement, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Typography, makeStyles } from '@material-ui/core/';
import {
  registerUserType,
  registerUser,
} from '../../actions/registrationActions';
import RegistrationForm from './RegistrationForm';
import AlertDialog from './AlertDialog';
import { RegistrationState } from './types';

type RegistrationPageProps = {
  registerUser: registerUserType;
  users: RegistrationState;
};

const useStyles = makeStyles({
  container: {
    marginTop: '100px',
  },
  h4: {
    display: 'flex',
  },
});

const RegistrationPage = (props: RegistrationPageProps): ReactElement => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(false);
  const { container, h4 } = useStyles();

  const handleSubmit = (event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { email, password } = user;

    if (email === '' || password === '') return setAlert(true);
    props.registerUser(user);
    return setUser({ email: '', password: '' });
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
      <Container maxWidth="sm" className={container}>
        <Typography variant="h4" gutterBottom className={h4}>
          Zarejestruj się
        </Typography>
        <RegistrationForm
          user={user}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
        {alert && <AlertDialog open={alert} setAlert={setAlert} />}
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
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationPage);
