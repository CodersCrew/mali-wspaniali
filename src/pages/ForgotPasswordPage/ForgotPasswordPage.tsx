import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, makeStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from '../../theme';


export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <TextField
          required
          value={email}
          id="email"
          label={t('e-mail')}
          variant="outlined"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  }
})