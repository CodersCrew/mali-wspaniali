import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const ExcelModal = ({ isOpen, setIsOpen }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <TwoActionsModal
            lowerButtonOnClick={() => setIsOpen(false)}
            upperButtonOnClick={() => console.log('add excel')}
            lowerButtonText={t('test-results.cancel')}
            upperButtonText={t('test-results.confirm')}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t('test-results.add-data')}
                </Typography>
                <Typography variant="body1" className={classes.description}>
                    {t('test-results.add-data-description')}
                </Typography>
            </div>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 684,
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
