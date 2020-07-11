import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { GeneralRecipientInputValues, RecipientTypeProps } from './types';

export const RecipientType = ({ generalType, handleRecipientTypeChange }: RecipientTypeProps) => {
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="recipient-type-label">{t('newsletter.general-recipient-label')}</InputLabel>
            <Select
                labelId="recipient-type-label"
                id="recipient-type"
                label={t('newsletter.general-recipient-label')}
                value={generalType.value || ''}
                error={generalType.error}
                onChange={handleRecipientTypeChange}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                }}
            >
                {Object.entries(GeneralRecipientInputValues).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                        {t(`newsletter.${key}`)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
