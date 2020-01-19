import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Typography } from '@material-ui/core/';
import * as registrationActions from '../../actions/registrationActions';
import RegistrationForm from './RegistrationForm';


const RegistrationPage = ( props: any ) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (user.email !== '' && user.password !== '') {
        props.registerUser(user);
    } else {
        window.confirm('Email and password cannot be empty');
    }
    setUser({email: '', password: ''});
  };

  const handleChange = (event: any) => {
    const {id, value } = event.target;
    setUser( prevUser => ({
        ...prevUser,
        [id] : value
    }));
  };

  return (
    <>
        <Link to="/">Wróć do strony głównej</Link>
        <Container maxWidth="sm" style={{ marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom style={{ display: 'flex' }}>
                Zarejestruj się
            </Typography>
            <RegistrationForm user={user} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
        </Container>
    </>
  );
};

function mapStateToProps(state: any) {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = {
  registerUser: registrationActions.registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationPage);
