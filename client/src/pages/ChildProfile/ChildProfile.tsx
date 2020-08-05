import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid, Typography, Tabs } from '@material-ui/core';
import { useSubscribed } from '../../hooks/useSubscribed';
import { fetchChild } from '../../queries/childQueries';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Child } from '../../firebase/types';
import { useAuthorization } from '../../hooks/useAuthorization';
import { ChildProfileResults } from './ChildProfileResults';
import { ChildProfileAboutTests } from './ChildProfileAboutTests';
import { ChildProfileAgreements } from './ChildProfileAgreements';
import { secondaryColor, white } from '../../colors';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { BaseTab } from '../../components/BaseTab';

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
                <PageTitle text={`${child.firstName} ${child.lastName}`} />
                <Typography className={classes.kindergarten}>
                    {t('child-profile.kindergarten-no')} {child.kindergartenNo}
                </Typography>
            </Grid>
            <Typography className={classes.description}>{t('child-profile.description')}</Typography>
            <Tabs
                value={activeTab}
                onChange={(event, value) => setActiveTab(value)}
                className={classes.tabs}
                classes={{
                    root: classes.tabsRoot,
                    indicator: classes.tabsIndicator,
                }}
            >
                <BaseTab label={t('child-profile.results-list')} value={TABS.results} />
                <BaseTab label={t('child-profile.tests-information')} value={TABS.aboutTests} />
                <BaseTab label={t('child-profile.your-agreements')} value={TABS.agreements} />
            </Tabs>
            {activeTab === TABS.results && (
                <ChildProfileResults onNoResultClick={() => setActiveTab('aboutTests')} birthYear={child.birthYear} />
            )}
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
    kindergarten: {
        fontSize: '21px',
        fontWeight: 700,
        marginLeft: '60px',
    },
    description: {
        fontSize: '21px',
        maxWidth: '1070px',
        fontWeight: 500,
        marginTop: '10px',
    },
    tabs: {
        marginTop: '40px',
        minHeight: 'unset',
    },
    tabsRoot: {
        minHeight: '34px',
        '& button': {
            border: `1px solid ${secondaryColor}`,
            color: secondaryColor,
            textTransform: 'unset',
            fontWeight: 700,
            borderRadius: '10px 10px 0 0',
            height: '34px',
            minHeight: 'unset',
            paddingTop: '4px',
            opacity: 1,

            '& .MuiTouchRipple-root': {
                display: 'none',
            },

            '&:not(:last-child)': {
                borderRight: 0,
            },
        },

        '& .Mui-selected': {
            color: white,
            backgroundColor: secondaryColor,
        },
    },
    tabsIndicator: {
        display: 'none',
    },
});
