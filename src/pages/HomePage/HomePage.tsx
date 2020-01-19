import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from '@material-ui/core/';

const HomePage = (): ReactElement => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
    <Link to="./login">
      <Button variant="contained" color="primary">
        Go to Login Page
      </Button>
    </Link>
    <Link to="./register">
      <Button variant="contained" color="primary">
        Go to Registration Page
      </Button>
    </Link>
    </Container>
  );
};

export default HomePage;