import React from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { Button, Container, makeStyles } from '@material-ui/core/';
import {firebase} from '../../firebase/Firebase';
import {withTranslation} from 'react-i18next';

export const HomePage = () => {
  const classes = useStyles();
  

  const handleLogoutClick = () => {
    firebase.auth.handleSignOut();
    console.log('Sighed Out');
  } 

    return (  
        <Container className={classes.container}>
          
          <Link to="./">
        <Button  onClick={handleLogoutClick} color="secondary" variant="outlined">
          Log Out
        </Button>
      </Link>
            <Link to="/login">
                <Button variant="contained" color="primary">
                    {i18next.t('loginPage')}
                </Button>
            </Link>
            <Link to="/register">
                <Button variant="contained" color="primary">
                    {i18next.t('registrationPage')}
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


export default withTranslation()(HomePage);
