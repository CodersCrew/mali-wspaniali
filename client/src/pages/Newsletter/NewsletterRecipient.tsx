import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { mainColor, white, newsletterColors, textColor } from '../../colors';
import { NewsletterGeneralTypeTextField } from './NewsletterGeneralTypeTextField';
import { NewsletterOptionalTextField } from './NewsletterOptionalTextField';
import { NewsletterSpecificTypeTextField } from './NewsletterSpecificTypeTextField';
import { GeneralRecipientInputValues, SpecificRecipientInputValues, SingleFieldType, FieldsType } from './types';
import { useSubscribed } from '../../hooks/useSubscribed';
import { getParents } from '../../queries/userQueries';
import { Parent } from '../ParentProfile/types';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Kindergarten } from '../../firebase/types';
import { getKindergartens } from '../../queries/kindergartenQueries';

export const NewsletterRecipent: React.FC<{
    generalType: SingleFieldType;
    specificType: SingleFieldType;
    recipients: {
        value: string[];
        error: boolean;
    };
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    selectRecipients: (filteredRecipients: string[]) => void;
    setFields: React.Dispatch<React.SetStateAction<FieldsType>>;
}> = ({ generalType, specificType, recipients, handleChange, selectRecipients, setFields }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const parents = useSubscribed<Parent[] | null>((callback: OnSnapshotCallback<Parent[]>) => {
        getParents(callback);
    }) as string[];
    const kindergartens = useSubscribed<Kindergarten[] | null>((callback: OnSnapshotCallback<Kindergarten[]>) => {
        getKindergartens(callback);
    }) as Kindergarten[];
    useEffect(() => {
        if (specificType.value === '') {
            selectRecipients([]);
        }
        if (
            generalType.value === GeneralRecipientInputValues.parents &&
            specificType.value === SpecificRecipientInputValues.all
        ) {
            selectRecipients(parents);
        }
        if (
            generalType.value === GeneralRecipientInputValues.kindergartens &&
            specificType.value === SpecificRecipientInputValues.all
        ) {
            if (kindergartens) {
                const kindergartensId = kindergartens.map((kindergarten: Kindergarten) => kindergarten.id);
                selectRecipients(kindergartensId);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generalType, specificType]);

    const handleDelete = (name: string) => {
        if (name === 'generalType') {
            setFields(prevFields => ({
                ...prevFields,
                generalType: {
                    error: true,
                    value: '',
                },
                specificType: {
                    ...specificType,
                    value: '',
                },
            }));
        } else {
            setFields(prevFields => ({
                ...prevFields,
                [name]: {
                    error: true,
                    value: '',
                },
            }));
        }
    };
    return (
        <div className={classes.container}>
            <Typography className={classes.heading}>{t('newsletter.recipient-heading')}</Typography>
            <NewsletterGeneralTypeTextField
                classes={classes}
                generalType={generalType}
                handleDelete={handleDelete}
                handleRecipientTypeChange={handleChange}
            />
            <NewsletterSpecificTypeTextField
                classes={classes}
                generalType={generalType}
                specificType={specificType}
                handleDelete={handleDelete}
                handleRecipientTypeChange={handleChange}
            />
            {specificType.value === SpecificRecipientInputValues.single ||
            specificType.value === SpecificRecipientInputValues.kindergarten ? (
                    <NewsletterOptionalTextField
                        classes={classes}
                        selectRecipients={selectRecipients}
                        generalType={generalType}
                        specificType={specificType}
                        recipients={recipients}
                        handleChange={handleChange}
                        parents={parents}
                        kindergartens={kindergartens}
                        setFields={setFields}
                    />
                ) : null}
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            borderRadius: 4,
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
            backgroundColor: white,
            minHeight: 169,
            position: 'relative',
            marginBottom: 35,
        },
        heading: {
            backgroundColor: mainColor,
            color: white,
            fontSize: 18,
            fontWeight: 500,
            margin: '0 10px',
            padding: '8px 0 8px 16px',
            boxShadow: '1px 1px 4px 0 rgba(0, 138, 173, 0.25)',
            borderRadius: 4,
            position: 'relative',
            top: -15,
            lineHeight: '22px',
        },
        textfield: {
            maxWidth: 'calc(100% - 60px)',
            left: 30,
            marginBottom: 20,
            '& label': {
                fontSize: 15,
                lineHeight: 1.2,
                color: textColor,
                opacity: 0.42,
                '&.Mui-focused': {
                    opacity: 1,
                    fontSize: 12,
                },
            },
            '& .MuiFormLabel-asterisk': {
                display: 'none',
            },
        },
        underlineFocus: {
            '&:after': {
                borderBottom: `2px solid ${mainColor}`,
            },
        },
        underlineDisabled: {
            '&.Mui-disabled:before': {
                opacity: 0.5,
                borderBottom: `2px solid ${newsletterColors.disabledColor}`,
            },
        },
        selectItem: {
            fontSize: 12,
            color: textColor,
        },
        inputChipLabel: {
            fontSize: 15,
            color: textColor,
        },
        asterisk: {
            display: 'none',
        },
        selectMenuItem: {
            padding: 0,
        },
        selectMenuCheckbox: {
            padding: '6px 8px',
        },
        selectMenuItemText: {
            fontSize: 12,
            color: textColor,
        },
    }),
);
