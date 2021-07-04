import { useFormik } from 'formik';
import { makeStyles, createStyles, Grid, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useSelectOptions } from '../../../components/ChildForm/useSelectValues';
import { Child, Kindergarten } from '../../../graphql/types';
import { useBreakpoints } from '../../../queries/useBreakpoints';

import { Input } from '../../../components/ChildForm/Input';
import { Select } from '../../../components/ChildForm/Select';
import { ButtonSecondary } from '../../../components/Button';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { useEditChild } from '../../../operations/mutations/User/editChild';

interface ChildFormProps {
    kindergartens: Kindergarten[];
    handleSubmit: (value: {
        firstname: string;
        lastname: string;
        sex: string;
        'birth-date': string;
        'birth-quarter': string;
        kindergarten: string;
    }) => void;
    child: Child;
}

const validationSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    sex: yup.string().required(),
    'birth-date': yup.string().required(),
    'birth-quarter': yup.string().required(),
    kindergarten: yup.string().required(),
});

export function EditChildPanel({ handleSubmit, kindergartens, child }: ChildFormProps) {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useBreakpoints();
    const { editChild } = useEditChild();

    const initialValues = {
        id: child._id,
        firstname: child.firstname,
        lastname: child.lastname,
        sex: child.sex,
        'birth-date': child.birthYear.toString(),
        'birth-quarter': child.birthQuarter.toString(),
        kindergarten: child.kindergarten._id,
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    if (formik.values.id !== child._id) {
        formik.setValues(initialValues);
    }

    const { getOptions } = useSelectOptions();

    const kindergartenOptions = kindergartens.map(mapKindergartenToOption);

    return (
        <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
            <Grid container spacing={2} className={classes.container} direction="column">
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
                <ButtonSecondary
                    className={classes.saveButton}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={() =>
                        editChild({
                            childId: formik.values.id,
                            firstname: formik.values.firstname,
                            lastname: formik.values.lastname,
                            birthYear: Number(formik.values['birth-date']),
                            birthQuarter: Number(formik.values['birth-quarter']),
                            sex: formik.values.sex,
                            kindergartenId: formik.values.kindergarten,
                        })?.then((res) => openSnackbar({ text: t('child-profile.child-details.success-message') }))
                    }
                >
                    {t('child-profile.child-details.button')}
                </ButtonSecondary>
            </Grid>
        </form>
    );
}

function mapKindergartenToOption(kindergarten: Kindergarten) {
    return { value: kindergarten._id, label: `nr. ${kindergarten.number}, ${kindergarten.name}` };
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            marginTop: theme.spacing(3),
        },
        title: { marginBottom: theme.spacing(3) },
        description: { marginBottom: theme.spacing(2) },
        container: {
            maxWidth: 640,
        },
        item: {
            flex: 1,
        },
        saveButton: {
            alignSelf: 'flex-end',
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(1),
            margin: theme.spacing(0, 1, 2, 0),
        },
    }),
);
