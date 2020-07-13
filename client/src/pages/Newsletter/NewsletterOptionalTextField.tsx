// TODO: delete this file, it's not being used anymore,
// left as a reference

import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Chip, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { GeneralRecipientInputValues, SpecificRecipientInputValues, NewsletterOptionalTextFieldProps } from './types';

export const NewsletterOptionalTextField = ({
    classes,
    generalType,
    specificType,
    recipients,
    handleChange,
    selectRecipients,
    parents,
    kindergartens,
    setFields,
}: NewsletterOptionalTextFieldProps) => {
    const { t } = useTranslation();

    const handleDelete = (value: string) => {
        const filteredRecipients = recipients.value.filter(element => element !== value);
        selectRecipients(filteredRecipients);
        if (filteredRecipients.length === 0) {
            setFields(prevFields => ({
                ...prevFields,
                recipients: {
                    value: filteredRecipients,
                    error: true,
                },
            }));
        }
    };

    const setLabel = () => {
        switch (true) {
            case generalType.value === GeneralRecipientInputValues.parents &&
                specificType.value === SpecificRecipientInputValues.kindergarten:
                if (recipients.value.length > 0) {
                    return t('newsletter.recipient-select-kindergarten-label-filled');
                }

                return t('newsletter.recipient-select-kindergarten-label');
            case generalType.value === GeneralRecipientInputValues.parents &&
                specificType.value === SpecificRecipientInputValues.single:
                if (recipients.value.length > 0) {
                    return t('newsletter.recipient-single-parent-label-filled');
                }

                return t('newsletter.recipient-single-parent-label');
            default:
                if (recipients.value.length > 0) {
                    return t('newsletter.recipient-single-kindergarten-label-filled');
                }

                return t('newsletter.recipient-single-kindergarten-label');
        }
    };
    const setMenuItems = (array: string[]) => {
        return array.map(item => (
            <MenuItem key={item} value={item} className={classes.selectMenuItem}>
                <Checkbox
                    size={'small'}
                    checked={recipients.value.indexOf(item) > -1}
                    className={classes.selectMenuCheckbox}
                />
                <ListItemText classes={{ primary: classes.selectMenuItemText }} primary={item} />
            </MenuItem>
        ));
    };

    return (
        <TextField
            className={classes.textfield}
            select
            required
            onChange={handleChange}
            name="recipients"
            label={setLabel()}
            fullWidth
            SelectProps={{
                value: recipients.value,
                multiple: true,
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                },
                renderValue: value => {
                    const stringValues = value as string[];

                    return stringValues.map(stringValue => (
                        <Chip
                            classes={{
                                label: classes.inputChipLabel,
                            }}
                            size={'small'}
                            key={stringValue}
                            label={stringValue as string}
                            onDelete={() => handleDelete(stringValue)}
                            onMouseDown={event => {
                                event.stopPropagation();
                            }}
                        />
                    ));
                },
            }}
            InputProps={{
                classes: {
                    focused: classes.underlineFocus,
                },
            }}
            InputLabelProps={{
                classes: {
                    asterisk: classes.asterisk,
                },
            }}
            helperText={recipients.error ? t('newsletter.recipient-helper-text') : null}
            error={recipients.error}
        >
            {generalType.value === GeneralRecipientInputValues.kindergartens ||
            specificType.value === SpecificRecipientInputValues.kindergarten
                ? setMenuItems(
                      kindergartens.map(
                          kindergarten =>
                              `${kindergarten.city}, ${t('newsletter.kindergarten-number')} ${kindergarten.number}`,
                      ),
                  )
                : setMenuItems(parents)}
        </TextField>
    );
};
