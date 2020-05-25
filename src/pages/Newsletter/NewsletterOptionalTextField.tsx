import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Chip, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { parentsMockData, preschoolsMockData } from './mockData';

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
    partRecipients: {
        primary: string;
        secondary: string;
    };
}> = ({ classes, handleChange, selectRecipients, recipients, partRecipients }) => {
    const { t } = useTranslation();

    const handleDelete = (value: string) => {
        const filteredRecipients = recipients.filter(element => element !== value);
        selectRecipients(filteredRecipients);
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
            label={
                partRecipients.primary === 'parent' && partRecipients.secondary === 'single'
                    ? t('newsletter.select-parents-label')
                    : t('newsletter.select-preschools-label')
            }
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
        >
            {partRecipients.primary === 'preschools' || partRecipients.secondary === 'preschool'
                ? setMenuItems(preschoolsMockData)
                : setMenuItems(parentsMockData)}
        </TextField>
    );
};
