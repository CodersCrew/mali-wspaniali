import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { firebase } from '../../firebase/firebase';

export const HomePage = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const handleLogoutClick = () => {
    firebase.auth.handleSignOut();
  };

  return (
    <Container className={ classes.container }>
      <Link to="/">
        <Button onClick={ handleLogoutClick } color="secondary" variant="outlined">
          { t('home-page.log-out') }
        </Button>
      </Link>
      <Link to="/login">
        <Button variant="contained" color="primary">
          { t('home-page.go-to-login-page') }
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="contained" color="primary">
          { t('home-page.go-to-registration-page') }
        </Button>
      </Link>
      <Link to="/child/a8g6zDTz9qHbgbWUmoPT/">
        <Button variant="contained" color="primary">
          { t('child-profile.child-profile') }
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
