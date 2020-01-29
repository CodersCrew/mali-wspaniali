import React, { Component } from "react";
import {Link} from "react-router-dom";
import i18next from "i18next";n, Container, makeStyles } from '@material-ui/core/';
import { Button, Container, makeStyles } from '@material-ui/core/';

export const HomePage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Link to="/login">
        <Button variant="contained" color="primary">
            {i18next.t('loginPage')}
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
