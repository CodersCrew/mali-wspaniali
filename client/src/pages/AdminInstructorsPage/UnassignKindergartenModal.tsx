import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { TwoActionsModal } from '../../components/Modal/TwoActionsModal';

interface Props {
    onClose: () => void;
    onDelete: (id: string) => void;
    kindergartenId: string;
}

export const UnassignKidnergartenModal = ({ onClose, onDelete, kindergartenId }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() => onDelete(kindergartenId)}
            lowerButtonText={t('admin-instructors-page.unassign-modal.cancel')}
            upperButtonText={t('admin-instructors-page.unassign-modal.unassign')}
            isOpen
            onClose={onClose}
        >
            <Typography variant="h4" className={classes.title}>
                {t('admin-instructors-page.unassign-modal.title')}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {t('admin-instructors-page.unassign-modal.description')}
            </Typography>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            paddingBottom: theme.spacing(2),
        },
        description: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    }),
);
