import React from 'react';
import { categoriesList } from './BlogCategories';
import { Tabs } from '../../components/Tabs';

type CategoryTabProps = {
    onClick: (value: string) => void;
    active: string;
    values: typeof categoriesList;
};

export const CategoryTabs = ({ onClick, active, values }: CategoryTabProps) => {
    return (
        <Tabs
            value={values.findIndex(tab => tab.key === active)}
            onChange={() => {}}
            onTabChange={(value: any) => onClick(categoriesList[value].key)}
            values={values.map(category => ({ label: category.name }))}
        />
    );
};
