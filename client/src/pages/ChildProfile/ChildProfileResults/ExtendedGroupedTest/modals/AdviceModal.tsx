import React from 'react';
import { createStyles, DialogContent, DialogTitle, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../../../../components/Modal/BasicModal';
import { ChildInput } from '../../../../../graphql/types';
import { ActionDialog, openDialog } from '../../../../../utils/openDialog';
import { mainColor } from '../../../../../colors';

const T_ADVICE_PREFIX = 'child-profile.advice-modal-content';

type AdviceModalProps = {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
    resultKey: string;
};

const AdviceModal = ({ onClose, makeDecision, resultKey }: AdviceModalProps & ActionDialog<{ child: ChildInput }>) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onAction={() => console.log('')}
            onClose={onClose}
            isCancelButtonVisible={false}
            dialogProps={{ maxWidth: 'sm' }}
        >
            <DialogTitle>{t(`${T_ADVICE_PREFIX}.${resultKey}.title`)}</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>{t(`${T_ADVICE_PREFIX}.${resultKey}.subtitle`)}</Typography>
                <Typography gutterBottom variant={'body2'}>
                    {t(`${T_ADVICE_PREFIX}.${resultKey}.text-1`)}
                </Typography>
                <Typography gutterBottom variant={resultKey === 'medium' ? 'subtitle2' : 'body2'}>
                    {t(`${T_ADVICE_PREFIX}.${resultKey}.text-2`)}{' '}
                    <strong className={classes.link}>{t(`${T_ADVICE_PREFIX}.${resultKey}.text-2-1`)} </strong>{' '}
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
        // card: {
        //     width: '25%',
        //     display: 'flex',
        //     padding: '0px 8px 20px 8px',
        //     flexDirection: 'column',

        // resultDescription: {
        //     textAlign: 'center',
        //     fontFamily: 'Montserrat',
        //     fontSize: '14px',
        //     textTransform: 'uppercase',
        //     marginBottom: '15px',
        //     fontWeight: 'bold',
        // },
        link: {
            color: mainColor,
        },
    }),
);
