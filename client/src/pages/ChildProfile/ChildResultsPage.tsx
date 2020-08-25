import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid, Typography} from '@material-ui/core';

import { ChildProfileResults } from './ChildProfileResults/ChildProfileResults';
import { ChildProfileAboutTests } from './ChildProfileAboutTests';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { UserContext } from '../AppWrapper';
import { ChildProfileAgreements } from './ChildProfileAgreements';
import { activePage } from '../../apollo_client';
import { Tabs } from '../../components/Tabs';

const TABS = {
    results: 'results',
    aboutTests: 'aboutTests',
    agreements: 'agreements',
};

export const ChildResultsPage = () => {
    const { t } = useTranslation();
    const { childId } = useParams<{ childId: string }>();
    const [activeTab, setActiveTab] = useState(TABS.results);
    const classes = useStyles();
    const user = useContext(UserContext);

    const child = user?.children.find(_child => _child._id === childId);

    useEffect(() => {
        if (child) {
            activePage([child.firstname, `/parent/child/${child._id}/results`, 'parent-menu.child.results-list']);
        }
    }, [user, child]);
    const tabs = [
        { label: t('child-profile.results-list'), value: 'results' },
        { label: t('child-profile.tests-information'), value: 'aboutTests' },
        { label: t('child-profile.your-agreements'), value: 'agreements' },

    ];


    
    if (!user || !child) return <EmptyProfile />;
    
    const { agreements } = user;
    
    return (
        <>
            <Grid container className={classes.header}>
                <PageTitle text={`${child.firstname} ${child.lastname}`} />
                <Typography className={classes.kindergarten}>{child.kindergarten.name}</Typography>
            </Grid>
            <Typography className={classes.description}>{t('child-profile.description')}</Typography>
            <Tabs
                value={ activeTab }
                onTabChange={ (value:any) => setActiveTab(value) }
                values={ tabs }
            />
                onChange={ () =>{}}
            {activeTab === TABS.results && (
                <ChildProfileResults child={child} onNoResultClick={() => setActiveTab('aboutTests')} />
            )}
            {activeTab === TABS.aboutTests && <ChildProfileAboutTests />}
            {activeTab === TABS.agreements && <ChildProfileAgreements agreements={agreements} />}
        </>
    );
};

function EmptyProfile() {
    const { t } = useTranslation();

    return  <Grid container>{t('child-profile.no-child')}</Grid> 
}


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
