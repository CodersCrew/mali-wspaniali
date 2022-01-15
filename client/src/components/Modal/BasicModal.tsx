import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogProps, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { ButtonPrimary, ButtonSecondary, ButtonDefault } from '../Button';
import { useIsDevice } from '../../queries/useBreakpoints';

interface Props {
    isOpen: boolean;
    actionName?: string;
    onAction?: () => void;
    onClose?: (e: unknown) => void;
    closeButtonText?: string;
    isCancelButtonVisible?: boolean;
    isActionButtonSecondary?: boolean;
    isActionButtonVisible?: boolean;
    dialogProps?: Partial<DialogProps>;
}

export const BasicModal: React.FC<Props> = ({
    isOpen,
    actionName,
    onAction,
    onClose,
    children,
    closeButtonText,
    isCancelButtonVisible,
    isActionButtonSecondary,
    isActionButtonVisible,
    dialogProps,
}) => {
    const { t } = useTranslation();

    const ActionButton = isActionButtonSecondary ? ButtonSecondary : ButtonPrimary;
    const classes = useStyles();
    const device = useIsDevice();

    return (
        <Dialog
            maxWidth="md"
            open={isOpen}
            classes={{
                paper: clsx({
                    [classes.dialogPaperMaxSize]: !device.isSmallMobile,
                    [classes.paperContainer]: !device.isSmallMobile,
                    [classes.paperContainerSmall]: device.isSmallMobile,
                }),
                container: clsx({ [classes.container]: device.isSmallMobile }),
            }}
            fullScreen={device.isSmallMobile}
            onClose={onClose}
            {...dialogProps}
        >
            <DialogContent className={classes.contentScrollbar}>{children}</DialogContent>
            <DialogActions>
                {isCancelButtonVisible && (
                    <ButtonDefault
                        variant="text"
                        onClick={onClose}
                        color={isActionButtonVisible ? 'inherit' : 'primary'}
                    >
                        {closeButtonText || t('add-child-modal.cancel')}
                    </ButtonDefault>
                )}
                {isActionButtonVisible && (
                    <ActionButton variant="text" onClick={onAction}>
                        {actionName}
                    </ActionButton>
                )}
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    dialogPaperMaxSize: {
        maxHeight: '80vh',
    },
    paperContainer: {
        padding: theme.spacing(3),
    },
    paperContainerSmall: {
        padding: theme.spacing(3, 2),
    },
    smallDialogPaper: {
        padding: theme.spacing(3, 2),
    },
    contentScrollbar: {
        overflowY: 'unset',
        padding: 0,
        '&:first-child': {
            paddingTop: 0,
        },
    },
    container: {
        padding: theme.spacing(2),
    },
}));
