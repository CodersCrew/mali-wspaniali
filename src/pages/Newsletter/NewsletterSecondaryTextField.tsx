import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import { PrimaryInputValues, SecondaryInputValues } from './types';

type ValuesArrayTypes = {
    value: string;
    label: string;
};

export const NewsletterSecondaryTextField: React.FC<{
    classes: Record<
        | 'container'
        | 'textfield'
        | 'heading'
        | 'underlineFocus'
        | 'underlineDisabled'
        | 'selectItem'
        | 'inputChipLabel'
        | 'asterisk',
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

    const parentsRecipients = [
        { value: SecondaryInputValues.all, label: t('newsletter.recipients-secondary-value-labels.all-parents') },
        {
            value: SecondaryInputValues.kindergarten,
            label: t('newsletter.recipients-secondary-value-labels.from-single-kindergarten'),
        },
        {
            value: SecondaryInputValues.single,
            label: t('newsletter.recipients-secondary-value-labels.individual-message'),
        },
    ];

    const kindergartensRecipients = [
        { value: SecondaryInputValues.all, label: t('newsletter.recipients-secondary-value-labels.all-kindergartens') },
        {
            value: SecondaryInputValues.single,
            label: t('newsletter.recipients-secondary-value-labels.single-kindergarten'),
        },
    ];

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
            disabled={!partRecipients.primary}
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
                        if (partRecipients.primary === PrimaryInputValues.parents) {
                            const secondaryParentRecipient = parentsRecipients.find(element => {
                                if (element.value === (value as string)) return element;
                                return undefined;
                            });
                            if (secondaryParentRecipient) return secondaryParentRecipient.label;
                        }
                        if (partRecipients.primary === PrimaryInputValues.kindergartens) {
                            const secondarykindergartenRecipient = kindergartensRecipients.find(element => {
                                if (element.value === (value as string)) return element;
                                return undefined;
                            });
                            if (secondarykindergartenRecipient) return secondarykindergartenRecipient.label;
                        }
                        return null;
                    };
                    return (
                        <Chip
                            classes={{
                                label: classes.inputChipLabel,
                            }}
                            size={'small'}
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
                    underline: classes.underlineDisabled,
                },
            }}
            InputLabelProps={{
                classes: {
                    asterisk: classes.asterisk,
                },
            }}
            name="secondary"
            label={t('newsletter.recipients-secondary-label')}
            fullWidth
        >
            {partRecipients.primary === PrimaryInputValues.parents
                ? createMenuItems(parentsRecipients)
                : createMenuItems(kindergartensRecipients)}
        </TextField>
    );
};
