import React, { FC } from 'react';
import { Tabs as MuiTabs, makeStyles, createStyles, Theme, TabsProps } from '@material-ui/core/';
import { Tab } from './Tab';

export const Tabs: FC<TabsProps> = ({ children, ...props }) => {
    const classes = useStyles();
    let content: Array<{}> | null;

    if (children) {
        content = children as Array<{}>;
    }

    return (
        <MuiTabs classes={{ flexContainer: classes.flexContainer, indicator: classes.indicator }} {...props}>
            {content!.map((contentItem: any) => (
                <Tab key={contentItem.label} value={contentItem.value} label={contentItem.label} />
            ))}
        </MuiTabs>
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
