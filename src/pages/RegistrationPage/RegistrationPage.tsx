import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { RegistrationForm } from './RegistrationForm';

export const RegistrationPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Link to="/">{t('go-to-home-page')}</Link>
      <Container maxWidth="sm" className={classes.container}>
        <Typography variant="h4" gutterBottom className={classes.h4}>
          {t('registration-page.register')}
        </Typography>
        <RegistrationForm />
        <p>
          {t('registration-page.already-have-account')}{' '}
          <Link to="login">{t('login')}</Link>
        </p>
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: '100px',
  },
  h4: {
    display: 'flex',
  },
});
