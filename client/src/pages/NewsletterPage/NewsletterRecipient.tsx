import { FocusEvent } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, Divider, CardContent, Grid } from '@material-ui/core';

import { SingleSelect } from './SingleSelect';
import { MultipleSelect } from './MultipleSelect';
import { GeneralRecipient, SpecificRecipient, NewsletterFormValues } from './types';
import { parentsRecipients, kindergartensRecipients } from './data';
import { Kindergarten } from '@app/graphql/types';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';

const setLabel = (
    generalType: GeneralRecipient | '',
    specificType: SpecificRecipient | '',
    recipients: string[],
): string => {
    if (generalType === 'PARENTS' && specificType === 'KINDERGARTEN') {
        if (recipients.length) {
            return 'newsletter.recipient-select-kindergarten-label-filled';
        }

        return 'newsletter.recipient-select-kindergarten-label';
    }

    if (recipients.length) {
        return 'newsletter.recipient-single-kindergarten-label-filled';
    }

    return 'newsletter.recipient-single-kindergarten-label';
};

const generateKindergardenOptions = (kindergardens: Kindergarten[]): { value: string; label: string }[] => {
    const values = kindergardens.map((kindergarden) => {
        const { _id, number, name, city, address } = kindergarden;

        return {
            value: _id,
            label: `${number}, ${name} ${address} ${city}`,
        };
    });

    return values;
};

interface Props {
    generalRecipientType: GeneralRecipient | '';
    specificRecipientType: SpecificRecipient | '';
    recipients: string[];
    onChange: (name: string, value: string | string[]) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    errors: FormikErrors<NewsletterFormValues>;
    touched: FormikTouched<NewsletterFormValues>;
}

export const NewsletterRecipent = ({
    generalRecipientType,
    specificRecipientType,
    recipients,
    onChange,
    onBlur,
    errors,
    touched,
}: Props) => {
    const { t } = useTranslation();
    const { kindergartenList } = useKindergartens();

    const specificTypeOptionsValues = generalRecipientType === 'PARENTS' ? parentsRecipients : kindergartensRecipients;

    const kidergartenInputValues = (selected: unknown) => {
        if (Array.isArray(selected)) {
            return selected
                .map((id) => {
                    const obj = kindergardenOptionsValues.find((kindergarden) => kindergarden.value === id);

                    return obj ? obj.label : 'unknown label';
                })
                .join(', ');
        }

        return '';
    };

    if (!kindergartenList) return null;

    const kindergardenOptionsValues = generateKindergardenOptions(kindergartenList);

    return (
        <Card>
            <CardHeader title={t('newsletter.recipient-heading')} titleTypographyProps={{ variant: 'h4' }} />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SingleSelect
                            stateData={specificRecipientType}
                            optionsValues={specificTypeOptionsValues}
                            onChange={onChange}
                            onBlur={onBlur}
                            id="specificRecipientType"
                            label={t('newsletter.specific-recipient-label')}
                            name="specificRecipientType"
                            error={errors.specificRecipientType}
                            touched={touched.specificRecipientType}
                        />
                    </Grid>
                    {(specificRecipientType === 'KINDERGARTEN' || specificRecipientType === 'SINGLE') && (
                        <Grid item xs={12}>
                            <MultipleSelect
                                stateData={recipients}
                                optionsValues={kindergardenOptionsValues}
                                onChange={onChange}
                                onBlur={onBlur}
                                id="recipients"
                                label={t(setLabel(generalRecipientType, specificRecipientType, recipients))}
                                name="recipients"
                                renderValue={kidergartenInputValues}
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
