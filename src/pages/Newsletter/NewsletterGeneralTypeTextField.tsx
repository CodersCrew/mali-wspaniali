import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import { GeneralRecipientInputValues, InputsStateType, InputStates } from './types';

export const NewsletterGeneralTypeTextField: React.FC<{
    classes: Record<
        'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem' | 'inputChipLabel' | 'asterisk',
        string
    >;
    recipientType: {
        generalType: string;
        specificType: string;
    };
    handleDelete: (name: string) => void;
    handleRecipientTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputsState: InputsStateType;
}> = ({ classes, recipientType, handleDelete, handleRecipientTypeChange, inputsState }) => {
    const { t } = useTranslation();

    return (
        <TextField
            className={classes.textfield}
            select
            SelectProps={{
                value: recipientType.generalType,
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
                recipientType.generalType
                    ? t('newsletter.general-recipient-label-filled')
                    : t('newsletter.general-recipient-label')
            }
            fullWidth
            error={inputsState.generalType === InputStates.Error}
            helperText={
                inputsState.generalType === InputStates.Error ? t('newsletter.general-recipient-helper-text') : null
            }
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
