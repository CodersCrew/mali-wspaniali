import React, {PropsWithChildren} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { Button, Container, makeStyles } from '@material-ui/core/';
import {WithTranslation} from 'react-i18next';
import { unauthenticate } from '../../actions/authActions';

interface HomePageTypes {
  logout: () => void;
}

export const HomePage = ({ logout }: HomePageTypes & PropsWithChildren<WithTranslation>) => {
    const classes = useStyles();
    return (
    <>
      <Link to="./login">
        <Button onClick={logout} color="secondary" variant="outlined">
          Log Out
        </Button>
      </Link>
        <Container className={classes.container}>
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
    </>
  );
};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
});

const mapDispatchToProps = {
    logout: unauthenticate
};

export default connect(
  null,
  mapDispatchToProps,
)(HomePage);
