import React from 'react';
import {useQuery} from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, Divider, CardContent, Grid } from '@material-ui/core';
import { SingleSelect } from './SingleSelect';
import { MultipleSelect } from './MultipleSelect';
import { NewsletterRecipientProps } from './types';
import { recipientType, parentsRecipients, kindergartensRecipients } from './data';
import { setLabel, generateKindergardenOptions } from './utils';
import { KINDERGARTENS, KindergartenResponse } from '../../graphql/kindergartensRepository';

export const NewsletterRecipent = ({
    generalType,
    specificType,
    recipients,
    handleChange,
}: NewsletterRecipientProps) => {
    const { t } = useTranslation();
    const { data: kindergartensData } = useQuery<KindergartenResponse>(KINDERGARTENS);

    const specificTypeOptionsValues = generalType.value === 'PARENTS' ? parentsRecipients : kindergartensRecipients;

    const renderKindergardens = (selected:unknown) => {
        return (selected as string[]).map(id => {
            const obj = kindergardenOptionsValues.find(kindergarden => kindergarden.value === id);

            return obj?.label;
        })
            .join(', ');};

    if (!kindergartensData) return null;

    const { kindergartens } = kindergartensData;

    const kindergardenOptionsValues = generateKindergardenOptions(kindergartens, t);

    return (
        <Card>
            <CardHeader title={t('newsletter.recipient-heading')} titleTypographyProps={{ variant: 'h4' }} />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SingleSelect
                            stateData={generalType}
                            optionsValues={recipientType}
                            handleChange={handleChange}
                            id="recipient-type"
                            label={t('newsletter.general-recipient-label')}
                            name="generalType"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SingleSelect
                            stateData={specificType}
                            optionsValues={specificTypeOptionsValues}
                            handleChange={handleChange}
                            id="specific-recipient-type"
                            label={t('newsletter.specific-recipient-label')}
                            name="specificType"
                        />
                    </Grid>
                    {(specificType.value === 'KINDERGARTEN' || specificType.value === 'SINGLE') && (
                        <Grid item xs={12}>
                            <MultipleSelect
                                stateData={recipients}
                                optionsValues={kindergardenOptionsValues}
                                handleChange={handleChange}
                                id="recipients"
                                label={t(setLabel(generalType.value, specificType.value, recipients))}
                                name="recipients"
                                renderValue={renderKindergardens}
                            />
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};
