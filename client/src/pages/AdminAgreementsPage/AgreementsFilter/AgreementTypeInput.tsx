import React from 'react';
import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FilterMenuProps } from './FilterMenuProps';
import { AgreementTypeFilters } from '../../../models/AgreementTypeFilters';
import { AgreementsTypeFilterMutations } from '../../../operations/mutations/agreementsTypeFilterMutations';

interface Props {
    value: string;
}

export function AgreementTypeInput({ value: currentValue }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{t('agreements-filter.by-agreement-type')}</InputLabel>
            <Select
                label={t('agreements-filter.by-agreement-type')}
                value={currentValue}
                onChange={({ target: { value } }) => {
                    AgreementsTypeFilterMutations.setAgreementsTypeFilter(AgreementTypeFilters[value as string]);
                }}
                fullWidth
                inputProps={{
                    name: 'age',
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
