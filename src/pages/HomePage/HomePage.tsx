import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/Firebase';

export const HomePage = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const handleLogoutClick = () => {
    firebase.auth.handleSignOut();
  };

  return (
    <Container className={classes.container}>
      <Link to="/">
        <Button
          onClick={handleLogoutClick}
          color="secondary"
          variant="outlined"
        >
          {t('logout')}
        </Button>
      </Link>
      <Link to="/login">
        <Button variant="contained" color="primary">
          {t('loginPage')}
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="contained" color="primary">
          {t('registrationPage')}
        </Button>
      </Link>
    </Container>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default HomePage;
