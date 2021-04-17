import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent, makeStyles, createStyles } from '@material-ui/core';

import { ButtonDefault , ButtonPrimary } from '../Button';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    upperButtonOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    upperButtonText: string;
    lowerButtonOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    lowerButtonText: string;
}

export const TwoActionsModal: FC<Props> = ({
    isOpen,
    onClose,
    children,
    upperButtonOnClick,
    lowerButtonOnClick,
    upperButtonText,
    lowerButtonText,
}) => {
    const classes = useStyles();

    return (
        <>
            <Dialog maxWidth="md" open={isOpen} onClose={onClose}>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <div className={classes.buttonsWrapper}>
                        <ButtonDefault className={classes.button} variant="text" onClick={lowerButtonOnClick}>
                            {lowerButtonText}
                        </ButtonDefault>
                        <ButtonPrimary className={classes.button} variant="text" onClick={upperButtonOnClick}>
                            {upperButtonText}
                        </ButtonPrimary>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        buttonsWrapper: {
            display: 'flex',
            justifyItems: 'center',
            '& > :not(:first-child)': {
                marginLeft: 0,
            },
        },
        button: {
            maxWidth: 264,
            padding: '8px',
        },
    }),
);
