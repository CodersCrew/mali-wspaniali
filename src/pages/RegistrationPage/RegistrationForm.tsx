import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import i18next from 'i18next';
import { AlertDialog } from './AlertDialog';
import { RegisterUserType } from '../../actions/registrationActions';

type RegistrationFormProps = {
  registerUser: RegisterUserType;
};

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [form, setForm] = useState({ ...initialState });
  const [isAlert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { email, password, passwordConfirm} = form;
  const classes = useStyles();
  const history = useHistory();

  // eslint-disable-next-line consistent-return
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setAlertMessage(i18next.t('passwordMismatch'));
      return setAlert(true);
    }

    const user = { email, password };
    
    props.registerUser(user).then(() => {
        setForm({ ...initialState });
        history.push('/login');
      }).catch((err) => {
        setAlertMessage(err.message);
        setAlert(true);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: value,
    }));
  };

  return (
    <form
      className="registration-form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        onChange={handleChange}
        value={email}
        id="email"
        type="email"
        label="E-mail"
        fullWidth
      />
      <TextField
        required
        onChange={handleChange}
        value={password}
        id="password"
        type="password"
        label={i18next.t('password')}
        fullWidth
      />
      <TextField
        required
        onChange={handleChange}
        value={passwordConfirm}
        id="passwordConfirm"
        type="password"
        label={i18next.t('password')}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        {i18next.t('send')}
      </Button>
      {isAlert && (
        <AlertDialog
          isOpen={isAlert}
          setAlert={setAlert}
          message={alertMessage}
        />
      )}
    </form>
  );
};

const useStyles = makeStyles({
  button: {
    marginTop: '20px',
    float: 'right',
  },
});
