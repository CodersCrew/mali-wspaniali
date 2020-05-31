import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Chip, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { GeneralRecipientInputValues, SpecificRecipientInputValues, InputsStateType, InputStates } from './types';
import { Kindergarten } from '../../firebase/types';

export const NewsletterOptionalTextField: React.FC<{
    classes: Record<
        | 'container'
        | 'textfield'
        | 'heading'
        | 'underlineFocus'
        | 'selectItem'
        | 'inputChipLabel'
        | 'asterisk'
        | 'selectMenuItem'
        | 'selectMenuCheckbox'
        | 'selectMenuItemText',
        string
    >;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    selectRecipients: (filteredRecipients: string[]) => void;
    recipients: string[];
    recipientType: {
        generalType: string;
        specificType: string;
    };
    parents: string[];
    kindergartens: Kindergarten[];
    inputsState: InputsStateType;
    setInputsState: React.Dispatch<React.SetStateAction<InputsStateType>>;
}> = ({
    classes,
    handleChange,
    selectRecipients,
    recipients,
    recipientType,
    parents,
    kindergartens,
    inputsState,
    setInputsState,
}) => {
    const { t } = useTranslation();

    const handleDelete = (value: string) => {
        const filteredRecipients = recipients.filter(element => element !== value);
        selectRecipients(filteredRecipients);
        if (filteredRecipients.length === 0) {
            setInputsState(prevFields => ({
                ...prevFields,
                recipients: InputStates.Error,
            }));
        }
    };

    const setLabel = () => {
        switch (true) {
            case recipientType.generalType === GeneralRecipientInputValues.parents &&
                recipientType.specificType === SpecificRecipientInputValues.kindergarten:
                if (recipients.length > 0) {
                    return t('newsletter.recipient-select-kindergarten-label-filled');
                }
                return t('newsletter.recipient-select-kindergarten-label');
            case recipientType.generalType === GeneralRecipientInputValues.parents &&
                recipientType.specificType === SpecificRecipientInputValues.single:
                if (recipients.length > 0) {
                    return t('newsletter.recipient-single-parent-label-filled');
                }
                return t('newsletter.recipient-single-parent-label');
            default:
                if (recipients.length > 0) {
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
                    checked={recipients.indexOf(item) > -1}
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
                value: recipients,
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
            helperText={
                inputsState.recipients === InputStates.Error ? t('newsletter.recipient-helper-text') : null
            }
            error={inputsState.recipients === InputStates.Error}
        >
            {recipientType.generalType === GeneralRecipientInputValues.kindergartens ||
            recipientType.specificType === SpecificRecipientInputValues.kindergarten
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
