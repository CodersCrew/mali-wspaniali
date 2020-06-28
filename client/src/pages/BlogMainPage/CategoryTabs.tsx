import React from 'react';
import { Tabs, withStyles } from '@material-ui/core';
import { StyledTab } from './StyledTab';
import { categoriesList } from './BlogCategories';

type CategoryTabProps = {
    onClick: (value: string) => void;
    active: string;
    values: typeof categoriesList;
};

export const CategoryTabs = ({ onClick, active, values }: CategoryTabProps) => {
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        onClick(categoriesList[newValue].key);
    };

    return (
        <StyledTabs value={values.findIndex(tab => tab.key === active)} onChange={handleChange}>
            {values.map(category => {
                return <StyledTab key={category.name} label={category.name} color={category.color} />;
            })}
        </StyledTabs>
    );
};

type StyledTabsProps = {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
};

const StyledTabs = withStyles({
    flexContainer: {
        alignItems: 'flex-end',
        marginLeft: '3%',
    },
    indicator: {
        display: 'none',
    },
})((props: StyledTabsProps) => <Tabs {...props} />);
