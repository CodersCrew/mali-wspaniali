import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
import { mainColor, white, newsletterColors, textColor } from '../../colors';
import { NewsletterGeneralTypeTextField } from './NewsletterGeneralTypeTextField';
import { NewsletterOptionalTextField } from './NewsletterOptionalTextField';
import { NewsletterSpecificTypeTextField } from './NewsletterSpecificTypeTextField';
import { parentsMockData, preschoolsMockData } from './mockData';
import { GeneralRecipientInputValues, SpecificRecipientInputValues } from './types';

export const NewsletterRecipent: React.FC<{
    recipientType: {
        generalType: string;
        specificType: string;
    };
    setRecipientType: React.Dispatch<
        React.SetStateAction<{
            generalType: string;
            specificType: string;
        }>
    >;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    recipients: string[];
    selectRecipients: (filteredRecipients: string[]) => void;
}> = ({ recipientType, setRecipientType, handleChange, recipients, selectRecipients }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        if (recipientType.specificType === '') {
            selectRecipients([]);
        }
        if (
            recipientType.generalType === GeneralRecipientInputValues.parents &&
            recipientType.specificType === SpecificRecipientInputValues.all
        ) {
            selectRecipients(parentsMockData);
        }
        if (
            recipientType.generalType === GeneralRecipientInputValues.kindergartens &&
            recipientType.specificType === SpecificRecipientInputValues.all
        ) {
            selectRecipients(preschoolsMockData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipientType]);

    const handlePartRecipientChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRecipientType(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };
    const handleDelete = (name: string) => {
        if (name === 'generalTypeInput') {
            setRecipientType({ generalType: '', specificType: '' });
        } else {
            setRecipientType(prevFields => ({
                ...prevFields,
                [name]: '',
            }));
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.heading}>{t('newsletter.recipient-heading')}</div>
            <NewsletterGeneralTypeTextField
                classes={classes}
                recipientType={recipientType}
                handleDelete={handleDelete}
                handlePartRecipientChange={handlePartRecipientChange}
            />
            <NewsletterSpecificTypeTextField
                classes={classes}
                recipientType={recipientType}
                handleDelete={handleDelete}
                handlePartRecipientChange={handlePartRecipientChange}
            />
            {recipientType.specificType === SpecificRecipientInputValues.single ||
            recipientType.specificType === SpecificRecipientInputValues.kindergarten ? (
                <NewsletterOptionalTextField
                    classes={classes}
                    selectRecipients={selectRecipients}
                    recipientType={recipientType}
                    recipients={recipients}
                    handleChange={handleChange}
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
