import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid, Typography, Tab, Tabs } from '@material-ui/core';
import { ChildProfileResults } from './ChildProfileResults/ChildProfileResults';
import { ChildProfileAboutTests } from './ChildProfileAboutTests';
import { secondaryColor, white } from '../../colors';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { UserContext } from '../AppWrapper/AppWrapper';
import { ChildProfileAgreements } from './ChildProfileAgreements';

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
                onChange={(event, value) => setActiveTab(value)}
                className={classes.tabs}
                classes={{
                    root: classes.tabsRoot,
                    indicator: classes.tabsIndicator,
                }}
            >
                <Tab label={t('child-profile.results-list')} value={TABS.results} />
                <Tab label={t('child-profile.tests-information')} value={TABS.aboutTests} />
                <Tab label={t('child-profile.your-agreements')} value={TABS.agreements} />
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
