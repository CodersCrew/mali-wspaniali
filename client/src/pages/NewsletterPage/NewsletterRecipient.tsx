import React, { ChangeEvent } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, Divider, CardContent, Grid } from '@material-ui/core';
import { SingleSelect } from './SingleSelect';
import { MultipleSelect } from './MultipleSelect';
import { recipientType, parentsRecipients, kindergartensRecipients } from './data';
import { setLabel, generateKindergardenOptions } from './utils';
import { KINDERGARTENS, KindergartenResponse } from '../../graphql/kindergartensRepository';
import { GeneralRecipient, SpecificRecipient } from './types';

interface Props {
    generalRecipientType: GeneralRecipient | '';
    specificRecipientType: SpecificRecipient | '';
    recipients: string[];
    handleChange: (e: ChangeEvent<any>) => void;
};

export const NewsletterRecipent = ({
    generalRecipientType,
    specificRecipientType,
    recipients,
    handleChange,
}: Props) => {
    const { t } = useTranslation();
    const { data: kindergartensData } = useQuery<KindergartenResponse>(KINDERGARTENS);

    const specificTypeOptionsValues = generalRecipientType === 'PARENTS' ? parentsRecipients : kindergartensRecipients;

    const renderKindergardens = (selected: unknown) => {
        return (selected as string[])
            .map(id => {
                const obj = kindergardenOptionsValues.find(kindergarden => kindergarden.value === id);

                return obj?.label;
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
                            id="generalRecipientType"
                            label={t('newsletter.general-recipient-label')}
                            name="generalRecipientType"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SingleSelect
                            stateData={specificRecipientType}
                            optionsValues={specificTypeOptionsValues}
                            handleChange={handleChange}
                            id="specificRecipientType"
                            label={t('newsletter.specific-recipient-label')}
                            name="specificRecipientType"
                            disabled={!generalRecipientType}
                        />
                    </Grid>
                    {(specificRecipientType === 'KINDERGARTEN' || specificRecipientType === 'SINGLE') && (
                        <Grid item xs={12}>
                            <MultipleSelect
                                stateData={recipients}
                                optionsValues={kindergardenOptionsValues}
                                handleChange={handleChange}
                                id="recipients"
                                label={t(setLabel(generalRecipientType, specificRecipientType, recipients))}
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
