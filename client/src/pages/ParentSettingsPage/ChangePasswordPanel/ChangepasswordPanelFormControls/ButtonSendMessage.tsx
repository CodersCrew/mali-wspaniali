import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../../../../components/Button';

interface ButtonSendMessageProps {
    handleClick: () => void;
}

export const ButtonSendMessage: React.FC<ButtonSendMessageProps> = ({ handleClick }) => {
    const classes = useStyles();
    const { t } = useTranslation();

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
