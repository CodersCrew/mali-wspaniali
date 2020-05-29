import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import { GeneralRecipientInputValues } from './types';

export const NewsletterGeneralTypeTextField: React.FC<{
    classes: Record<
        'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem' | 'inputChipLabel' | 'asterisk',
        string
    >;
    recipientType: {
        generalType: string;
        specificType: string;
    };
    handleDelete: (name: string, value: string) => void;
    handlePartRecipientChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ classes, recipientType, handleDelete, handlePartRecipientChange }) => {
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
                        value === GeneralRecipientInputValues.parents ? t('newsletter.parents') : t('newsletter.kindergartens');
                    return (
                        <Chip
                            classes={{
                                label: classes.inputChipLabel,
                            }}
                            size={'small'}
                            label={chipLabel}
                            onDelete={() => handleDelete('generalTypeInput', value as string)}
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
            onChange={handlePartRecipientChange}
            name="generalTypeInput"
            label={t('newsletter.recipients-generalType-label')}
            // TODO: CHANGE LABEL WHEN FOCUSED

            fullWidth
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
