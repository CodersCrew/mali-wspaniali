import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogActions, Button, Typography, Grid } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useStyles } from './styles';

type ModalProps = {
    onClose: () => void;
};

export const HelpModal = ({ onClose }: ModalProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Dialog open onClose={onClose}>
            <DialogContent className={classes.modalContent}>
                <HelpOutlineIcon className={classes.modalIcon} />
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography variant="body1" className={classes.modalTextBold}>
                            {t('newsletter.help-modal.type')}
                        </Typography>
                        <Typography variant="body1">{t('newsletter.help-modal.type-text')}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.modalTextBold}>
                            {t('newsletter.help-modal.attachment')}
                        </Typography>
                        <Typography variant="body1">{t('newsletter.help-modal.attachment-text')} </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.modalButtonWrapper}>
                <Button className={classes.modalButton} onClick={onClose} autoFocus>
                    {t('newsletter.help-modal.button')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
