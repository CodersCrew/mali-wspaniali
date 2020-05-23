import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, Button, makeStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from '../../theme';
import { backgroundColor, secondaryColor } from '../../colors';


export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.layout}>
          <div>obrazek</div>
          <div className={classes.title}>
            Nie pamietasz hasla?
          </div>
          <div className={classes.subtitle}>
            Nic sie nie stalo. <br />
            Wpisz swoj adres e-mail. <br />
            Otwrsymasz na maila link by <br />
            wygenerowac nowe hasło
            </div>
          <TextField
            required
            value={email}
            id="email"
            label={t('e-mail')}
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
          />
          <div className={classes.buttonWrapper}>
            <Button
              type="submit"
              variant="contained"
              disabled={!email}
              color="secondary"
              className={classes.button}>
              Stwórz nowe hasło
          </Button>
          </div>

        </div>

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
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    minHeight: '90vh',

    '@media (max-width:767px)': {
      minHeight: 'auto',
      width: '100%',
      margin: '0 15px',
    },
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '21px',
    fontWeight: 'bold',
    marginBottom: '25px',
    textTransform: 'uppercase',

    '@media (max-width:767px)': {
      marginTop: '40px',
    },
  },
  subtitle: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#1d1d1b',
    marginBottom: '30px'
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  }, button: {
    color: backgroundColor,
    fontWeight: 'bold',

    '&disbled': {
      color: secondaryColor,
    }
  },
})
