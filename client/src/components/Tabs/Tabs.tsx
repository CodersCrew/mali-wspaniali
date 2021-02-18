import React from 'react';
import { Tabs as MuiTabs, makeStyles, createStyles, TabsProps } from '@material-ui/core';
import { Tab } from './Tab';
import { Theme } from '../../theme/types';

type ContentType = {
    label: string;
    value?: string;
};

interface Props extends TabsProps {
    values: ContentType[];
    onTabsChange: (value: string) => void;
    value?: string;
    indicator: string;
}

export const Tabs = ({ value, onTabsChange, values, indicator, ...props }: Props) => {
    const classes = useStyles({ indicator });

    return (
        <MuiTabs
            classes={{
                flexContainer: classes.flexContainer,
                indicator: classes.indicator,
            }}
            value={value}
            onChange={(_e: React.ChangeEvent<{}>, v: string) => {
                onTabsChange(v);
            }}
            {...props}
        >
            {values.map(({ label, value: v }) => (
                <Tab key={label} value={v} label={label} />
            ))}
        </MuiTabs>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            alignItems: 'flex-end',
            backgroundColor: 'theme.palette.primary.contrastText',
            marginLeft: theme.spacing(3),
        },
        indicator: {
            backgroundColor: ({ indicator }: { indicator: string }) => indicator,
        },
    }),
);
