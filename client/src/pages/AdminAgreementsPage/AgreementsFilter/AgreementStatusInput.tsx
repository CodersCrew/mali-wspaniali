import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FilterMenuProps } from './FilterMenuProps';
import { AgreementStatusFilters } from '../../../models/AgreementStatusFilter';

interface Props {
    value: string;
    onChange: (type: string, value: string) => void;
}

export function AgreementStatusInput({ value: currentValue, onChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{t('agreements-filter.by-agreement-status')}</InputLabel>
            <Select
                label={t('agreements-filter.by-agreement-status')}
                value={currentValue}
                onChange={({ target: { name, value } }) => onChange(name as string, value as string)}
                fullWidth
                inputProps={{
                    name: 'STATUS',
                    id: 'age-native-simple',
                }}
                MenuProps={FilterMenuProps}
            >
                <MenuItem value={AgreementStatusFilters.SHOW_ALL.id}>
                    {t(AgreementStatusFilters.SHOW_ALL.displayNameKey)}
                </MenuItem>
                <MenuItem value={AgreementStatusFilters.GIVEN_AGREEMENT.id}>
                    {t(AgreementStatusFilters.GIVEN_AGREEMENT.displayNameKey)}
                </MenuItem>
                <MenuItem value={AgreementStatusFilters.NOT_GIVEN_AGREEMENT.id}>
                    {t(AgreementStatusFilters.NOT_GIVEN_AGREEMENT.displayNameKey)}
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
