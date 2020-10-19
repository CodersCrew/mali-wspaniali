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
    clearCurrentKindergarten: () => void;
}

export const KindergartenDeleteModal = ({
    isOpen,
    onClose,
    onDelete,
    clearCurrentKindergarten,
    kindergarten,
}: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const { _id, number, name, address, city } = kindergarten;

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() => {
                onDelete(_id);
                clearCurrentKindergarten();
                onClose();
            }}
            lowerButtonText={t('test-results.cancel')}
            upperButtonText={t('test-results.delete')}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={classes.container}>
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
            </div>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 448,
        },
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
