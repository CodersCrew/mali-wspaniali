import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { AlertDialog } from './AlertDialog';
import { RegisterUserType } from '../../actions/registrationActions';


type RegistrationFormProps = {
  registerUser: RegisterUserType;
};

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  error: null,
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [form, setForm] = useState({ ...initialState });
  const [isAlert, setAlert] = useState(false);
  const { email, password, passwordConfirm, error } = form;
  const classes = useStyles();

  // eslint-disable-next-line consistent-return
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password !== passwordConfirm) return setAlert(true);

    const user = { email, password };
    props.registerUser(user);
    setForm({ ...initialState });
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
        label="Podaj Hasło"
        // error={errors.password}
        fullWidth
      />
      <TextField
        required
        onChange={handleChange}
        value={passwordConfirm}
        id="passwordConfirm"
        type="password"
        label="Powtórz Hasło"
        // error={errors.password}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Wyślij
      </Button>
      {isAlert && <AlertDialog isOpen={isAlert} setAlert={setAlert} />}
    </form>
  );
};

const useStyles = makeStyles({
  button: {
    marginTop: '20px',
    float: 'right',
  },
});
