import { makeStyles, Typography, Paper, Theme, alpha } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
    firstName: string;
    PictureComponent: React.ReactElement;
    onClick: () => void;
    isActive?: boolean;
}

export function ChildCard({ firstName, PictureComponent, onClick, isActive }: Props) {
    const classes = useStyles();

    return (
        <Paper className={isActive ? clsx(classes.activeImg, classes.container) : classes.container} onClick={onClick}>
            {PictureComponent}
            <Typography className={classes.name} variant="subtitle2">
                {firstName}
            </Typography>
        </Paper>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 12,

        '&:hover': {
            cursor: 'pointer',
            opacity: 0.8,
            boxShadow: '0 0 2px 0px #fff',
            transition: 'all 0.3s ease-in-out',
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
    },
    activeImg: {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
    name: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            marginTop: 0,
        },
    },
}));
