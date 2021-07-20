import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Paper } from '@material-ui/core';

import { Kindergarten } from '../../../graphql/types';

interface Props {
    defaultKindergartens: Array<{ kindergarten: Kindergarten; selected: boolean; disabled: boolean }>;
    selected: string[];
    onSelect: (id: string[]) => void;
}

function not(a: any, b: any) {
    return a.filter((value: any) => b.indexOf(value) === -1);
}

function intersection(a: any[], b: string | any[]) {
    return a.filter((value: any) => b.indexOf(value) !== -1);
}

export function KindergartenTransferList({ defaultKindergartens, selected, onSelect }: Props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3]);
    const [right, setRight] = React.useState([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: never) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (items: Kindergarten[]) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((kindergarten: Kindergarten, index: number) => {
                    const labelId = `transfer-list-item-${kindergarten?._id}-label`;

                    return (
                        <ListItem
                            key={kindergarten?.number}
                            role="listitem"
                            button
                            onClick={handleToggle(kindergarten)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(kindergarten as never) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={kindergarten?.name} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(defaultKindergartens.map((kinder) => kinder.kindergarten))}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(defaultKindergartens.filter((kinder) => kinder.selected === true))}</Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));
