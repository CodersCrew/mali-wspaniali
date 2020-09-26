import React from 'react';
import { useFormik } from 'formik';
import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { selectValues } from './selectValues';
import { Input } from './Input';
import { Select } from './Select';
import { Kindergarten } from '../../graphql/types';
import { BasicModal } from '../Modal/BasicModal';

interface AddChildResult {
    name: string;
    sex: string;
    'birth-date': string;
    'birth-quarter': string;
    kindergarten: string;
}

const initialValues = {
    name: '',
    sex: '',
    'birth-date': '',
    'birth-quarter': '',
    kindergarten: '',
};

interface Props {
    isOpen: boolean;
    kindergartens: Kindergarten[];
    handleSubmit: (data: AddChildResult) => void;
}

const validationSchema = yup.object({
    name: yup.string().required(),
    sex: yup.string().required(),
    'birth-date': yup.string().required(),
    'birth-quarter': yup.string().required(),
    city: yup.string().required(),
    kindergarten: yup.string().required(),
});

export function AddChildModal({ handleSubmit, isOpen, kindergartens }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useBreakpoints();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: data => handleSubmit(data),
    });

    const kindergartenOptions = kindergartens.map(mapKindergartenToOption);

    return (
        <BasicModal isOpen={isOpen} actionName={t('add-child-modal.button')} onAction={formik.handleSubmit}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4">{t('add-child-modal.heading')}</Typography>
                <Typography variant="body1" paragraph>
                    {t('add-child-modal.description')}
                </Typography>
                <Grid container spacing={2} className={classes.container}>
                    <Grid item xs={12}>
                        <Input
                            value={formik.values.name}
                            name="name"
                            label={t('add-child-modal.inputs.name-surname')}
                            error={formik.errors.name}
                            touched={formik.touched.name}
                            onChange={(name: string, value: string) => formik.setFieldValue(name, value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            label={t('add-child-modal.select-options.sex.label')}
                            value={formik.values.sex}
                            options={selectValues.sex}
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
                                    options={selectValues['birth-date']}
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
                                    options={selectValues['birth-quarter']}
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

export const useStyles = makeStyles(() =>
    createStyles({
        container: {
            maxWidth: 640,
        },
        item: {
            flex: 1,
        },
    }),
);
