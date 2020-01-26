import React, { ReactElement, FormEventHandler } from 'react';
import { TextField, Button } from '@material-ui/core/';
import { RegistrationUser } from './types';

type RegistrationFormProps = {
  user: RegistrationUser;
  onSubmit: FormEventHandler;
  onChange: FormEventHandler;
  errors: {
    email?: boolean;
    password?: boolean;
  };
};

const RegistrationForm = (props: RegistrationFormProps): ReactElement => {
  const { user, onSubmit, onChange, errors } = props;

  return (
    <form className={'registration-form'} autoComplete="off">
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
        label="Password"
        error={errors.password}
        fullWidth
      />
      <Button
        onClick={onSubmit}
        variant="contained"
        color="primary"
        style={{ marginTop: '20px', float: 'right' }}
      >
        Wyślij
      </Button>
    </form>
  );
};

export default RegistrationForm;
