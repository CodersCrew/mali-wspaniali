import { Box, createStyles, alpha, Grid, ListItem, makeStyles, Theme, Typography } from '@material-ui/core';
import { BarChart, KeyboardArrowRight } from '@material-ui/icons';
import clsx from 'clsx';
import { Child } from '@app/graphql/types';
import { CountIcon } from '@app/components/CountIcon';

interface Props {
    child: Child;
    progress: number;
    selected: boolean;
    onClick: (value: string) => void;
}

export function ChildItem({ child, progress, selected, onClick }: Props) {
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
            <Grid container alignItems="center">
                <Grid item xs={3} sm={3} md={2}>
                    <Box display="flex" alignItems="center">
                        <Grid container alignItems="center">
                            <Grid item xs={6} sm={6}>
                                <BarChart
                                    className={clsx({ [classes.chartIcon]: true, [classes.active]: progress !== 0 })}
                                />
                            </Grid>

                            <Grid item xs={6} sm={6}>
                                <CountIcon value={progress} max={4} />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={8} sm={8} md={9}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2">{`${child.lastname}, ${child.firstname}`}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={1}>
                    <KeyboardArrowRight className={classes.arrowIcon} />
                </Grid>
            </Grid>
        </ListItem>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartIcon: {
            color: theme.palette.text.secondary,
        },
        active: {
            color: theme.palette.success.main,
        },
        arrowIcon: {
            color: theme.palette.text.secondary,
        },
        listItemRoot: {
            '&:hover': {
                backgroundColor: `${alpha(theme.palette.primary.main, 0.08)} !important`,
            },
        },
        listItemSelected: {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.08)} !important`,
        },
    }),
);
