import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { BasicModal } from '../Modal/BasicModal';
import { ActionDialog, openDialog } from '../../utils/openDialog';
import { UpdatedUserInput, UpdateInstructorNameResult } from '../../graphql/types';

import { UpdateInstructorNameForm } from './UpdateInstructorNameForm';
import { UpdateInstructorNameModalProps } from './UpdateInstructorName.types';

export const openUpdateInstructorNameModal = (options: UpdateInstructorNameModalProps) => {
    return openDialog<UpdateInstructorNameModalProps, { name: UpdatedUserInput }>(UpdateInstructorNameModal, options);
};

export const UpdateInstructorNameModal = ({
    makeDecision,
    onClose,
    firstname,
    lastname,
    mail,
    preventClose,
}: UpdateInstructorNameModalProps & ActionDialog<{ name: UpdateInstructorNameResult }>) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const initialValues: UpdateInstructorNameModalProps = {
        firstname: firstname || '',
        lastname: lastname || '',
        mail,
    };

    const validationSchema = yup.object({
        firstname: yup.string().required(t('add-instructor-name-modal.first-name-required')),
        lastname: yup.string().required(t('add-instructor-name-modal.last-name-required')),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            makeDecision({ accepted: true, name: { firstname: values.firstname, lastname: values.lastname } });
        },
    });

    return (
        <BasicModal
            isOpen={true}
            actionName={t('add-instructor-name-modal.button')}
            onAction={formik.handleSubmit}
            isCancelButtonVisible={false}
            isActionButtonVisible
            onClose={() => {
                if (!preventClose) {
                    onClose();
                }
            }}
        >
            <div className={classes.innerContent}>
                <Typography variant="h4" className={classes.title}>
                    {t('add-instructor-name-modal.heading')}
                </Typography>
                <Typography variant="body1" paragraph className={classes.description}>
                    {t('add-instructor-name-modal.description')}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <UpdateInstructorNameForm formik={formik} />
                </form>
            </div>
        </BasicModal>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    innerContent: {
        minHeight: 200,
        maxWidth: 680,
    },
    description: { marginBottom: theme.spacing(3) },
    title: { marginBottom: theme.spacing(4) },
}));
