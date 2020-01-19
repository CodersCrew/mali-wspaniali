import React from 'react'
import { TextField, Button } from '@material-ui/core/';

interface RegistrationFormProps {
    user: any;
    onSubmit: any;
    onChange: any;
    errors: any;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const { user, onSubmit, onChange, errors } = props;

  return (
    <form className={'registration-form'} autoComplete="off">
      {errors.onSubmit && (
        <div className="alert alert-danger" role="alert">
          {errors.onSubmit}
        </div>
      )}
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
