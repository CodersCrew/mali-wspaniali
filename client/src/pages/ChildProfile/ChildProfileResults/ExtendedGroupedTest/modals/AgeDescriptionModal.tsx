import React from 'react';
import { DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../../../../components/Modal/BasicModal';
import { ChildInput } from '../../../../../graphql/types';
import { ActionDialog, openDialog } from '../../../../../utils/openDialog';

const T_GROUP_PREFIX = 'child-profile.age-group-description';

type AgeDescriptionModalProps = {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
};

const AgeDescriptionModal = ({
    onClose,
    makeDecision,
}: AgeDescriptionModalProps & ActionDialog<{ child: ChildInput }>) => {
    const { t } = useTranslation();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onAction={() => console.log('')}
            onClose={onClose}
            isCancelButtonVisible={false}
            dialogProps={{ maxWidth: 'sm' }}
        >
            <DialogTitle>{t(`${T_GROUP_PREFIX}.title`)}</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>{t(`${T_GROUP_PREFIX}.subtitle`)}</Typography>
                <Typography gutterBottom>
                    {t(`${T_GROUP_PREFIX}.text-1`)} <strong>{t(`${T_GROUP_PREFIX}.age-1`)} </strong>{' '}
                    {t(`${T_GROUP_PREFIX}.text-2`)} <strong>{t(`${T_GROUP_PREFIX}.age-2`)} </strong>{' '}
                    {t(`${T_GROUP_PREFIX}.text-3`)} <strong>{t(`${T_GROUP_PREFIX}.age-3`)} </strong>{' '}
                    {t(`${T_GROUP_PREFIX}.text-4`)}
                </Typography>
            </DialogContent>
        </BasicModal>
    );
};

export const openAgeDescriptionModal = (props: AgeDescriptionModalProps) => {
    return openDialog<AgeDescriptionModalProps>(AgeDescriptionModal, props);
};
