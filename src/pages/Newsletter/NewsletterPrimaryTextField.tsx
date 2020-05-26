import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import { PrimaryInputValues } from './types';

export const NewsletterPrimaryTextField: React.FC<{
    classes: Record<
        'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem' | 'inputChipLabel' | 'asterisk',
        string
    >;
    partRecipients: {
        primary: string;
        secondary: string;
    };
    handleDelete: (name: string, value: string) => void;
    handlePartRecipientChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ classes, partRecipients, handleDelete, handlePartRecipientChange }) => {
    const { t } = useTranslation();

    return (
        <TextField
            className={classes.textfield}
            select
            SelectProps={{
                value: partRecipients.primary,
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                },
                renderValue: value => {
                    const chipLabel =
                        value === PrimaryInputValues.parents ? t('newsletter.parents') : t('newsletter.preschools');
                    return (
                        <Chip
                            classes={{
                                label: classes.inputChipLabel,
                            }}
                            size={'small'}
                            label={chipLabel}
                            onDelete={() => handleDelete('primary', value as string)}
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
            name="primary"
            label={t('newsletter.recipients-primary-label')}
            // TODO: CHANGE LABEL WHEN FOCUSED

            fullWidth
        >
            <MenuItem
                classes={{
                    root: classes.selectItem,
                }}
                value={PrimaryInputValues.parents}
            >
                {t('newsletter.parents')}
            </MenuItem>
            <MenuItem
                classes={{
                    root: classes.selectItem,
                }}
                value={PrimaryInputValues.preschools}
            >
                {t('newsletter.preschools')}
            </MenuItem>
        </TextField>
    );
};
