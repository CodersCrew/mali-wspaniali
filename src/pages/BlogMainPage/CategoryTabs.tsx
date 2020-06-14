import React, { useState } from 'react';
import { Tabs, withStyles, createStyles } from '@material-ui/core';
import { StyledTab } from './StyledTab';
import { categoriesList } from './BlogCategories';

type Props = {
    setCategory: (value: string) => void;
};

export const CategoryTabs = ({ setCategory }: Props) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

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

const styles = createStyles({
    flexContainer: {
        alignItems: 'flex-end',
        marginLeft: '3%',
    },
    indicator: {
        display: 'none',
    },
});

const StyledTabs = withStyles(styles)(Tabs);
