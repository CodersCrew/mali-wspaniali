import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import { GeneralRecipientInputValues, SpecificRecipientInputValues } from './types';

type ValuesArrayTypes = {
    value: string;
    label: string;
};

export const NewsletterSpecificTypeTextField: React.FC<{
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
    recipientType: {
        generalType: string;
        specificType: string;
    };
    handleDelete: (name: string, value: string) => void;
    handlePartRecipientChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ classes, recipientType, handleDelete, handlePartRecipientChange }) => {
    const { t } = useTranslation();

    const parentsRecipients = [
        {
            value: SpecificRecipientInputValues.all,
            label: t('newsletter.specific-recipient-value-labels.all-parents'),
        },
        {
            value: SpecificRecipientInputValues.kindergarten,
            label: t('newsletter.specific-recipient-value-labels.from-single-kindergarten'),
        },
        {
            value: SpecificRecipientInputValues.single,
            label: t('newsletter.specific-recipient-value-labels.individual-message'),
        },
    ];

    const kindergartensRecipients = [
        {
            value: SpecificRecipientInputValues.all,
            label: t('newsletter.specific-recipient-value-labels.all-kindergartens'),
        },
        {
            value: SpecificRecipientInputValues.single,
            label: t('newsletter.specific-recipient-value-labels.single-kindergarten'),
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
            disabled={!recipientType.generalType}
            onChange={handlePartRecipientChange}
            SelectProps={{
                value: recipientType.specificType,
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                },
                renderValue: value => {
                    const getLabel = () => {
                        if (recipientType.generalType === GeneralRecipientInputValues.parents) {
                            const specificTypeParentRecipient = parentsRecipients.find(
                                element => element.value === (value as string),
                            );
                            if (specificTypeParentRecipient) return specificTypeParentRecipient.label;
                        }
                        if (recipientType.generalType === GeneralRecipientInputValues.kindergartens) {
                            const specificTypekindergartenRecipient = kindergartensRecipients.find(
                                element => element.value === (value as string),
                            );
                            if (specificTypekindergartenRecipient) return specificTypekindergartenRecipient.label;
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
                            onDelete={() => handleDelete('specificTypeInput', value as string)}
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
            name="specificType"
            label={t('newsletter.specific-recipient-label')}
            fullWidth
        >
            {recipientType.generalType === GeneralRecipientInputValues.parents
                ? createMenuItems(parentsRecipients)
                : createMenuItems(kindergartensRecipients)}
        </TextField>
    );
};
