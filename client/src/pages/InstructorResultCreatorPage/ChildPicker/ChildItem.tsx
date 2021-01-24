import React from 'react';
import { createStyles, fade, ListItem, makeStyles, Theme, Typography } from '@material-ui/core';
import { BarChart, KeyboardArrowRight } from '@material-ui/icons';

import { Child } from '../../../graphql/types';

interface Props {
    child: Child;
    selected: boolean;
    onClick: (value: string) => void;
}

export function ChildItem({ child, selected, onClick }: Props) {
    const classes = useStyles();

    return (
        <ListItem
            button
            divider
            classes={{
                root: classes.listItemRoot,
                selected: classes.listItemSelected,
            }}
            onClick={() => onClick(child._id)}
            selected={selected}
        >
            <BarChart className={classes.chartIcon} />{' '}
            <span className={classes.childButton}>
                <Typography variant="body2">
                    {child.firstname} {child.lastname}
                </Typography>
            </span>
            <KeyboardArrowRight className={classes.arrowIcon} />
        </ListItem>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartIcon: {
            marginRight: theme.spacing(3),
            color: theme.palette.text.secondary,
        },
        arrowIcon: {
            color: theme.palette.text.secondary,
        },
        childButton: {
            flex: 1,
        },
        listItemRoot: {
            '&:hover': {
                backgroundColor: `${fade(theme.palette.primary.main, 0.08)} !important`,
            },
        },
        listItemSelected: {
            backgroundColor: `${fade(theme.palette.primary.main, 0.08)} !important`,
        },
    }),
);
