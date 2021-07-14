import {
    Checkbox,
    createStyles,
    FormControl,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    Theme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FilterMenuProps } from './FilterMenuProps';
import { AgreementStatusFilter } from '../../../models/AgreementStatusFilter';

interface Props {
    values: AgreementStatusFilter[];
    onChange: (type: string, value: string[]) => void;
}

export function AgreementStatusInput({ values: currentValues, onChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{t('agreements-filter.by-agreement-status')}</InputLabel>
            <Select
                multiple
                label={t('agreements-filter.by-agreement-status')}
                renderValue={(selected) => {
                    return (selected as string[])
                        .map((e) => {
                            const option = currentValues.find((k) => k.id === e);

                            if (!option) return e;

                            return option.displayNameKey ? t(option.displayNameKey) : option.displayName;
                        })
                        .join(', ');
                }}
                value={currentValues.filter((e) => e.selected).map((e) => e.id)}
                onChange={({ target: { name, value } }) => onChange(name as string, value as string[])}
                fullWidth
                inputProps={{
                    name: 'STATUS',
                    id: 'age-native-simple',
                }}
                MenuProps={FilterMenuProps}
            >
                {currentValues.map((status) => {
                    return (
                        <MenuItem key={status.id} value={status.id}>
                            <Checkbox checked={status.selected} />
                            <ListItemText
                                primary={status.displayNameKey ? t(status.displayNameKey) : status.displayNameKey}
                            />
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            display: 'flex',
            marginBottom: theme.spacing(2),
            minWidth: 160,
            flex: 1,
        },
    }),
);
