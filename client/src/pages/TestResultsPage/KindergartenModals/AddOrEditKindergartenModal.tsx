import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Grid, makeStyles, createStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';

interface FormValue {
    number: number;
    name: string;
    address: string;
    city: string;
}

interface Props {
    initialData?: FormValue;
    onSubmit: (values: FormValue) => void;
}

export function AddOrEditKindergartenModal({ onSubmit, initialData }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const classes = useStyles();
    const formik = useFormik({
        initialValues:
            initialData ||
            ({
                city: 'Wrocław',
                address: '',
                name: '',
            } as FormValue),
        onSubmit: v => {
            onSubmit(v);
            setIsOpen(false);
        },
    });

    const translationPrefix = initialData ? 'edit' : 'add';

    return (
        <>
            <ButtonSecondary variant="contained" onClick={() => setIsOpen(true)}>
                {translationPrefix} kindergarten
            </ButtonSecondary>
            <TwoActionsModal
                lowerButtonOnClick={() => setIsOpen(false)}
                upperButtonOnClick={() => formik.submitForm()}
                lowerButtonText={t(`${translationPrefix}-kindergarten-modal.close`)}
                upperButtonText={t(`${translationPrefix}-kindergarten-modal.${translationPrefix}`)}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <div className={classes.container}>
                    <Typography variant="h2" align="center">
                        {t(`${translationPrefix}-kindergarten-modal.title`)}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="city"
                                label={t('kindergarten-modal.city')}
                                variant="outlined"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                label={t('kindergarten-modal.address')}
                                variant="outlined"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                label={t('kindergarten-modal.name')}
                                variant="outlined"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="number"
                                label={t('kindergarten-modal.number')}
                                type="number"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.number}
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                        max: 1000,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </TwoActionsModal>
        </>
    );
}

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            maxWidth: 450,
        },
    }),
);
