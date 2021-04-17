import { Chip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { useStyles } from './styles';
import { PasswordValidation } from './types';

const T_PREFIX = 'registration-page';

interface Props {
    passwordValidation: PasswordValidation;
}

export const PasswordStrengthChips = ({ passwordValidation }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.chipsContainer}>
            {Object.entries(passwordValidation).map(([condition, isMet]) => (
                <Chip
                    key={condition}
                    size="small"
                    variant="outlined"
                    icon={isMet ? <CheckCircleIcon /> : <CheckIcon />}
                    label={t(`${T_PREFIX}.${condition}`)}
                    className={clsx({ [classes.chip]: true, checked: isMet })}
                    color={isMet ? 'primary' : 'default'}
                />
            ))}
        </div>
    );
};
