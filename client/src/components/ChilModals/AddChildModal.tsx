import { useFormik } from 'formik';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ChildInput } from '../../graphql/types';
import { BasicModal } from '../Modal/BasicModal';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { ChildForm } from '../ChildForm/ChildForm';

import { AddChildModalProps } from './ChildModalTypes';
import { initialValues, validationSchema, normalizeChild } from './utils';

export const openAddChildModal = (options: AddChildModalProps) => {
    return openDialog<AddChildModalProps, { child: ChildInput }>(AddChildModal, options);
};

export function AddChildModal({
    kindergartens,
    isCancelButtonVisible,
    makeDecision,
    onClose,
    preventClose,
}: AddChildModalProps & ActionDialog<{ child: ChildInput }>) {
    const { t } = useTranslation();
    const classes = useStyles();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            makeDecision({ accepted: true, child: normalizeChild(values) });
        },
    });

    return (
        <BasicModal
            isOpen={true}
            actionName={t('add-child-modal.button')}
            onAction={formik.handleSubmit}
            onClose={() => {
                if (!preventClose) {
                    onClose();
                }
            }}
            isCancelButtonVisible={isCancelButtonVisible}
            isActionButtonVisible={true}
        >
            <div className={classes.innerContent}>
                <Typography variant="h4" className={classes.title}>
                    {t('add-child-modal.heading')}
                </Typography>
                <Typography variant="body1" paragraph className={classes.description}>
                    {t('add-child-modal.description')}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <ChildForm kindergartens={kindergartens} formik={formik} />
                </form>
            </div>
        </BasicModal>
    );
}

export const useStyles = makeStyles((theme: Theme) => ({
    innerContent: {
        minHeight: 400,
    },
    description: { marginBottom: theme.spacing(2) },
    title: { marginBottom: theme.spacing(3) },
}));
