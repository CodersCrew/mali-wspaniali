import { useTranslation } from 'react-i18next';
import { Chip, makeStyles, createStyles, Theme } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';

const T_PREFIX = 'registration-page';

export type PasswordValidation = {
    length: boolean;
    capital: boolean;
    digit: boolean;
    special: boolean;
};

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chipsContainer: {
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto',
            justifyContent: 'space-around',
        },
        chip: {
            marginBottom: theme.spacing(1),
            border: 0,

            '&.checked': {
                color: theme.palette.primary.main,
            },
        },
    }),
);
