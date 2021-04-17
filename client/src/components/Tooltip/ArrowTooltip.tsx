import { makeStyles, Theme, Tooltip, TooltipProps } from '@material-ui/core';

export function ArrowTooltip(props: TooltipProps) {
    const classes = useStyles();

    return <Tooltip arrow placement="top" classes={classes} {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));
