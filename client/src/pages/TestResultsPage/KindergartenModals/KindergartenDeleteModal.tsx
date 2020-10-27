import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onDelete: (id: string) => void;
    kindergarten: Kindergarten;
}

export const KindergartenDeleteModal = ({ isOpen, onClose, onDelete, kindergarten }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const { _id, number, name, address, city } = kindergarten;

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() => {
                onDelete(_id);
                onClose();
            }}
            lowerButtonText={t('test-results.cancel')}
            upperButtonText={t('test-results.delete')}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Typography variant="h4" className={classes.title}>
                {t('delete-kindergarten-modal.title')}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {t('delete-kindergarten-modal.question', {
                    prefix: t('test-results.kindergarten-prefix'),
                    number,
                    name,
                    address,
                    city,
                })}
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
