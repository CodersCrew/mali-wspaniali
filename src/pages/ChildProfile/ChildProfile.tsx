import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid } from '@material-ui/core';
import { fetchChild } from '../../queries/childQueries';
import { Child } from '../../firebase/childRepository';

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
  const { t } = useTranslation();
  const { childID } = useParams();
  const [childError, setChildError] = useState('');
  const [child, setChild] = useState<Child | undefined>();
  const classes = useStyles();

  const childDocSuccess = (childDoc: Child) => {
    if (childDoc) {
      setChild({
        firstName: childDoc.firstName,
        lastName: childDoc.lastName,
        userId: childDoc.userId,
      });
    }
  };

  const childDocError = (message: string) => {
    setChildError(message);
    setChild(undefined);
  };

  useEffect(() => {
    fetchChild(childID as string, childDocSuccess, childDocError);
  }, [childID]);

  return (
    <>
      <Link to="/">{t('home-page')}</Link>
      <Grid container className={classes.paper}>
        {t('child-profile.child-profile')}
        {child
          ? `\n ${child.userId}\n ${child.firstName}\n ${child.lastName}`
          : ` \n ${t(childError)}`}
      </Grid>
    </>
  );
};
