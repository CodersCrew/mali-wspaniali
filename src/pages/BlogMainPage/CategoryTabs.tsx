import React from 'react';
import { Tabs, withStyles } from '@material-ui/core';
import { StyledTab } from './StyledTab';

const categories = [
    { name: 'Wszystkie', color: 'orange' },
    { name: 'Żywienie', color: 'yellow' },
    { name: 'Aktywność fizyczna', color: 'purple' },
    { name: 'Emocje', color: 'lightOrange' },
    { name: 'Inne', color: 'blue' }
];

export const CategoryTabs = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (

        <StyledTabs value={value} onChange={handleChange}>
            {categories.map((category) => {
                return <StyledTab key={category.name} label={category.name} color={category.color} />;
            })}
        </StyledTabs>
    );

};

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
    flexContainer: {
        alignItems: 'flex-end'
    },
    indicator: {
        display: 'none',
    },

})((props: StyledTabsProps) => <Tabs {...props} />);

