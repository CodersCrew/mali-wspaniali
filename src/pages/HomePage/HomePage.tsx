import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { unauthenticate } from '../../actions/authActions';
import i18next from "i18next";
import { Button, Container, makeStyles } from '@material-ui/core/';

interface HomePageTypes {
  unauthenticate: () => void;
}

export const HomePage = ({ unauthenticate }: HomePageTypes) => {
    const classes = useStyles();
    return (
    <>
      <Link to="./login">
        <Button onClick={unauthenticate} color="secondary" variant="outlined">
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

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(unauthenticate, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(HomePage);
