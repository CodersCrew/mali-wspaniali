import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    makeStyles,
    Grid,
    Typography,
    Theme,
    createStyles,
} from '@material-ui/core';
import { ChildProfileResults } from './ChildProfileResults/ChildProfileResults';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { activePage } from '../../apollo_client';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { childProfileCategoriesList } from './ChildProfileCategory';
import { MobileAwareCategoryTabs } from '../../components/Navigation/MobileAwareCategoryTabs';
import { ChildRecommendations } from './ChildRecommendations/ChildRecommendations';
import { ChildProfileAboutTests } from './ChildProfileAboutTests/ChildProfileAboutTests';
import { ChildDetails } from './Details/ChildDetails';
import { useMe } from '../../utils/useMe';

export const ChildResultsPage = () => {
    const { t } = useTranslation();
    const { childId, category } = useParams<{
        childId: string;
        category: string;
    }>();
    const device = useBreakpoints();
    const history = useHistory();
    const classes = useStyles();
    const user = useMe()

    const child = user?.children.find((_child) => _child._id === childId);

    useEffect(() => {
        if (child) {
            activePage([
                child.firstname,
                `/parent/child/${child._id}/${category}`,
                `parent-menu.child.${category}`,
            ]);
        }
    }, [user, child, category]);

    function onTabChange(value: string) {
        history.push(`/parent/child/${child?._id}/${value}`);
    }

    if (!user || !child) {
        return (
            <>
                <MobileAwareCategoryTabs
                    onTabChange={onTabChange}
                    category={category}
                    values={childProfileCategoriesList}
                    device={device}
                />
                <EmptyProfile />
            </>
        );
    }

    return (
        <>
            <MobileAwareCategoryTabs
                onTabChange={onTabChange}
                category={category}
                values={childProfileCategoriesList}
                device={device}
            />
            {category === 'results' && (
                <>
                    <Typography className={classes.description}>
                        {t('child-profile.description')}
                    </Typography>
                    <ChildProfileResults
                        child={child}
                        onNoResultClick={() => onTabChange('tests-information')}
                    />
                </>
            )}
            {category === 'recommendations' && <ChildRecommendations />}
            {category === 'tests-information' && <ChildProfileAboutTests />}
            {category === 'details' && <ChildDetails child={child} />}
        </>
    );
};

function EmptyProfile() {
    const { t } = useTranslation();

    return <Grid container>{t('child-profile.no-child')}</Grid>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            margin: '24px',
        },
        kindergarten: {
            fontSize: '21px',
            fontWeight: 700,
            marginLeft: '60px',
        },
        description: {
            fontSize: '21px',
            fontWeight: 500,
            margin: '0 24px',
        },
    }),
);
