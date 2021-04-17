import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { CustomTypography } from './CustomTypography';

export function CountIcon({ value, max }: { value: number; max: number }) {
    const classes = useStyles();

    if (value === 0) return null;

    if (value === max) return <Done fontSize="small" className={classes.icon} />;

    return <CustomTypography variant="body2" color="success" text={`${value}/${max}`} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: theme.palette.success.dark,
        },
    }),
);
