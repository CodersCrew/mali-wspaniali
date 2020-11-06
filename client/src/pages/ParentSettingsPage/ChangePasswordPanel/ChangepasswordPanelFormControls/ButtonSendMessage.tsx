import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from '../../../../components/Button';

export const ButtonSendMessage = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const handleClick = () => {
        //
    };

    return (
        <div className={classes.wrapper}>
            <ButtonSecondary type="submit" variant="contained" onClick={handleClick}>
                {t('settings-page.change-password-problems-message-button')}
            </ButtonSecondary>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: { display: 'flex', justifyContent: 'flex-start', marginBottom: theme.spacing(2) },
    }),
);
