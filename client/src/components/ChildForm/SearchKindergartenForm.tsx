import React from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FormikProps } from 'formik';

import { useSelectOptions } from './useSelectValues';
import { Input } from './Input';
import { Select } from './Select';
import { Kindergarten, AddChildResult } from '../../graphql/types';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { mapKindergartenToOption } from './utils';

interface KindergardenProp {
    kindergartens: Kindergarten[];
    formik: FormikProps<AddChildResult>;
}

export const ChildForm = ({ kindergartens, formik }: KindergardenProp) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useBreakpoints();
    const { getOptions } = useSelectOptions();

    const kindergartenOptions = kindergartens.map(mapKindergartenToOption);

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12}>
                <Grid container spacing={2} direction={device !== 'DESKTOP' ? 'column' : 'row'}>
                    <Grid item classes={{ root: classes.item }}>
                        <Input
                            value={formik.values.firstname}
                            name="firstname"
                            label={t('add-child-modal.inputs.firstname')}
                            error={formik.errors.firstname}
                            touched={formik.touched.firstname}
                            onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                        />
                    </Grid>
                    <Grid item classes={{ root: classes.item }}>
                        <Input
                            value={formik.values.lastname}
                            name="lastname"
                            label={t('add-child-modal.inputs.lastname')}
                            error={formik.errors.lastname}
                            touched={formik.touched.lastname}
                            onChange={(name: string, value: string) => {
                                formik.setFieldValue(name, value);
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Select
                    label={t('add-child-modal.select-options.sex.label')}
                    value={formik.values.sex}
                    options={getOptions('sex')}
                    error={formik.errors.sex}
                    touched={formik.touched.sex}
                    name="sex"
                    onChange={(name: string, value: string) => {
                        formik.setFieldValue(name, value);
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} direction={device !== 'DESKTOP' ? 'column' : 'row'}>
                    <Grid item classes={{ root: classes.item }}>
                        <Select
                            label={t('add-child-modal.select-options.birth-date.label')}
                            value={formik.values['birth-date']}
                            options={getOptions('birth-date')}
                            error={formik.errors['birth-date']}
                            touched={formik.touched['birth-date']}
                            name="birth-date"
                            onChange={(name: string, value: string) => {
                                formik.setFieldValue(name, value);
                            }}
                        />
                    </Grid>
                    <Grid item classes={{ root: classes.item }}>
                        <Select
                            label={t('add-child-modal.select-options.birth-quarter.label')}
                            value={formik.values['birth-quarter']}
                            options={getOptions('birth-quarter')}
                            error={formik.errors['birth-quarter']}
                            touched={formik.touched['birth-quarter']}
                            name="birth-quarter"
                            onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Select
                    label={t('add-child-modal.select-options.kindergarten.label')}
                    value={formik.values.kindergarten}
                    options={kindergartenOptions}
                    error={formik.errors.kindergarten}
                    touched={formik.touched.kindergarten}
                    name="kindergarten"
                    onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                />
            </Grid>
        </Grid>
    );
};

export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        maxWidth: 640,
    },
    item: {
        flex: 1,
    },
}));
