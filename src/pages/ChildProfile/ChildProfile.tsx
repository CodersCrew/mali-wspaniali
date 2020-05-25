import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid, Typography, Tab, Tabs } from '@material-ui/core';
import { useSubscribed } from '../../hooks/useSubscribed';
import { fetchChild } from '../../queries/childQueries';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Child } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';
import { ChildProfileResults } from './ChildProfileResults';
import { ChildProfileAboutTests } from './ChildProfileAboutTests';
import { ChildProfileAgreements } from './ChildProfileAgreements';

const TABS = {
    results: 'results',
    aboutTests: 'aboutTests',
    agreements: 'agreements',
};

export const ChildProfile = () => {
    useAuthorization(true);
    const { t } = useTranslation();
    const { childId } = useParams<{ childId: string }>();
    const [activeTab, setActiveTab] = useState(TABS.results);

    const child = useSubscribed<Child | null, string>(
        (callback: OnSnapshotCallback<Child>) => fetchChild(childId, callback),
        null,
        [childId],
    ) as Child | null;

    const classes = useStyles();

    if (!child) {
        return <Grid container>{t('child-profile.no-child')}</Grid>;
    }

    return (
        <>
            <Grid container className={classes.header}>
                <Typography className={classes.name}>
                    {child.firstName} {child.lastName}
                </Typography>
                <Typography className={classes.kindergarten}>
                    {t('child-profile.kindergarten-no')} {child.kindergartenNo}
                </Typography>
            </Grid>
            <Typography className={classes.description}>{t('child-profile.description')}</Typography>
            <Tabs value={activeTab} onChange={(event, value) => setActiveTab(value)} className={classes.tabs}>
                <Tab label={t('child-profile.results-list')} value={TABS.results} />
                <Tab label={t('child-profile.tests-information')} value={TABS.aboutTests} />
                <Tab label={t('child-profile.your-agreements')} value={TABS.agreements} />
            </Tabs>
            {activeTab === TABS.results && <ChildProfileResults />}
            {activeTab === TABS.aboutTests && <ChildProfileAboutTests />}
            {activeTab === TABS.agreements && <ChildProfileAgreements />}
        </>
    );
};

const useStyles = makeStyles({
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        fontSize: '36px',
        textTransform: 'uppercase',
        fontWeight: 700,
        marginRight: '60px',
    },
    kindergarten: {
        fontSize: '21px',
        fontWeight: 700,
    },
    description: {
        fontSize: '21px',
        maxWidth: '1070px',
        fontWeight: 500,
        marginTop: '10px',
    },
    tabs: {
        marginTop: '40px',
    },
});
