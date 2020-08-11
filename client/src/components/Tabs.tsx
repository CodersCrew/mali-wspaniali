import React, { FC } from 'react';
import { Tabs as MuiTabs, makeStyles, createStyles, Theme, TabsProps } from '@material-ui/core/';

export const Tabs: FC<TabsProps> = ({ ...props }) => {
    const classes = useStyles();

    return (
        <MuiTabs classes={{ flexContainer: classes.flexContainer, indicator: classes.indicator }} {...props}></MuiTabs>
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
