import React from 'react';
import { TextField, MenuItem, Chip } from '@material-ui/core';

const parentsRecipients = [
    { value: 'all', label: 'wszyscy rodzice' },
    { value: 'preschool', label: 'z wybranego przedszkola' },
    { value: 'single', label: 'wiadomość indywidualna' },
];

const preschoolsRecipients = [
    { value: 'all', label: 'wszystkie przedszkola' },
    { value: 'single', label: 'do wybranego przedszkola' },
];

type ValuesArrayTypes = {
    value: string;
    label: string;
};

export const NewsletterSecondaryTextField: React.FC<{
    classes: Record<'container' | 'textfield' | 'heading' | 'underlineFocus' | 'selectItem', string>;
    partRecipients: {
        primary: string;
        secondary: string;
    };
    handleDelete: (name: string, value: string) => void;
    handlePartRecipientChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ classes, partRecipients, handleDelete, handlePartRecipientChange }) => {
    const createMenuItems = (array: ValuesArrayTypes[]) => {
        return array.map((item: ValuesArrayTypes) => (
            <MenuItem
                classes={{
                    root: classes.selectItem,
                }}
                key={item.value}
                value={item.value}
            >
                {item.label}
            </MenuItem>
        ));
    };
    return (
        <TextField
            className={classes.textfield}
            select
            required
            disabled={partRecipients.primary ? false : true}
            onChange={handlePartRecipientChange}
            SelectProps={{
                value: partRecipients.secondary,
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                },
                renderValue: value => {
                    const getLabel = () => {
                        if (partRecipients.primary === 'parent') {
                            const secondaryParentRecipient = parentsRecipients.find(element => {
                                if (element.value === (value as string)) return element;
                                return undefined;
                            });
                            if (secondaryParentRecipient) return secondaryParentRecipient.label;
                        }
                        if (partRecipients.primary === 'preschools') {
                            const secondaryPreschoolRecipient = preschoolsRecipients.find(element => {
                                if (element.value === (value as string)) return element;
                                return undefined;
                            });
                            if (secondaryPreschoolRecipient) return secondaryPreschoolRecipient.label;
                        } else {
                            return null;
                        }
                    };
                    return (
                        <Chip
                            label={getLabel()}
                            onDelete={() => handleDelete('secondary', value as string)}
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
            name="secondary"
            label={'Sprecyzuj adresata'}
            fullWidth
        >
            {partRecipients.primary === 'parent'
                ? createMenuItems(parentsRecipients)
                : createMenuItems(preschoolsRecipients)}
        </TextField>
    );
};
