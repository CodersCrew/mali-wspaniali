import React, { useEffect, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Card, CardHeader, Divider, CardContent } from '@material-ui/core';
import { mainColor, newsletterColors, textColor, white } from '../../colors';
import { RecipientType } from './NewsletterGeneralTypeTextField';
import { NewsletterOptionalTextField } from './NewsletterOptionalTextField';
import { NewsletterSpecificTypeTextField } from './NewsletterSpecificTypeTextField';
import { GeneralRecipientInputValues, SpecificRecipientInputValues, NewsletterRecipientProps } from './types';
import { useSubscribed } from '../../hooks/useSubscribed';
import { getParents } from '../../queries/userQueries';
import { Parent } from '../ParentProfile/types';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Kindergarten } from '../../firebase/types';
import { getKindergartens } from '../../queries/kindergartenQueries';

export const NewsletterRecipent = ({
    generalType,
    specificType,
    recipients,
    handleChange,
    selectRecipients,
    setFields,
}: NewsletterRecipientProps) => {
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

    const temporaryHandleChange = (e: ChangeEvent<{ value: unknown }>) => console.log(e.target.value);

    return (
        <Card>
            <CardHeader title={t('newsletter.recipient-heading')} titleTypographyProps={{ variant: 'h4' }} />
            <Divider />
            <CardContent>
                <RecipientType generalType={generalType} handleRecipientTypeChange={temporaryHandleChange} />
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
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        // TODO: remove this
        container: {
            borderRadius: 4,
            boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
            backgroundColor: white,
            minHeight: 169,
            position: 'relative',
            marginBottom: 35,
        },
        // TODO: remove this
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
