import React, { FC } from 'react';
import { Tabs as MuiTabs, makeStyles, createStyles, Theme, TabsProps } from '@material-ui/core/';
import { Tab } from './Tab';

type contentType = {
    value: string;
    label: string;
};

export const Tabs: FC<TabsProps> = ({ children, ...props }) => {
    const classes = useStyles();
    let content: contentType[] | null;

    if (children) {
        content = children as contentType[];
    }

    return (
        <MuiTabs classes={{ flexContainer: classes.flexContainer, indicator: classes.indicator }} {...props}>
            {content!.map((contentItem: contentType) => (
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
