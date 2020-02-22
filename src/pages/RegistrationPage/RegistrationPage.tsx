import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Typography, makeStyles } from '@material-ui/core/';
import { WithTranslation, useTranslation } from 'react-i18next';
import { registerUser, RegisterUser } from '../../actions/registrationActions';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationState, RegistrationUser } from './types';

type RegistrationPageProps = {
  registerUser: RegisterUser;
  user: RegistrationUser;
};

const RegistrationPage = (
  props: RegistrationPageProps & PropsWithChildren<WithTranslation>,
) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
      <>
        <Link to="/">{t('homePage')}</Link>
        <Container maxWidth="sm" className={classes.container}>
          <Typography variant="h4" gutterBottom className={classes.h4}>
            {t('register')}
          </Typography>
          <RegistrationForm registerUser={props.registerUser} />
          <p>
            {t('alreadyHaveAccount')} <Link to="login">{t('login')}</Link>
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

function mapStateToProps(
  state: RegistrationState,
): Pick<RegistrationPageProps, 'user'> {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationPage);
