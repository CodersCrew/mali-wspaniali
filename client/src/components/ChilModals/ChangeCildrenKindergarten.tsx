import { Typography, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import { BasicModal } from '../Modal/BasicModal';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { ChildModalProps } from './ChildModalTypes';
import { Child } from '../../graphql/types';
import { ChangeKindergartenModal } from '../ChildForm/ChangeKindergartenForm';

interface TInitialObjectType {
    firstname: string;
    lastname: string;
    id: string;
    kindergarden: string;
    kindergardenName: string;
}

const normalizeTransformKindergarten = (child: Child) => {
    const kindergarden = child.kindergarten._id;
    const id = child._id;
    const kindergardenName = child.kindergarten.name;
    const { firstname, lastname } = child;

    return { kindergarden, id, firstname, lastname, kindergardenName };
};

const AdminSettingsEditModal = ({
    onClose,
    makeDecision,
    kindergartens,
    user,
    preventClose,
    isCancelButtonVisible,
}: ChildModalProps & ActionDialog<{ childData: TInitialObjectType[] }>) => {
    const { t } = useTranslation();

    const newObjectChild = user.children.map(normalizeTransformKindergarten);

    const initialValues = {
        childData: newObjectChild,
    };

    const classes = useStyles();

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => {
                makeDecision({ accepted: true, childData: values.childData });
            }}
        >
            {(formik) => (
                <BasicModal
                    actionName={t('user-settings.modal-edit-account.button')}
                    isOpen={true}
                    onAction={formik.handleSubmit}
                    onClose={onClose}
                    isCancelButtonVisible={isCancelButtonVisible}
                    dialogProps={{ maxWidth: 'sm' }}
                >
                    <Typography variant={'h4'}>{t('user-settings.modal-change-kindergarden.header')}</Typography>
                    <Typography variant={'body1'} className={classes.selectKindergardenInput}>
                        {t('user-settings.modal-change-kindergarden.subtitle')}
                    </Typography>
                    <ChangeKindergartenModal formik={formik} kindergartens={kindergartens} />
                </BasicModal>
            )}
        </Formik>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    selectKindergardenInput: { color: theme.palette.text.secondary, margin: theme.spacing(4, 0) },
}));

export const openChanageChildrenKindergarten = (props: ChildModalProps) => {
    return openDialog<ChildModalProps>(AdminSettingsEditModal, props);
};
