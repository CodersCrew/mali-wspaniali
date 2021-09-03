import { useReducer } from 'react';
import { createStyles, Theme, makeStyles, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '../../../queries/useBreakpoints';
import { FormControlOldPassword } from './ChangepasswordPanelFormControls/FormControlOldPassword';
import { ChangePasswordPanelReducer, ChangePasswordPanelInitialState } from './ChangePasswordPanelReducer';
import { useMe } from '../../../utils/useMe';
import { ButtonResetOldPassword } from './ChangepasswordPanelFormControls/ButtonResetOldPassword';
import { ButtonSendMessage } from './ChangepasswordPanelFormControls/ButtonSendMessage';
import { openSendMessageModal } from '../../../components/AccountDeletionPanel/SendMessageModal';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { useCreateNewsletter } from '../../../operations/mutations/Newsletter/createNewsletter';

export function ChangePasswordPanel() {
    const device = useBreakpoints();
    const classes = useStyles();
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(ChangePasswordPanelReducer, ChangePasswordPanelInitialState);
    const { createNewsletter } = useCreateNewsletter();
    const user = useMe();

    if (!user) return null;

    return (
        <Grid
            container
            direction={device === 'MOBILE' ? 'column' : 'row'}
            justify="space-between"
            className={classes.container}
        >
            <Grid item className={device === 'MOBILE' ? classes.gridItemMobile : classes.gridItem}>
                <FormControlOldPassword state={state} dispatch={dispatch} />
                <ButtonResetOldPassword state={state} dispatch={dispatch} user={user} />
            </Grid>
            <Grid item className={device === 'MOBILE' ? classes.gridItemMobile : classes.gridItem}>
                <Typography variant={'subtitle2'} className={classes.problems}>
                    {t('settings-page.change-password-problems')}
                </Typography>
                <Typography variant={'body2'} className={classes.problems}>
                    {t('settings-page.change-password-problems-hint')}
                </Typography>
                <ButtonSendMessage
                    handleClick={() => {
                        openSendMessageModal({
                            user,
                        }).then((result) => {
                            if (result.close) return;

                            createNewsletter({
                                message: result.decision?.parent.message || '',
                                recipients: ['fundacja@mali-wspaniali.pl'],
                                type: result.decision?.parent.messageTopic || '',
                                title:
                                    `${result.decision?.parent.messageTopic} [${result.decision?.parent.email}]` || '',
                            }).then(() => openSnackbar({ text: t('settings-modal.snackBar-message') }));
                        });
                    }}
                />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
        gridItem: { minWidth: '448px' },
        gridItemMobile: {},
        problems: {
            marginBottom: theme.spacing(2),
        },
    }),
);
