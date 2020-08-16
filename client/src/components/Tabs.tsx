import React from 'react';
import { Tabs as MuiTabs, makeStyles, createStyles, Theme, TabsProps } from '@material-ui/core/';
import { Tab } from './Tab';

type ContentType = {
    label: string;
    value?: string;
};

interface Props {
    values: ContentType[];
}

export const Tabs = ({ values, ...props }: TabsProps & Props) => {
    const classes = useStyles();

    return (
        <MuiTabs classes={{ flexContainer: classes.flexContainer, indicator: classes.indicator }} {...props}>
            {values.map(({ label, value }) => (
                <Tab key={label} value={value} label={label} />
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
                //display: 'none',
            },
        },
        indicator: {
            display: 'none',
        },
    }),
);
