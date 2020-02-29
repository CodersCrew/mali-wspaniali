import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertDialog } from './AlertDialog';
import { RegisterUser } from '../../actions/registrationActions';
import { showLoader } from '../../utils/showLoader';

type RegistrationFormProps = {
  registerUser: RegisterUser;
};

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [form, setForm] = useState(initialState);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { email, password, passwordConfirm } = form;
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  // eslint-disable-next-line consistent-return
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setAlertMessage(t('registration-page.password-mismatch'));
      return setIsAlert(true);
    }

    const user = { email, password };

    showLoader(props.registerUser(user))
      .then(() => {
        history.push('/login');
      })
      .catch(err => {
        setAlertMessage(err.message);
        setIsAlert(true);
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
        label={t('password')}
        fullWidth
      />
      <TextField
        required
        onChange={handleChange}
        value={passwordConfirm}
        id="passwordConfirm"
        type="password"
        label={t('registration-page.password-confirm')}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        {t('registration-page.register')}
      </Button>
      {isAlert && (
        <AlertDialog
          isOpen={isAlert}
          setIsAlert={setIsAlert}
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
