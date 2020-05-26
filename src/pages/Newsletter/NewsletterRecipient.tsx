import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
import { mainColor, white, newsletterColors, textColor } from '../../colors';
import { NewsletterPrimaryTextField } from './NewsletterPrimaryTextField';
import { NewsletterOptionalTextField } from './NewsletterOptionalTextField';
import { NewsletterSecondaryTextField } from './NewsletterSecondaryTextField';
import { parentsMockData, preschoolsMockData } from './mockData';
import { PrimaryInputValues, SecondaryInputValues } from './types';

export const NewsletterRecipent: React.FC<{
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    recipients: string[];
    selectRecipients: (filteredRecipients: string[]) => void;
}> = ({ handleChange, recipients, selectRecipients }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [partRecipients, setPartRecipients] = useState({ primary: '', secondary: '' });

    useEffect(() => {
        if (partRecipients.secondary === '') {
            selectRecipients([]);
        }
        if (
            partRecipients.primary === PrimaryInputValues.parents &&
            partRecipients.secondary === SecondaryInputValues.all
        ) {
            selectRecipients(parentsMockData);
        }
        if (
            partRecipients.primary === PrimaryInputValues.preschools &&
            partRecipients.secondary === SecondaryInputValues.all
        ) {
            selectRecipients(preschoolsMockData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partRecipients]);

    const handlePartRecipientChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPartRecipients(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };
    const handleDelete = (name: string) => {
        if (name === 'primary') {
            setPartRecipients({ primary: '', secondary: '' });
        } else {
            setPartRecipients(prevFields => ({
                ...prevFields,
                [name]: '',
            }));
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.heading}>{t('newsletter.recipient-heading')}</div>
            <NewsletterPrimaryTextField
                classes={classes}
                partRecipients={partRecipients}
                handleDelete={handleDelete}
                handlePartRecipientChange={handlePartRecipientChange}
            />
            <NewsletterSecondaryTextField
                classes={classes}
                partRecipients={partRecipients}
                handleDelete={handleDelete}
                handlePartRecipientChange={handlePartRecipientChange}
            />
            {partRecipients.secondary === SecondaryInputValues.single ||
            partRecipients.secondary === SecondaryInputValues.preschool ? (
                <NewsletterOptionalTextField
                    classes={classes}
                    selectRecipients={selectRecipients}
                    partRecipients={partRecipients}
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
