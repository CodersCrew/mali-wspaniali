import React from 'react';
import { categoriesList } from './BlogCategories';
import { Tabs } from '../../components/Tabs';

interface Props {
    onClick: (value: string) => void;
    active: string;
    values: typeof categoriesList;
}

export function CategoryTabsMobile({ onClick, active, values }: Props) {
    return (
        <Tabs
            value={values.find(tab => tab.key === active)?.key}
            onChange2={(value) => {
                onClick(value)
            }}
            values={values.map(category => ({ label: category.name, value: category.key }))}
            indicatorColor="primary"
            variant="fullWidth"
        />
    );
};