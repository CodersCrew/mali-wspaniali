import React from 'react';
import { createStyles, DialogContent, DialogTitle, Link, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../../../../components/Modal/BasicModal';
import { ChildInput } from '../../../../../graphql/types';
import { ActionDialog, openDialog } from '../../../../../utils/openDialog';

const T_ADVICE_PREFIX = 'child-profile.advice-modal-content';

type AdviceModalProps = {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
    resultKey: string;
    childId?: string;
};

const AdviceModal = ({
    onClose,
    preventClose,
    resultKey,
    childId,
}: AdviceModalProps & ActionDialog<{ child: ChildInput }>) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onClose={() => {
                if (!preventClose) {
                    onClose();
                }
            }}
            isCancelButtonVisible={true}
            dialogProps={{ maxWidth: 'sm' }}
            closeButtonText={'zamknij'}
            isActionButtonSecondary={false}
        >
            <DialogTitle>{t(`${T_ADVICE_PREFIX}.${resultKey}.title`)}</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>{t(`${T_ADVICE_PREFIX}.${resultKey}.subtitle`)}</Typography>
                <Typography gutterBottom variant={'body2'}>
                    {t(`${T_ADVICE_PREFIX}.${resultKey}.text-1`)}
                </Typography>
                <Typography gutterBottom variant={resultKey === 'medium' ? 'subtitle2' : 'body2'}>
                    {t(`${T_ADVICE_PREFIX}.${resultKey}.text-2`)}{' '}
                    <Link className={classes.link} href={`/parent/child/${childId}/tests-information`} underline="none">
                        {t(`${T_ADVICE_PREFIX}.${resultKey}.text-2-1`)}{' '}
                    </Link>
                    {t(`${T_ADVICE_PREFIX}.${resultKey}.text-2-2`)}
                </Typography>
                {(resultKey === 'bad' || resultKey === 'medium') && (
                    <Typography gutterBottom variant={resultKey === 'bad' ? 'subtitle2' : 'body2'}>
                        {t(`${T_ADVICE_PREFIX}.${resultKey}.text-3`)}{' '}
                        <strong className={classes.link}>{t(`${T_ADVICE_PREFIX}.${resultKey}.text-3-1`)} </strong>{' '}
                    </Typography>
                )}
            </DialogContent>
        </BasicModal>
    );
};

export const openAdviceModal = (props: AdviceModalProps) => {
    return openDialog<AdviceModalProps>(AdviceModal, props);
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            color: theme.palette.primary.main,
        },
    }),
);
