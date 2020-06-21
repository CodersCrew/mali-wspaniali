import React, { useState } from 'react';
import { Tabs, withStyles, createStyles, ThemeProvider } from '@material-ui/core';
import { StyledTab } from './StyledTab';
import { categoriesList } from './BlogCategories';
import { theme } from '../../theme';

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
        <ThemeProvider theme={theme}>
            <StyledTabs value={currentTabIndex} onChange={handleChange}>
                {categoriesList.map(category => {
                    return <StyledTab key={category.name} label={category.name} color={category.color} />;
                })}
            </StyledTabs>
        </ThemeProvider>
    );
};

const StyledTabs = withStyles(createStyles({
    flexContainer: {
        alignItems: 'flex-end',
        marginLeft: '3%',

        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    indicator: {
        display: 'none',
    },
}))(Tabs);
