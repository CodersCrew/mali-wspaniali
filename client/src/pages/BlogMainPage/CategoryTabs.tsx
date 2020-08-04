import React from 'react';
import { Tabs, makeStyles, createStyles, Theme } from '@material-ui/core';
import { categoriesList } from './BlogCategories';
import { BaseTab } from '../../components/BaseTab';

type CategoryTabProps = {
    onClick: (value: string) => void;
    active: string;
    values: typeof categoriesList;
};

export const CategoryTabs = ({ onClick, active, values }: CategoryTabProps) => {
    const classes = useStyles();

    return (
        <Tabs
            classes={{ flexContainer: classes.flexContainer, indicator: classes.indicator }}
            value={values.findIndex(tab => tab.key === active)}
            onChange={(_event, value) => onClick(categoriesList[value].key)}
        >
            {values.map(category => {
                return <BaseTab key={category.name} isUseStyle={true} label={category.name} />;
            })}
        </Tabs>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            alignItems: 'flex-end',
            marginLeft: '3%',

            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
        indicator: {
            display: 'none',
        },
    }),
);
