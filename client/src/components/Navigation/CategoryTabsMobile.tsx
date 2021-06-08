import { useTranslation } from 'react-i18next';

import { CategoryItem } from '../../pages/ArticleListPage/BlogCategories';
import { Tabs } from '../Tabs/Tabs';
import { ChildProfileCategoryItem } from '../../pages/ChildProfile/ChildProfileCategory';
import { theme } from '../../theme';

interface Props<T extends CategoryItem | ChildProfileCategoryItem> {
    onChange: (value: string) => void;
    currentCategory: string;
    name: string;
    categories: T[];
}

export function CategoryTabsMobile<T extends CategoryItem | ChildProfileCategoryItem>(props: Props<T>) {
    const { t } = useTranslation();
    const T_PREFIX = props.name === 'results' ? 'parent-menu.child' : 'blog-categories';

    return (
        <Tabs
            currentCategory={getCurrentNormalizedCategory()}
            onTabsChange={props.onChange}
            categories={props.categories.map(normalizeCategory)}
            variant="scrollable"
            scrollButtons="on"
            indicator={theme.palette?.text?.primary!}
        />
    );

    function normalizeCategory(category: CategoryItem | ChildProfileCategoryItem) {
        return {
            label: t(`${T_PREFIX}.${category.key}`),
            value: category.key,
        };
    }

    function getCurrentNormalizedCategory() {
        return props.categories.find((tab) => tab.key === props.currentCategory)?.key;
    }
}
