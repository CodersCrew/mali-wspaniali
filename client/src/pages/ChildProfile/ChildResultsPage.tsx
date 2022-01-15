import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ChildProfileResults } from './ChildProfileResults/ChildProfileResults';
import { activePage } from '../../apollo_client';
import { childProfileCategoriesList } from './ChildProfileCategory';
import { MobileAwareCategoryTabs } from '../../components/Navigation/MobileAwareCategoryTabs';
import { ChildRecommendations } from './ChildRecommendations/ChildRecommendations';
import { ChildProfileAboutTests } from './ChildProfileAboutTests/ChildProfileAboutTests';
import { ChildDetails } from './Details/ChildDetails';
import { useMe } from '../../utils/useMe';
import { PageContainer } from '../../components/PageContainer';

export default function ChildResultsPage() {
    const { childId, category } = useParams<{
        childId: string;
        category: string;
    }>();
    const history = useHistory();
    const user = useMe();
    const child = user?.children.find((_child) => _child._id === childId);

    React.useEffect(() => {
        if (child) {
            activePage([child.firstname, `/parent/child/${child._id}/${category}`, `parent-menu.child.${category}`]);
        }
    }, [user, child, category]);

    if (!user || !child) {
        return (
            <>
                <MobileAwareCategoryTabs
                    onChange={onTabChange}
                    activeCategory={category}
                    name="results"
                    categories={childProfileCategoriesList}
                />
                <EmptyProfile />
            </>
        );
    }

    return (
        <>
            <MobileAwareCategoryTabs
                onChange={onTabChange}
                activeCategory={category}
                name="results"
                categories={childProfileCategoriesList}
            />
            <PageContainer>
                {category === 'results' && <ChildProfileResults child={child} />}
                {category === 'recommendations' && <ChildRecommendations />}
                {category === 'tests-information' && <ChildProfileAboutTests />}
                {category === 'details' && <ChildDetails child={child} />}
            </PageContainer>
        </>
    );

    function onTabChange(value: string) {
        history.push(`/parent/child/${child?._id}/${value}`);
    }
}

function EmptyProfile() {
    const { t } = useTranslation();

    return <Grid container>{t('child-profile.no-child')}</Grid>;
}
