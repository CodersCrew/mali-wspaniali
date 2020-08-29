import React from 'react';
import { Tabs as MuiTabs, makeStyles, createStyles, Theme, TabsProps } from '@material-ui/core';
import { Tab } from './Tab';

type ContentType = {
    label: string;
    value?: string;
};

interface Props extends TabsProps {
    values: ContentType[];
    onChange2: <T extends string>(value: T) => void;
    value?: string;
}

export const Tabs = (props: Props) => {
    const classes = useStyles();

    return (
        <MuiTabs
            classes={{ flexContainer: classes.flexContainer }}
            value={props.value}
            onChange={(_e: React.ChangeEvent<{}>, v) => {
                props.onChange2(v);
            }}
            scrollButtons="auto"
        >
            {props.values.map(({ label, value }) => (
                <Tab key={label} value={value} label={label} classes={{ root: classes.singleTab }} selected={true} />
            ))}
        </MuiTabs>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            alignItems: 'flex-end',
            backgroundColor: theme.palette.primary.contrastText,
        },
        indicator: {
            // display: 'none',
        },
        singleTab: {
            // height: 45,
        },
    }),
);
