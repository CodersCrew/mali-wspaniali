import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { activePage } from '@app/apollo_client';
import { MobileAwareCategoryTabs } from '@app/components/Navigation/MobileAwareCategoryTabs';
import { ChildProfileAboutTests } from '@app/pages/ChildProfile/ChildProfileAboutTests';
import { useMe } from '@app/utils/useMe';
import { PageContainer } from '@app/components/PageContainer';
import { ChildDetails } from './Details/ChildDetails';
import { ChildRecommendations } from './ChildRecommendations/ChildRecommendations';
import { childProfileCategoriesList } from './ChildProfileCategory';
import { ChildProfileResults } from './ChildProfileResults/ChildProfileResults';

export default function ChildResultsPage() {
    const { childId, category } = useParams<{
        childId: string;
        category: string;
    }>();
    const history = useHistory();
    const user = useMe();
    const child = user?.children.find((_child) => _child._id === childId);

    useEffect(() => {
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
        history.push(`/parent/child/${child?._id || ''}/${value}`);
    }
}

function EmptyProfile() {
    const { t } = useTranslation();

    return <Grid container>{t('child-profile.no-child')}</Grid>;
}
