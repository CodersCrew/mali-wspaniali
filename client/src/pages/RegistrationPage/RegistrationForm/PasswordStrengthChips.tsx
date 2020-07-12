import React from 'react';
import { Chip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useStyles } from './styles';
import { PasswordValidation } from './types';

const T_PREFIX = 'registration-page';

export const PasswordStrengthChips: React.FC<{ passwordValidation: PasswordValidation }> = ({ passwordValidation }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.chipsContainer}>
            {Object.entries(passwordValidation).map(([key, value]) => (
                <Chip
                    key={key}
                    size="small"
                    variant="outlined"
                    icon={value ? <CheckCircleIcon /> : <CheckIcon />}
                    label={t(`${T_PREFIX}.${key}`)}
                    className={clsx(classes.chip, value && 'checked')}
                    color={value ? 'primary' : 'default'}
                />
            ))}
        </div>
    );
};
