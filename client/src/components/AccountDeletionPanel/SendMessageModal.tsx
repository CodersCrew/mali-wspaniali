import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Typography, Box, Grid, makeStyles } from '@material-ui/core';

import { Select } from '../ChildForm/Select';
import { Input } from '../ChildForm/Input';
import { BasicModal } from '../Modal/BasicModal';

import { openDialog } from '../../utils/openDialog';
import { useParentsSelectOptions } from './useParentsSelectOption';
import { Me } from '../../graphql/types';

interface FormValues {
    email: string;
    messageTopic: string;
    message: string;
}

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

export const openSendMessageModal = (props: { user: Me; defaultTopic?: string }) => {
    return openDialog<
        { user: Me; defaultTopic?: string },
        { parent: { email: string; message: string; messageTopic: string } }
    >(function SettingsMessageModal({ onClose, user, makeDecision }) {
        const { t } = useTranslation();
        const classes = useStyles();
        const { getOptions } = useParentsSelectOptions();

        const initialValues: FormValues = {
            email: user.mail,
            messageTopic: props.defaultTopic || 'others',
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
                onClose={onClose}
                isActionButtonVisible
                isCancelButtonVisible
            >
                <form onSubmit={formik.handleSubmit}>
                    <Box>
                        <Typography variant={'h4'}>{t('settings-modal.modal-header')}</Typography>
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
    }, props);
};

const useStyles = makeStyles((theme) => ({
    inputBox: {
        margin: theme.spacing(2, 0),
    },
}));
