import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Typography, Box, Grid, makeStyles } from '@material-ui/core';

import { Select } from '../ChildForm/Select';
import { Input } from '../ChildForm/Input';
import { useParentsSelectOptions } from './useParentsSelectOption';
import { BasicModal } from '../Modal/BasicModal';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { FormValues, SettingsMessageModalProps } from './types';

const validationSchema = yup.object({
    email: yup.string().required().email().label('Email'),
    messageTopic: yup.string().required().label('Message'),
    message: yup.string().required().label('Message'),
});

const normalizeParent = (parent: FormValues) => {
    return {
        email: parent.email,
        message: parent.message,
        messageTopic: parent.messageTopic,
    };
};

const SettingsMessageModal = ({
    preventClose,
    onClose,
    isCancelButtonVisible,
    user,
    makeDecision,
}: SettingsMessageModalProps & ActionDialog<{ parent: FormValues }>) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { getOptions } = useParentsSelectOptions();

    const initialValues: FormValues = {
        email: user.mail,
        messageTopic: 'deleteAccount',
        message: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            makeDecision({ accepted: true, parent: normalizeParent(values) });
        },
    });

    return (
        <BasicModal
            isOpen={true}
            actionName={t('settings-modal.button')}
            onAction={formik.handleSubmit}
            onClose={() => {
                if (!preventClose) {
                    onClose();
                }
            }}
            isCancelButtonVisible={isCancelButtonVisible}
            isActionButtonVisible={true}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box m={3}>
                    <Typography variant={'h4'} className={classes.header}>
                        {t('settings-modal.modal-header')}
                    </Typography>
                    <Box mt={4} mb={2.5}>
                        <Typography variant={'body1'}>{t('settings-modal.modal-first-description')}</Typography>
                        <Typography variant={'body1'}>{t('settings-modal.modal-second-description')}</Typography>
                    </Box>
                    <Grid direction="column" container>
                        <Grid item>
                            <Input
                                multiline={true}
                                name="email"
                                label={t('settings-modal.text-field-email-label')}
                                value={user.mail}
                                error={formik.errors.email}
                                touched={formik.touched.email}
                                onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item className={classes.inputBox}>
                            <Select
                                label={t('settings-modal.select-options.select-label')}
                                value={formik.values.messageTopic}
                                options={getOptions('settings-message')}
                                name="messageTopic"
                                error={formik.errors.messageTopic}
                                touched={formik.touched.messageTopic}
                                onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                name="message"
                                label={t('settings-modal.text-field-title-label')}
                                value={formik.values.message}
                                error={formik.errors.message}
                                touched={formik.touched.message}
                                onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                                multiline
                                rows={10}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </BasicModal>
    );
};

export const openSettingsModal = (props: SettingsMessageModalProps) => {
    return openDialog<SettingsMessageModalProps>(SettingsMessageModal, props);
};

const useStyles = makeStyles((theme) => ({
    header: { color: theme.palette.text.primary },
    inputBox: {
        margin: theme.spacing(2, 0),
    },
}));
