import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

export const Loader = () => {
  const classes = useStyles();

  return (
    <Backdrop classes={{ root: classes.root }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const useStyles = makeStyles({
  root: {
    zIndex: 10,
    color: '#fff',
  },
});
