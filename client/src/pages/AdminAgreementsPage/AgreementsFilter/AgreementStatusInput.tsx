import React from 'react';
import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { FilterMenuProps } from './FilterMenuProps';
import { AgreementsTypeFilterMutations } from '../../../operations/mutations/agreementsTypeFilterMutations';
import { AgreementStatusFilters } from '../../../models/AgreementStatusFilter';

interface Props {
    value: string;
}

export function AgreementStatusInput({ value: currentValue }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{t('agreements-filter.by-agreement-status')}</InputLabel>
            <Select
                label={t('agreements-filter.by-agreement-status')}
                value={currentValue}
                onChange={({ target: { value } }) => {
                    AgreementsTypeFilterMutations.setAgreementsStatusFilter(AgreementStatusFilters[value as string]);
                }}
                fullWidth
                inputProps={{
                    name: 'age',
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
