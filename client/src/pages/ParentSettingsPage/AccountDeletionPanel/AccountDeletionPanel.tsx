import React, {useState} from 'react';
import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ButtonSecondary } from '../../../components/Button';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Input } from '../../../components/AddChildModal/Input';

const validationSchema = yup.object({
    sender: yup.string().required(),
    title: yup.string().required(),
    message: yup.string().required()
});

const initialValues = {
    sender: '',
    title: '',
    message: ''
};

// interface Props {
//     handleSubmit: (data: SendMessageResult) => void;
// }

interface SendMessageResult {
    sender: string;
    title: string;
    message: string;
}

export function AccountDeletionPanel(){
    function handleSubmit(data: SendMessageResult){
        console.log(data);
    }

    const classes = useStyles();
    const { t } = useTranslation();
    const [isModalOpen, openModal] = useState(false); // do spr
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: data => handleSubmit(data),
    });
    
    return(
        <>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="body1" classes={{ root: classes.title }}>
                        {t('account-deletion-panel.title')}
                    </Typography>
                    <Typography variant="caption" classes={{ root: classes.description }}>
                        {t('account-deletion-panel.descritpion')}
                    </Typography>
                    <Grid item xs={4} className={classes.contentButtonWrapper}>
                        <ButtonSecondary
                            variant={'contained'}
                            innerText = {t('account-deletion-panel.display-modal-button')}
                            onClick = {()=>{openModal(prevState => !prevState);}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <TwoActionsModal isOpen={isModalOpen} onClose={()=>{openModal(false);}}   lowerButtonOnClick={()=>{openModal(false);}} lowerButtonText={t('account-deletion-panel.modal.cancel-button')} upperButtonOnClick={formik.handleSubmit} upperButtonText={t('account-deletion-panel.modal.send-msg-button')}>
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
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginBottom: theme.spacing(1),
            paddingLeft: theme.spacing(1),
        },
        description: { 
            marginBottom: theme.spacing(1), 
            paddingLeft: theme.spacing(1),
            color: theme.palette.text.secondary,
        },
        contentButtonWrapper: {
            marginTop: theme.spacing(2),
        },
        container: {
            maxWidth: 640,
        },
        item: {
            flex: 1,
        },
    }),
);