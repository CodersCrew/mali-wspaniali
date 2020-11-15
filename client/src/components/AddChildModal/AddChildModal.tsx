import React from 'react';
import { useFormik } from 'formik';
import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useBreakpoints } from '../../queries/useBreakpoints';
import { useSelectOptions } from './useSelectValues';
import { Input } from './Input';
import { Select } from './Select';
import { Kindergarten } from '../../graphql/types';
import { BasicModal } from '../Modal/BasicModal';
import { AddChildResult } from './AddChildModal.types';

const initialValues = {
    firstname: '',
    lastname: '',
    sex: '',
    'birth-date': '',
    'birth-quarter': '',
    kindergarten: '',
};

interface Props {
    isOpen: boolean;
    kindergartens: Kindergarten[];
    handleSubmit: (data: AddChildResult) => void;
    handleReset?: (e: any) => void;
    isCancelButtonVisible: boolean;
}

const validationSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    sex: yup.string().required(),
    'birth-date': yup.string().required(),
    'birth-quarter': yup.string().required(),
    kindergarten: yup.string().required(),
});

export function AddChildModal({ handleSubmit, isOpen, kindergartens, handleReset, isCancelButtonVisible }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useBreakpoints();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: data => handleSubmit(data),
        onReset: handleReset,
    });
    const { getOptions } = useSelectOptions();

    const kindergartenOptions = kindergartens.map(mapKindergartenToOption);

    return (
        <BasicModal
            isOpen={isOpen}
            actionName={t('add-child-modal.button')}
            onAction={formik.handleSubmit}
            onClose={formik.handleReset}
            isCancelButtonVisible={isCancelButtonVisible}
        >
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Typography variant="h4" classes={{ root: classes.title }}>
                    {t('add-child-modal.heading')}
                </Typography>
                <Typography variant="body1" paragraph classes={{ root: classes.description }}>
                    {t('add-child-modal.description')}
                </Typography>
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
                                    onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
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
                            onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
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
                                    onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
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
            </form>
        </BasicModal>
    );
}

function mapKindergartenToOption(kindergarten: Kindergarten) {
    return { value: kindergarten._id, label: `nr. ${kindergarten.number}, ${kindergarten.name}` };
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: { marginBottom: theme.spacing(3) },
        description: { marginBottom: theme.spacing(2) },
        container: {
            maxWidth: 640,
        },
        item: {
            flex: 1,
        },
    }),
);
