import React from 'react';
import {  Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Input } from '../../../components/AddChildModal/Input';
import { useMe } from '../../../utils/useMe';

interface SendMessageResult {
    sender: string;
    title: string;
    message: string;
}

interface Props {
    modalOpen:boolean;
    setModalOpen:(state:boolean) => void;
    handleSubmit: (data:SendMessageResult)=> void;
    classes: any;
}

const validationSchema = yup.object({
    sender: yup.string().required(),
    title: yup.string().required(),
    message: yup.string().required()
});

export function Modal({modalOpen, setModalOpen, handleSubmit, classes}:Props){
    const { t } = useTranslation();
    const user = useMe();

    const initialValues = {
        sender: user ? user.mail : '',
        title: '',
        message: ''
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: data => handleSubmit(data),
    });
    
    return(
        <TwoActionsModal isOpen={modalOpen} onClose={()=>{setModalOpen(false);}}   lowerButtonOnClick={()=>{setModalOpen(false);}} lowerButtonText={t('account-deletion-panel.modal.cancel-button')} upperButtonOnClick={formik.handleSubmit} upperButtonText={t('account-deletion-panel.modal.send-msg-button')}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} className={classes.container}>
                    <Typography variant="h4" classes={{ root: classes.title }}>
                        {t('account-deletion-panel.modal.heading')}
                    </Typography>
                    <Typography variant="body1" paragraph classes={{ root: classes.description }}>
                        {t('account-deletion-panel.modal.description')}
                    </Typography>
              
                    <Grid item xs={12}>
                        <Grid container spacing={2} direction="column">
                            <Grid item  classes={{ root: classes.item }}>
                                <Input
                                    value={formik.values.sender}
                                    name="sender"
                                    label={t('account-deletion-panel.modal.inputs.sender')}
                                    error={formik.errors.sender}
                                    touched={formik.touched.sender}
                                    onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                                />
                            </Grid>
                            <Grid item  classes={{ root: classes.item }}>
                                <Input
                                    value={formik.values.title}
                                    name="title"
                                    label={t('account-deletion-panel.modal.inputs.topic')}
                                    error={formik.errors.title}
                                    touched={formik.touched.title}
                                    onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                                />
                            </Grid>
                            <Grid item  classes={{ root: classes.item }}>
                                <Input
                                    value={formik.values.message}
                                    name="message"
                                    label={t('account-deletion-panel.modal.inputs.message')}
                                    error={formik.errors.message}
                                    touched={formik.touched.message}
                                    rows={6}
                                    onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </TwoActionsModal>
    );
}