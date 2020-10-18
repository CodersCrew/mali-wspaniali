import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from '../../../../components/Button';

export const ButtonValidateOldPassword = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.wrapper}>
            <ButtonSecondary type="submit" variant="contained">
                {t('settings-page.reset-old-password')}
            </ButtonSecondary>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: { display: 'flex', justifyContent: 'flex-end', marginBottom: theme.spacing(2) },
    }),
);
