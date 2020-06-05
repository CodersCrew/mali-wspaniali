import React from 'react';
import { Chip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useStyles } from './styles';
import { PasswordValidation } from './types';

export const PasswordStrengthChips: React.FC<{ passwordValidation: PasswordValidation }> = ({ passwordValidation }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const { length, capital, digit, special } = passwordValidation;

    return (
        <div className={classes.chipsContainer}>
            <Chip
                size="small"
                variant="outlined"
                icon={length ? <CheckCircleIcon /> : <CheckIcon />}
                label={t('registration-page.password-length')}
                className={clsx(classes.chip, length && 'checked')}
                color={length ? 'primary' : 'default'}
            />
            <Chip
                size="small"
                variant="outlined"
                icon={capital ? <CheckCircleIcon /> : <CheckIcon />}
                label={t('registration-page.password-capital')}
                className={clsx(classes.chip, capital && 'checked')}
                color={capital ? 'primary' : 'default'}
            />
            <Chip
                size="small"
                variant="outlined"
                icon={digit ? <CheckCircleIcon /> : <CheckIcon />}
                label={t('registration-page.password-digit')}
                className={clsx(classes.chip, digit && 'checked')}
                color={digit ? 'primary' : 'default'}
            />
            <Chip
                size="small"
                variant="outlined"
                icon={special ? <CheckCircleIcon /> : <CheckIcon />}
                label={t('registration-page.password-special')}
                className={clsx(classes.chip, special && 'checked')}
                color={special ? 'primary' : 'default'}
            />
        </div>
    );
};
