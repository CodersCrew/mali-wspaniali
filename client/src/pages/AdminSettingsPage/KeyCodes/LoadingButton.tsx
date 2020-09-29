import { CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { ButtonSecondary } from '../../../components/Button';

interface Props {
    text: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
}

export function LoadingButton({ text, isLoading, isDisabled, onClick }: Props) {
    const classes = useStyles();

    return (
        <span className={classes.wrapper}>
            <ButtonSecondary disabled={isDisabled} onClick={onClick} variant="contained">
                {text}
            </ButtonSecondary>
            {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </span>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonProgress: {
            color: theme.palette.success.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        wrapper: {
            position: 'relative',
        },
    }),
);
