import React from 'react';
import { CategoryItem } from './BlogCategories';
import { Tabs } from '../../components/Tabs';
import { ChildProfileCategoryItem } from '../ChildProfile/ChildProfileCategory';
import { theme } from '../../theme/theme';

interface Props<T extends CategoryItem | ChildProfileCategoryItem> {
    onClick: (value: string) => void;
    active: string;
    values: T[];
}

export function CategoryTabsMobile<
    T extends CategoryItem | ChildProfileCategoryItem
>({ onClick, active, values }: Props<T>) {
    return (
        <Tabs
            value={values.find((tab) => tab.key === active)?.key}
            onChange2={(value) => {
                onClick(value);
            }}
            values={values.map((category) => ({
                label: category.name,
                value: category.key,
            }))}
            variant="scrollable"
            scrollButtons="on"
            indicator={theme.palette?.text?.primary!}
        />
    );
}
