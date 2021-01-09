import React from 'react';
import { useFormik } from 'formik';
import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useBreakpoints } from '../../queries/useBreakpoints';
import { useSelectOptions } from './useSelectValues';
import { Input } from './Input';
import { Select } from './Select';
import { ChildInput, Kindergarten } from '../../graphql/types';
import { BasicModal } from '../Modal/BasicModal';
import { AddChildResult } from './AddChildModal.types';
import { openDialog, ActionDialog } from '../../utils/openDialog';

const initialValues: AddChildResult = {
    firstname: '',
    lastname: '',
    sex: '',
    'birth-date': '',
    'birth-quarter': '',
    kindergarten: '',
};

interface Props {
    kindergartens: Kindergarten[];
    isCancelButtonVisible?: boolean;
    preventClose?: boolean;
}

const validationSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    sex: yup.string().required(),
    'birth-date': yup.string().required(),
    'birth-quarter': yup.string().required(),
    kindergarten: yup.string().required(),
});

export const openAddChildModal = (options: Props) => {
    return openDialog<Props, { child: ChildInput }>(AddChildModal, options);
};

export function AddChildModal({
    kindergartens,
    isCancelButtonVisible,
    makeDecision,
    onClose,
    preventClose,
}: Props & ActionDialog<{ child: ChildInput }>) {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useBreakpoints();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            makeDecision({ accepted: true, child: normalizeChild(values) });
        },
    });
    const { getOptions } = useSelectOptions();

    const kindergartenOptions = kindergartens.map(mapKindergartenToOption);

    return (
        <BasicModal
            isOpen={true}
            actionName={t('add-child-modal.button')}
            onAction={formik.handleSubmit}
            onClose={() => {
                if (!preventClose) {
                    onClose();
                }
            }}
            isCancelButtonVisible={isCancelButtonVisible}
        >
            <form className={classes.innerContent} onSubmit={formik.handleSubmit}>
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

function normalizeChild(child: AddChildResult): ChildInput {
    return {
        firstname: child.firstname,
        lastname: child.lastname,
        birthYear: parseInt(child['birth-date'], 10),
        birthQuarter: parseInt(child['birth-quarter'], 10),
        sex: child.sex,
        kindergartenId: child.kindergarten,
    };
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
        innerContent: {
            maxHeight: 400,
        },
    }),
);
