import React from 'react';
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
import { AgreementsTypeFilterMutations } from '../../../operations/mutations/agreementsTypeFilterMutations';
import { AgreementKindergartenFilter } from '../../../models/AgreementKindergartenFilters';

interface Props {
    values: AgreementKindergartenFilter[];
}

export function AgreementKindergartenInput({ values: currentValues }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{t('agreements-filter.by-kindergarten')}</InputLabel>
            <Select
                multiple
                label={t('agreements-filter.by-agreement-status')}
                renderValue={selected => {
                    return (selected as string[])
                        .map(e => {
                            const option = currentValues.find(k => k.id === e);

                            if (!option) return e;

                            return option.displayNameKey ? t(option.displayNameKey) : option.displayName;
                        })
                        .join(', ');
                }}
                value={currentValues.filter(e => e.selected).map(e => e.id)}
                onChange={({ target: { value } }) => {
                    AgreementsTypeFilterMutations.setAgreementsKindergartenFilter(value as string[]);
                }}
                fullWidth
                inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                }}
                MenuProps={FilterMenuProps}
            >
                {currentValues.map(kindergarten => {
                    return (
                        <MenuItem key={kindergarten.id} value={kindergarten.id}>
                            <Checkbox checked={kindergarten.selected} />
                            <ListItemText
                                primary={
                                    kindergarten.displayNameKey
                                        ? t(kindergarten.displayNameKey)
                                        : kindergarten.displayName
                                }
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
