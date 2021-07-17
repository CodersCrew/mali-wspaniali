import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { BasicModal } from '../Modal/BasicModal';
import { ActionDialog, openDialog } from '../../utils/openDialog';
import { AddInstructorNameResult } from '../../graphql/types';
import { AddInstructorNameForm } from './AddInstructorNameForm';

type AddInstructorNameModalProps = {
    firstname: string;
    lastname: string;
};

const initialValues: AddInstructorNameResult = {
    firstname: '',
    lastname: '',
};

export const openAddInstructorNameModal = (options: AddInstructorNameModalProps) => {
    return openDialog<AddInstructorNameModalProps>(AddInstructorNameModal, options);
};

export const AddInstructorNameModal = ({ makeDecision }: ActionDialog<{ name: AddInstructorNameResult }>) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const validationSchema = yup.object({
        firstname: yup.string().required(t('add-instructor-name-modal.first-name-required')),
        lastname: yup.string().required(t('add-instructor-name-modal.last-name-required')),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            makeDecision({ accepted: true, name: { ...values } });
        },
    });

    return (
        <BasicModal
            isOpen={true}
            actionName={t('add-instructor-name-modal.button')}
            onAction={formik.handleSubmit}
            isCancelButtonVisible={false}
            isActionButtonVisible={true}
        >
            <div className={classes.innerContent}>
                <Typography variant="h4" className={classes.title}>
                    {t('add-instructor-name-modal.heading')}
                </Typography>
                <Typography variant="body1" paragraph className={classes.description}>
                    {t('add-instructor-name-modal.description')}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <AddInstructorNameForm formik={formik} />
                </form>
            </div>
        </BasicModal>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    innerContent: {
        minHeight: 200,
    },
    description: { marginBottom: theme.spacing(2) },
    title: { marginBottom: theme.spacing(3) },
}));
