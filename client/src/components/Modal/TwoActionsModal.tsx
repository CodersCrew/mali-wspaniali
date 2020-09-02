import React, { ReactElement } from 'react';
import { Dialog, DialogActions, DialogContent, makeStyles, createStyles } from '@material-ui/core';
import { ButtonSecondary } from '../Button/ButtonSecondary';

interface Props {
    isOpen: boolean;
    handleModalClose: () => void;
    children?: ReactElement;
    upperButtonOnClick: (event: any) => void;
    upperButtonText: string;
    lowerButtonOnClick: (event: any) => void;
    lowerButtonText: string;
}

export const TwoActionsModal = ({ isOpen, handleModalClose, children, upperButtonOnClick, lowerButtonOnClick, upperButtonText, lowerButtonText }: Props) => {
    const classes = useStyles();

    return (
        <>
            <Dialog maxWidth="md" open={isOpen} onClose={handleModalClose}>
                <DialogContent>
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
