import React, { ChangeEvent } from 'react';
import { TextField, Chip, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

const preschools = ['Przedszkole 1', 'Przedszkole 2', 'Przedszkole 3', 'Przedszkole 4', 'Przedszkole 5'];
const parents = ['Parent 1', 'Parent 2', 'Parent 3', 'Parent 4', 'Parent 5'];

export const NewsletterOptionalTextField: React.FC<{
    classes: Record<'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem', string>;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    filterRecipients: (filteredRecipients: string[]) => void;
    recipients: string[];
    partRecipients: {
        primary: string;
        secondary: string;
    };
}> = ({ classes, handleChange, filterRecipients, recipients, partRecipients }) => {
    const handleDelete = (value: any) => {
        console.log('delete item', value);
        const filteredRecipients = recipients.filter(element => element !== value);
        filterRecipients(filteredRecipients);
    };

    const setMenuItems = (array: string[]) => {
        return array.map(item => (
            <MenuItem key={item} value={item}>
                <Checkbox checked={recipients.indexOf(item) > -1} />
                <ListItemText primary={item} />
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
                    ? 'Aby wysłać wiadomość do konkretnego rodzica, wpisz dane dziecka, lub wybierz je z listy'
                    : 'Wybierz przedszkole z listy'
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
                    const stringValue = value as [];
                    return stringValue.map(value => (
                        <Chip
                            key={value}
                            label={value as string}
                            onDelete={() => handleDelete(value)}
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
        >
            {partRecipients.primary === 'preschools' || partRecipients.secondary === 'preschool' ? setMenuItems(preschools) : setMenuItems(parents)}
        </TextField>
    );
};

//TODO ADD PARENTS LIST MENU ITEMS
