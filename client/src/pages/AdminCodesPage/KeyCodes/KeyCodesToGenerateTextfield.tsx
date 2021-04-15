import { createStyles, makeStyles, TextField } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

interface Props {
    value: string;
    onChange: (amount: string) => void;
}

export function KeyCodesToGenerateTextfield({ value, onChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TextField
            data-testid="keycodes-count-input"
            type="number"
            value={value}
            onChange={({ target: { value: amount } }) => {
                if (Number.isNaN(parseInt(amount, 10))) {
                    onChange('');
                } else {
                    onChange(amount);
                }
            }}
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

const useStyles = makeStyles(() =>
    createStyles({
        keyCodeTextfield: {
            width: 200,
        },
    }),
);
