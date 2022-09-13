import { Box, createStyles, makeStyles, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { useIsDevice } from '../../../queries/useBreakpoints';
import { RegistrationFeedbackProps } from './types';

export const RegistrationFeedback = ({ classWrapper }: RegistrationFeedbackProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isDesktop } = useIsDevice();

    return (
        <div className={classWrapper}>
            <Typography variant="h3">{t('registration-page.register-success-title')}</Typography>
            <Box mb={2.5} />
            <Typography variant="body1">{t('registration-page.register-success-content')}</Typography>
            <Box mb={2.5} />
            <div className={classes.noActivationMessageBox}>
                <ErrorOutlineIcon style={{ fontSize: '1rem' }} />
                <Box mr={1} />
                <Typography variant="caption" style={{ textAlign: 'left' }}>
                    {t('registration-page.register-success-spam')}
                </Typography>
            </div>
            {!isDesktop && <Box mb={2} />}
        </div>
    );
};

export const useStyles = makeStyles(() =>
    createStyles({
        noActivationMessageBox: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
    }),
);
