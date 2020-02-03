import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Typography, makeStyles } from '@material-ui/core/';
import i18next from "i18next";
import {
  registerUser,
  RegisterUserType,
} from '../../actions/registrationActions';
import { RegistrationForm } from './RegistrationForm';
import Loader from '../../components/Loader';
import { RegistrationState, RegistrationUser } from './types';

type RegistrationPageProps = {
  registerUser: RegisterUserType,
  user: RegistrationUser,
  loading: boolean,
};


const RegistrationPage = (props: RegistrationPageProps) => {
  const classes = useStyles();
  const { loading } = props;
  
  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Link to="/">{i18next.t('homePage')}</Link>
          <Container maxWidth="sm" className={classes.container}>
            <Typography variant="h4" gutterBottom className={classes.h4}>
              {i18next.t('register')}
            </Typography>
            <RegistrationForm
              registerUser={props.registerUser}
            />
            <p>
              Masz już konto? <Link to="login">Zaloguj się</Link>
            </p>
          </Container>
        </>
      )}
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

function mapStateToProps(
  state: RegistrationState,
): Pick<RegistrationPageProps, 'user' & 'loading'> {
  return {
    user: state.user,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationPage);
