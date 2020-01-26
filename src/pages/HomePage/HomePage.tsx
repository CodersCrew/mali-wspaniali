import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, makeStyles } from '@material-ui/core/';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const HomePage = (): ReactElement => {
  const { container } = useStyles();
  return (
    <Container className={container}>
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
