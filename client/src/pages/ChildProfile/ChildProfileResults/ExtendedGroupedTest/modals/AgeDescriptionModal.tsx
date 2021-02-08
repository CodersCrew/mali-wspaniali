import React from 'react';
import { DialogTitle, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// import { User } from '../../../../../graphql/types';
import { openDialog } from '../../../../../utils/openDialog';
import { BasicModal } from '../../../../../components/Modal/BasicModal';
// import { User } from '../../graphql/types';

const T_GROUP_PREFIX = 'child-profile.age-group-description';

export interface AgeDescriptionModalProps {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
}

const AgeDescriptionModal = ({
    onClose,

    isCancelButtonVisible,
}: AgeDescriptionModalProps<{}>) => {
    const { t } = useTranslation();
    // const classes = useStyles();

    return (
        <BasicModal
            closeButtonText={t('parent-settings.modal-delete-account.first-button')}
            actionName={t('parent-settings.modal-delete-account.second-button')}
            isOpen={true}
            onAction={() => console.log('')}
            onClose={onClose}
            isCancelButtonVisible={isCancelButtonVisible}
            // isActionButtonSecondary
            // dialogProps={{ maxWidth: 'xs' }}
        >
            <DialogTitle>{t('child-profile.age-group-description.title')}</DialogTitle>
            <Typography gutterBottom>{t('child-profile.age-group-description.subtitle')}</Typography>
            <Typography gutterBottom>
                {t(`${T_GROUP_PREFIX}.text-1`)} <strong>{t(`${T_GROUP_PREFIX}.age-1`)} </strong>{' '}
                {t(`${T_GROUP_PREFIX}.text-2`)} <strong>{t(`${T_GROUP_PREFIX}.age-2`)} </strong>{' '}
                {t(`${T_GROUP_PREFIX}.text-3`)} <strong>{t(`${T_GROUP_PREFIX}.age-3`)} </strong>{' '}
                {t(`${T_GROUP_PREFIX}.text-4`)}
            </Typography>
        </BasicModal>
    );
};

// const useStyles = makeStyles((theme: Theme) => ({
//     header: { marginBottom: theme.spacing(2) },
//     mail: { marginTop: theme.spacing(2) },
// }));

export const openAgeDescriptionModal = (props: AgeDescriptionModalProps) => {
    return openDialog<AgeDescriptionModalProps>(AgeDescriptionModal, props);
};
