import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FilterMenuProps } from './FilterMenuProps';
import { AgreementTypeFilters } from '../../../models/AgreementTypeFilters';

interface Props {
    value: string;
    onChange: (type: string, value: string) => void;
}

export function AgreementTypeInput({ value: currentValue, onChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{t('agreements-filter.by-agreement-type')}</InputLabel>
            <Select
                label={t('agreements-filter.by-agreement-type')}
                value={currentValue}
                onChange={({ target: { name, value } }) => onChange(name as string, value as string)}
                fullWidth
                inputProps={{
                    name: 'TYPE',
                    id: 'outlined-age-native-simple',
                }}
                MenuProps={FilterMenuProps}
            >
                <MenuItem value={AgreementTypeFilters.SHOW_ALL.id}>
                    {t(AgreementTypeFilters.SHOW_ALL.displayNameKey)}
                </MenuItem>
                <MenuItem value={AgreementTypeFilters.MARKETING_AGREEMENT.id}>
                    {t(AgreementTypeFilters.MARKETING_AGREEMENT.displayNameKey)}
                </MenuItem>
                <MenuItem value={AgreementTypeFilters.IMAGE_AGREEMENT.id}>
                    {t(AgreementTypeFilters.IMAGE_AGREEMENT.displayNameKey)}
                </MenuItem>
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
