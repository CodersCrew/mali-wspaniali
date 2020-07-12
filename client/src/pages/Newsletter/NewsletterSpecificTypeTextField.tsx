import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, Chip } from '@material-ui/core';
import { GeneralRecipientInputValues, SpecificRecipientInputValues, SingleFieldType } from './types';

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
    generalType: SingleFieldType;
    specificType: SingleFieldType;
    handleDelete: (name: string) => void;
    handleRecipientTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ classes, generalType, specificType, handleDelete, handleRecipientTypeChange }) => {
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
            disabled={!generalType.value}
            onChange={handleRecipientTypeChange}
            SelectProps={{
                value: specificType.value,
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                },
                renderValue: value => {
                    const getLabel = () => {
                        if (generalType.value === GeneralRecipientInputValues.parents) {
                            const specificTypeParentRecipient = parentsRecipients.find(
                                element => element.value === (value as string),
                            );
                            if (specificTypeParentRecipient) return specificTypeParentRecipient.label;
                        }
                        if (generalType.value === GeneralRecipientInputValues.kindergartens) {
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
                            onDelete={() => handleDelete('specificType')}
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
            error={specificType.error}
            helperText={specificType.error ? t('newsletter.specific-recipient-helper-text') : null}
            fullWidth
        >
            {generalType.value === GeneralRecipientInputValues.parents
                ? createMenuItems(parentsRecipients)
                : createMenuItems(kindergartensRecipients)}
        </TextField>
    );
};
