import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { AlertDialog } from './AlertDialog';
import { RegisterUserType } from '../../actions/registrationActions';
import i18next from "i18next";

type RegistrationFormProps = {
  registerUser: RegisterUserType;
};

type RegistrationError = {
  message: string
}

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  error: null,
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [form, setForm] = useState({ ...initialState });
  const [isAlert, setAlert] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({message: ''});

  const { email, password, passwordConfirm} = form;
  const classes = useStyles();
  const history = useHistory();

  // eslint-disable-next-line consistent-return
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password !== passwordConfirm) return setAlert(true);

    const user = { email, password };
    setForm({ ...initialState });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.registerUser(user).then(() => {
      history.push('/login');
    // eslint-disable-next-line no-shadow
    }).catch((error: RegistrationError) => {
        setIsError(true);
        setError( error );
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
        // error={errors.email}
        fullWidth
      />
      <TextField
        required
        onChange={handleChange}
        value={password}
        id="password"
        type="password"
        label= {i18next.t('password')}
        // error={errors.password}
        fullWidth
      />
      <TextField
        required
        onChange={handleChange}
        value={passwordConfirm}
        id="passwordConfirm"
        type="password"
        label= {i18next.t('password')}
        // error={errors.password}
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
      {isAlert && <AlertDialog isOpen={isAlert} setAlert={setAlert} />}
      {isError && <p>{error.message}</p>}
    </form>
  );
};

const useStyles = makeStyles({
  button: {
    marginTop: '20px',
    float: 'right',
  },
});
