import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import { GeneralRecipientInputValues, SingleFieldType } from './types';

export const NewsletterGeneralTypeTextField: React.FC<{
    classes: Record<
        'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem' | 'inputChipLabel' | 'asterisk',
        string
    >;
    generalType: SingleFieldType;
    handleDelete: (name: string) => void;
    handleRecipientTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ classes, generalType, handleDelete, handleRecipientTypeChange }) => {
    const { t } = useTranslation();

    return (
        <TextField
            className={classes.textfield}
            select
            SelectProps={{
                value: generalType.value,
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                },
                renderValue: value => {
                    const chipLabel =
                        value === GeneralRecipientInputValues.parents
                            ? t('newsletter.parents')
                            : t('newsletter.kindergartens');
                    return (
                        <Chip
                            classes={{
                                label: classes.inputChipLabel,
                            }}
                            size={'small'}
                            label={chipLabel}
                            onDelete={() => handleDelete('generalType')}
                            onMouseDown={event => {
                                event.stopPropagation();
                            }}
                        />
                    );
                },
            }}
            InputLabelProps={{
                classes: {
                    asterisk: classes.asterisk,
                },
            }}
            InputProps={{
                classes: {
                    focused: classes.underlineFocus,
                },
            }}
            required
            onChange={handleRecipientTypeChange}
            name="generalType"
            label={
                generalType.value
                    ? t('newsletter.general-recipient-label-filled')
                    : t('newsletter.general-recipient-label')
            }
            fullWidth
            error={generalType.error}
            helperText={generalType.error ? t('newsletter.general-recipient-helper-text') : null}
        >
            <MenuItem
                classes={{
                    root: classes.selectItem,
                }}
                value={GeneralRecipientInputValues.parents}
            >
                {t('newsletter.parents')}
            </MenuItem>
            <MenuItem
                classes={{
                    root: classes.selectItem,
                }}
                value={GeneralRecipientInputValues.kindergartens}
            >
                {t('newsletter.kindergartens')}
            </MenuItem>
        </TextField>
    );
};
