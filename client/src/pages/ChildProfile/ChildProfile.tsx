import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { ChildProfileResults } from './ChildProfileResults/ChildProfileResults';
import { ChildProfileAboutTests } from './ChildProfileAboutTests';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { UserContext } from '../AppWrapper/AppWrapper';
import { ChildProfileAgreements } from './ChildProfileAgreements';
import { Tabs } from '../../components/Tabs';

const TABS = {
    results: 'results',
    aboutTests: 'aboutTests',
    agreements: 'agreements',
};

export const ChildProfile = () => {
    const { t } = useTranslation();
    const { childId } = useParams<{ childId: string }>();
    const [activeTab, setActiveTab] = useState(TABS.results);
    const classes = useStyles();
    const user = useContext(UserContext);

    const tabs = [
        { label: t('child-profile.results-list'), value: 'results' },
        { label: t('child-profile.tests-information'), value: 'aboutTests' },
        { label: t('child-profile.your-agreements'), value: 'agreements' },
    ];

    if (!user) return null;

    const { aggrements } = user;
    const child = user.children.find(child => child._id === childId);

    if (!child) {
        return <Grid container>{t('child-profile.no-child')}</Grid>;
    }

    return (
        <>
            <Grid container className={classes.header}>
                <PageTitle text={`${child.firstname} ${child.lastname}`} />
                <Typography className={classes.kindergarten}>{child.kindergarten.name}</Typography>
            </Grid>
            <Typography className={classes.description}>{t('child-profile.description')}</Typography>
            <Tabs
                value={activeTab}
                //@ts-ignore
                onChange={(_event, value) => setActiveTab(value)}
            >
                {tabs}
            </Tabs>
            {activeTab === TABS.results && (
                <ChildProfileResults child={child} onNoResultClick={() => setActiveTab('aboutTests')} />
            )}
            {activeTab === TABS.aboutTests && <ChildProfileAboutTests />}
            {activeTab === TABS.agreements && <ChildProfileAgreements aggrements={aggrements} />}
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
});
