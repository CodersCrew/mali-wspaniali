import React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid } from '@material-ui/core';
import { useSubscribed } from '../../hooks/useSubscribed';
import { fetchChild } from '../../queries/childQueries';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Child } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
  },
}));

export const ChildProfile = () => {
  useAuthorization(true);
  const { t } = useTranslation();
  const { childID } = useParams<{ childID: string }>();

  const child = useSubscribed<Child | null>(
    (callback: OnSnapshotCallback<Child>) => fetchChild(childID, callback),
  ) as Child | null;

  const classes = useStyles();

  return child ? (
    <Grid container className={classes.paper}>
      <div>{t('child-profile.child-profile')}</div>
      <p>{child.userId}</p>
      <p>{child.firstName}</p>
      <p>{child.lastName}</p>
    </Grid>
  ) : (
    <Grid container className={classes.paper}>
      {t('child-profile.no-child')}
    </Grid>
  );
};
