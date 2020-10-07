import React, { useState } from 'react';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';

export const AddExcelModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <ButtonSecondary variant="contained" onClick={() => setIsOpen(true)}>
                {t('test-results.add-excel')}
            </ButtonSecondary>
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
        </>
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
