import React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid } from '@material-ui/core';
import { useSubscribed } from '../../hooks/useSubscribed';
import { fetchChild } from '../../queries/childQueries';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Child } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';

export const ChildProfile = () => {
    useAuthorization(true);
    const { t } = useTranslation();
    const { childId } = useParams<{ childId: string }>();

    const child = useSubscribed<Child | null, string>(
        (callback: OnSnapshotCallback<Child>) => fetchChild(childId, callback),
        null,
        [childId],
    ) as Child | null;

    const classes = useStyles();

    return child ? (
        <Grid container className={classes.paper}>
            <div>{t('child-profile.child-profile')}</div>
            <p>{child.firstName}</p>
            <p>{child.lastName}</p>
        </Grid>
    ) : (
        <Grid container className={classes.paper}>
            {t('child-profile.no-child')}
        </Grid>
    );
};

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
