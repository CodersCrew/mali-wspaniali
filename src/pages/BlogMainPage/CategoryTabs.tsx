import React, { Dispatch, SetStateAction } from 'react';
import { Tabs, withStyles } from '@material-ui/core';
import { StyledTab } from './StyledTab';
import { categoriesList } from './BlogCategories';

export type CategoryTabProps = {
    setCategory: Dispatch<SetStateAction<string>>;
};

export const CategoryTabs = ({ setCategory }: CategoryTabProps) => {
    const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTabIndex(newValue);
        setCategory(categoriesList[newValue].key);
    };

    return (
        <StyledTabs value={currentTabIndex} onChange={handleChange}>
            {categoriesList.map(category => {
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
