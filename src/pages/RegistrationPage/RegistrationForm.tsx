import React, { ChangeEvent, MouseEvent } from 'react';
import {Typography, TextField, Button, makeStyles } from '@material-ui/core/';
import i18next from "i18next";
import { RegistrationUser } from './types';

type RegistrationFormProps = {
  user: RegistrationUser;
  onSubmit: (event: MouseEvent<HTMLElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  errors: {
    email?: boolean;
    password?: boolean;
  };
};

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { user, onSubmit, onChange, errors } = props;
  const classes = useStyles();

  return (
    <form className="registration-form" autoComplete="off">
      <TextField
        required
        onChange={onChange}
        value={user.email}
        id="email"
        label="E-mail"
        error={errors.email}
        fullWidth
      />
      <TextField
        required
        onChange={onChange}
        value={user.password}
        id="password"
        label= {i18next.t('password')}
        error={errors.password}
        fullWidth
      />
      <Button
        onClick={onSubmit}
        variant="contained"
        color="primary"
        className={classes.button}
      >
          {i18next.t('send')}
      </Button>
    </form>
  );
};

const useStyles = makeStyles({
  button: {
    marginTop: '20px',
    float: 'right',
  },
});
