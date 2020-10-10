import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { BasicModal } from '../../../components/Modal/BasicModal';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ChangesHistoryModal = ({ isOpen, setIsOpen }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal isOpen={isOpen} actionName={t('close')} onAction={() => setIsOpen(false)}>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t('test-results.changes-history')}
                </Typography>
            </div>
        </BasicModal>
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
