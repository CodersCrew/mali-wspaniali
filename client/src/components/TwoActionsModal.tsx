import React, { ReactElement } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from './Button/ButtonSecondary';

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
    dialogTitle?: string;
    dialogContentText?: string;
    children?: ReactElement;
    upperButtonOnClick: (event: any) => void;
    upperButtonText: string;
    lowerButtonOnClick: (event: any) => void;
    lowerButtonText: string;
}

export const TwoActionsModal = ({ isOpen, handleModalClose, dialogTitle, dialogContentText, children, upperButtonOnClick, lowerButtonOnClick, upperButtonText, lowerButtonText }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Dialog maxWidth="md" open={isOpen} onClose={handleModalClose}>
                <DialogTitle>{dialogTitle && t(dialogTitle)}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogContentText}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <div className={classes.buttonsWrapper}>
                        <ButtonSecondary className={classes.button} variant="contained" onClick={upperButtonOnClick}>
                            {upperButtonText}
                        </ButtonSecondary>
                        <ButtonSecondary className={classes.button} variant="text" onClick={lowerButtonOnClick}>
                            {lowerButtonText}
                        </ButtonSecondary>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};


const useStyles = makeStyles(() =>
    createStyles({
        buttonsWrapper: {
            padding: '0 78px',
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            '& > :not(:first-child)': {
                marginLeft: 0,
            },
        },
        button: {
            maxWidth: 264,
            padding: '8px',
            marginBottom: 16,
        },
    }),
);
