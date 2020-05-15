import React from 'react';
import { TextField, MenuItem, Chip } from '@material-ui/core';

export const NewsletterPrimaryTextField: React.FC<{
  classes: Record<'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem', string>;
  partRecipients: {
        primary: string;
        secondary: string;
    };
    handleDelete: (name: string, value: string) => void;
    handlePartRecipientChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ classes, partRecipients, handleDelete, handlePartRecipientChange }) => {
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
                    const label = value === 'parent' ? 'Rodzice' : 'Przedszkola';
                    return (
                        <Chip
                            label={label}
                            onDelete={() => handleDelete('primary', value as string)}
                            onMouseDown={event => {
                                event.stopPropagation();
                            }}
                        />
                    );
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
            label={'Wybierz adresata z listy'}
            // TODO: CHANGE LABEL WHEN FOCUSED

            fullWidth
        >
            <MenuItem
                classes={{
                    root: classes.selectItem,
                }}
                value="parent"
            >
                rodzice
            </MenuItem>
            <MenuItem
                classes={{
                    root: classes.selectItem,
                }}
                value="preschools"
            >
                przedszkola
            </MenuItem>
        </TextField>
    );
};
