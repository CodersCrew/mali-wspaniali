import { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogProps, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ButtonPrimary, ButtonSecondary, ButtonDefault } from '../Button';

interface Props {
    isOpen: boolean;
    actionName: string;
    onAction?: () => void;
    onClose?: (e: unknown) => void;
    closeButtonText?: string;
    isCancelButtonVisible?: boolean;
    isActionButtonSecondary?: boolean;
    isActionButtonVisible?: boolean;
    dialogProps?: Partial<DialogProps>;
}

export const BasicModal: FC<Props> = ({
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

    return (
        <Dialog maxWidth="md" open={isOpen} classes={{ paper: classes.dialogPaper }} onClose={onClose} {...dialogProps}>
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

const useStyles = makeStyles(() => ({
    dialogPaper: {
        maxHeight: '80vh',
    },
    contentScrollbar: {
        overflowY: 'unset',
    },
}));
