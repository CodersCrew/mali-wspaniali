import React, { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { mainColor } from '../../colors';
import { NewsletterPrimaryTextField } from './NewsletterPrimaryTextField';
import { NewsletterOptionalTextField } from './NewsletterOptionalTextField';
import { NewsletterSecondaryTextField } from './NewsletterSecondaryTextField';
import { parentsMockData, preschoolsMockData } from './mockData';

export const NewsletterRecipent: React.FC<{
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    recipients: string[];
    filterRecipients: (filteredRecipients: string[]) => void;
}> = ({ handleChange, recipients, filterRecipients }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [partRecipients, setPartRecipients] = useState({ primary: '', secondary: '' });

    useEffect(() => {
        if (partRecipients.secondary === '') {
            console.log('reset recipieits');
            filterRecipients([]);
        }
        if (partRecipients.primary === 'parent' && partRecipients.secondary === 'all') {
            console.log('select all parents');
            filterRecipients(parentsMockData);
        }
        if (partRecipients.primary === 'preschools' && partRecipients.secondary === 'all') {
            console.log('select all preschools');
            filterRecipients(preschoolsMockData);
        }
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
            {partRecipients.secondary === 'single' || partRecipients.secondary === 'preschool' ? (
                <NewsletterOptionalTextField
                    classes={classes}
                    filterRecipients={filterRecipients}
                    partRecipients={partRecipients}
                    recipients={recipients}
                    handleChange={handleChange}
                />
            ) : null}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            borderRadius: 4,
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
            backgroundColor: '#ffffff',
            minHeight: 169,
            position: 'relative',
            marginBottom: 35,
        },
        heading: {
            backgroundColor: mainColor,
            color: '#ffffff',
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
                color: '#1d1d1b',
                opacity: 0.42,
                '&.Mui-focused': {
                    color: '#008aad',
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
                borderBottom: '2px solid #008aad',
            },
        },
        selectItem: {
            fontSize: 12,
            color: '1d1d1b',
        },
    }),
);
