import React from 'react';
import { makeStyles, Typography, Paper, Theme } from '@material-ui/core';

interface Props {
    firstName: string;
    PictureComponent: ReactElement;
    onClick: () => void;
}

export function HomePageChildCard({ firstName, PictureComponent, onClick }: Props) {
    const classes = useStyles();

    return (
        <Paper className={classes.container} onClick={onClick}>
            <span className={classes.picture}>{PictureComponent}</span>
            <Typography variant="subtitle2">{firstName}</Typography>
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
        },
    },
    picture: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            marginBottom: 0,
        },
    },
}));
