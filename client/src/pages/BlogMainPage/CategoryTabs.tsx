import React from 'react';
import { categoriesList } from './BlogCategories';
import { Tab } from '../../components/Tab';
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
            onChange={(event: React.ChangeEvent<{}>, value: any) => onClick(categoriesList[value].key)}
        >
            {values.map(category => {
                return <Tab key={category.name} label={category.name} />;
            })}
        </Tabs>
    );
};
