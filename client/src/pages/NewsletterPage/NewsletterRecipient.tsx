import React, { ChangeEvent, FocusEvent } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, Divider, CardContent, Grid } from '@material-ui/core';
import { SingleSelect } from './SingleSelect';
import { MultipleSelect } from './MultipleSelect';
import { recipientType, parentsRecipients, kindergartensRecipients } from './data';
import { setLabel, generateKindergardenOptions } from './utils';
import { KINDERGARTENS, KindergartenResponse } from '../../graphql/kindergartensRepository';
import { GeneralRecipient, SpecificRecipient, NewsletterFormValues } from './types';

interface Props {
    generalRecipientType: GeneralRecipient | '';
    specificRecipientType: SpecificRecipient | '';
    recipients: string[];
    handleChange: (e: ChangeEvent<any>) => void;
    handleBlur: (e: FocusEvent<any>) => void;
    errors: FormikErrors<NewsletterFormValues>;
    touched: FormikTouched<NewsletterFormValues>;
}

export const NewsletterRecipent = ({
    generalRecipientType,
    specificRecipientType,
    recipients,
    handleChange,
    handleBlur,
    errors,
    touched,
}: Props) => {
    const { t } = useTranslation();
    const { data: kindergartensData } = useQuery<KindergartenResponse>(KINDERGARTENS);

    const specificTypeOptionsValues = generalRecipientType === 'PARENTS' ? parentsRecipients : kindergartensRecipients;

    const renderKindergardens = (selected: unknown) => {
        return (selected as string[])
            .map(id => {
                const obj = kindergardenOptionsValues.find(kindergarden => kindergarden.value === id);

                return obj ? obj.label : 'unknown label';
            })
            .join(', ');
    };

    if (!kindergartensData) return null;

    const { kindergartens } = kindergartensData;

    const kindergardenOptionsValues = generateKindergardenOptions(kindergartens);

    return (
        <Card>
            <CardHeader title={t('newsletter.recipient-heading')} titleTypographyProps={{ variant: 'h4' }} />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SingleSelect
                            stateData={generalRecipientType}
                            optionsValues={recipientType}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            id="generalRecipientType"
                            label={t('newsletter.general-recipient-label')}
                            name="generalRecipientType"
                            error={errors.generalRecipientType}
                            touched={touched.generalRecipientType}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SingleSelect
                            stateData={specificRecipientType}
                            optionsValues={specificTypeOptionsValues}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            id="specificRecipientType"
                            label={t('newsletter.specific-recipient-label')}
                            name="specificRecipientType"
                            disabled={!generalRecipientType}
                            error={errors.specificRecipientType}
                            touched={touched.specificRecipientType}
                        />
                    </Grid>
                    {(specificRecipientType === 'KINDERGARTEN' || specificRecipientType === 'SINGLE') && (
                        <Grid item xs={12}>
                            <MultipleSelect
                                stateData={recipients}
                                optionsValues={kindergardenOptionsValues}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                id="recipients"
                                label={t(setLabel(generalRecipientType, specificRecipientType, recipients))}
                                name="recipients"
                                renderValue={renderKindergardens}
                                error={errors.recipients}
                                touched={touched.recipients}
                            />
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};
