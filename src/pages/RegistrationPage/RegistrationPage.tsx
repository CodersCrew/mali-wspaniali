import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { connect  } from 'react-redux';
import { Container, Typography, makeStyles } from '@material-ui/core/';
import { WithTranslation, useTranslation } from 'react-i18next';
import { registerUser, RegisterUserType } from '../../actions/registrationActions';
import { RegistrationForm } from './RegistrationForm';
import Loader from '../../components/Loader';
import { RegistrationState, RegistrationUser } from './types';

type RegistrationPageProps = {
  registerUser: RegisterUserType,
  user: RegistrationUser,
  loading: boolean,
};

const RegistrationPage = (props: RegistrationPageProps & PropsWithChildren<WithTranslation>) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // Loading is not used yet
  const { loading } = props;
  
  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Link to="/">{t('homePage')}</Link>
          <Container maxWidth="sm" className={classes.container}>
            <Typography variant="h4" gutterBottom className={classes.h4}>
              {t('register')}
            </Typography>
            <RegistrationForm
              registerUser={props.registerUser}
            />
            <p>
              {t('alreadyHaveAccount')} <Link to="login">{t('login')}</Link>
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

// TypeScript doesn't allow this
// const mapDispatchToProps = {
//   registerUser,
// };

const mapDispatchToProps = (dispatch: any) => ({
  registerUser: (user: RegistrationUser) => dispatch(registerUser(user)),
});

export default connect (
  mapStateToProps,
  mapDispatchToProps,
) (RegistrationPage);
