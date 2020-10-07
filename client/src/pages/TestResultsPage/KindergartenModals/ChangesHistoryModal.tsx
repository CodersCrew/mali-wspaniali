import React, { useState } from 'react';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Theme } from '@material-ui/core/styles';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { BasicModal } from '../../../components/Modal/BasicModal';

export const ChangesHistoryModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <ButtonSecondary variant="outlined" onClick={() => setIsOpen(true)}>
                {t('test-results.changes-history')}
            </ButtonSecondary>
            <BasicModal isOpen={isOpen} actionName={t('close')} onAction={() => setIsOpen(false)}>
                <div className={classes.container}>
                    <Typography variant="h4" className={classes.title}>
                        {t('test-results.changes-history')}
                    </Typography>
                </div>
            </BasicModal>
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
    }),
);
