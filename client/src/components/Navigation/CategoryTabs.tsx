import React from 'react';
import { CategoryItem } from '../../pages/ArticleListPage/BlogCategories';
import { Tabs } from '../Tabs/Tabs';
import { ChildProfileCategoryItem } from '../../pages/ChildProfile/ChildProfileCategory';

interface Props<T extends CategoryItem | ChildProfileCategoryItem> {
    onClick: (value: string) => void;
    active: string;
    values: T[];
}

export function CategoryTabs<
    T extends CategoryItem | ChildProfileCategoryItem
>({ onClick, active, values }: Props<T>) {
    return (
        <Tabs
            value={values.find((tab) => tab.key === active)?.key}
            onTabsChange={(value) => {
                onClick(value);
            }}
            values={values.map((category) => ({
                label: category.name,
                value: category.key,
            }))}
            variant="fullWidth"
        />
    );
}
