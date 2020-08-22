import React from 'react';
import { Tabs as MuiTabs, makeStyles, createStyles, Theme, TabsProps } from '@material-ui/core';
import { Tab } from './Tab';

type ContentType = {
    label: string;
    value?: string;
};

interface Props extends TabsProps {
    values: ContentType[];
}

export const Tabs = ({ values, ...props }: Props) => {
    const classes = useStyles();

    return (
        <MuiTabs classes={{ flexContainer: classes.flexContainer, indicator: classes.indicator }} {...props}>
            {values.map(({ label, value }, index) => (
                <Tab key={`${index} ${value}`} value={value} label={label} />
            ))}
        </MuiTabs>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            alignItems: 'flex-end',
            marginTop: '3%',
            backgroundColor: theme.palette.primary.contrastText,
            border: `1px solid ${theme.palette.text.secondary}`,

            [theme.breakpoints.down('md')]: {
                // display: 'none',
            },
        },
        indicator: {
            display: 'none',
        },
    }),
);
