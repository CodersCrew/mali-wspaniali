import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, Divider, CardContent, Grid } from '@material-ui/core';
import { SingleSelect } from './SingleSelect';
import { MultipleSelect } from './MultipleSelect';
import { NewsletterRecipientProps, SelectOptionsValues } from './types';
import { useSubscribed } from '../../hooks/useSubscribed';
import { getParents } from '../../queries/userQueries';
import { Parent } from '../ParentProfile/types';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { Kindergarten } from '../../firebase/types';
import { getKindergartens } from '../../queries/kindergartenQueries';
import { recipientType, parentsRecipients, kindergartensRecipients } from './data';
import {
    areParentsFromKindergartenSelected,
    areParentsSelected,
    areSpecificRecipientsRequired,
    setLabel,
} from './utils';

export const NewsletterRecipent = ({
    generalType,
    specificType,
    recipients,
    handleChange,
}: NewsletterRecipientProps) => {
    const { t } = useTranslation();

    const parents = useSubscribed<Parent[] | null>((callback: OnSnapshotCallback<Parent[]>) => {
        getParents(callback);
    }) as string[];

    const kindergartens = useSubscribed<Kindergarten[] | null>((callback: OnSnapshotCallback<Kindergarten[]>) => {
        getKindergartens(callback);
    }) as Kindergarten[];

    // Temporary solution until parents come with the id
    const parentsOptionsValues: SelectOptionsValues =
        parents &&
        parents.map((parent, idx) => ({
            value: idx.toString(),
            label: parent,
        }));

    const kindergartenOptionsValues: SelectOptionsValues =
        kindergartens &&
        kindergartens.map(kindergarten => {
            const { city, number, id } = kindergarten;

            return {
                value: id,
                label: `Przedszkole nr ${number}, ${city}`,
            };
        });

    const specificTypeOptionsValues = areParentsSelected(generalType) ? parentsRecipients : kindergartensRecipients;

    const recipientsOptionsValues = areParentsSelected(generalType) && !areParentsFromKindergartenSelected(specificType)
        ? parentsOptionsValues
        : kindergartenOptionsValues;

    const renderRecipients = (selected:unknown) => {
        return (selected as string[]).map(id => {
            const obj = areParentsSelected(generalType) ? parentsOptionsValues.find(parent => parent.value === id) : kindergartenOptionsValues.find(kindergarten => kindergarten.value === id);

            return obj?.label;
        })
            .join(', ');};

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
                            disabled={!generalType.value}
                            name="specificType"
                        />
                    </Grid>
                    {areSpecificRecipientsRequired(specificType) ? (
                        <Grid item xs={12}>
                            <MultipleSelect
                                stateData={recipients}
                                optionsValues={recipientsOptionsValues}
                                handleChange={handleChange}
                                id="recipients"
                                label={t(setLabel(generalType, specificType, recipients))}
                                name="recipients"
                                renderValue={renderRecipients}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </CardContent>
        </Card>
    );
};
