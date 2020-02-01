import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, makeStyles } from '@material-ui/core/';

export const HomePage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Link to="/login">
        <Button variant="contained" color="primary">
          Go to Login Page
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="contained" color="primary">
          Go to Registration Page
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
