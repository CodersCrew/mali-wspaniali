import React from 'react';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

interface Props {
    value: number;
    onChange: (amount: number) => void;
}

export function KeyCodesToGenerateTextfield({ value, onChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TextField
            type="number"
            value={value}
            onChange={({ target: { value: amount } }) =>
                !Number.isNaN(parseInt(amount, 10)) && onChange(parseInt(amount, 10))
            }
            variant="outlined"
            classes={{ root: classes.keyCodeTextfield }}
            label={t('admin-setting-page.keycode-generation.keycode-amount')}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{ inputProps: { min: 1, max: 1000 } }}
        />
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        keyCodeTextfield: {
            width: 200,
        },
    }),
);
