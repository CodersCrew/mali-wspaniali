import React, {useState} from 'react';
import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Modal } from './AccountDeletionModal';
import { ButtonSecondary } from '../../../components/Button';

interface SendMessageResult {
    sender: string;
    title: string;
    message: string;
}

export function AccountDeletionPanel(){
    function handleSubmit(data: SendMessageResult){console.log(data);}
    const classes = useStyles();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    
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
                            onClick = {()=>{setModalOpen(prevState => !prevState);}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} classes={classes} handleSubmit={handleSubmit}/>
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