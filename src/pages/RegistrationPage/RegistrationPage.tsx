import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Container, Typography, Button } from '@material-ui/core/';
import * as registrationActions from '../../actions/registrationActions';

// const RegistrationPage = ({ users }) => {
//   return (
//       <>
//       <Link to="/">Wróć do strony głównej</Link>
//       <RegistrationForm />
//       </>
//   )
// };

const RegistrationPage = (props: any) => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.registerUser(user);
  };

  const handleEmailChange = (event: any) => {
    setUser({ email: event.target.value, password: user.password });
  };

  const handlePasswordChange = (event: any) => {
    setUser({ email: user.email, password: event.target.value });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom style={{ display: 'flex' }}>
        Zarejestruj się
      </Typography>
      <form className={''} autoComplete="off">
        <TextField
          onChange={handleEmailChange}
          value={user.email}
          id="email"
          label="E-mail"
          fullWidth
        />
        <TextField
          onChange={handlePasswordChange}
          value={user.password}
          id="password"
          label="Password"
          fullWidth
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{ marginTop: '20px', float: 'right' }}
        >
          Wyślij
        </Button>

        {Object.keys(props.users).map(key => (
          <div key={props.users[key].email}>
            {props.users[key].email + props.users[key].password}
          </div>
        ))}
      </form>
    </Container>
  );
};

function mapStateToProps(state: any) {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = {
    registerUser: registrationActions.registerUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationPage);
