import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { KindergartenFormValue } from '../types';
import { Kindergarten } from '../../../graphql/types';

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onAdd: (values: KindergartenFormValue) => void;
    onUpdate: (id: string, values: KindergartenFormValue) => void;
    initialData: KindergartenFormValue | null;
    kindergartenId: string | null;
    onDelete: (id: string) => void;
    setCurrentKindergarten: (value: Kindergarten | null) => void;
}

export const KindergartenModal = ({
    isOpen,
    setIsOpen,
    onAdd,
    onUpdate,
    onDelete,
    initialData,
    kindergartenId,
    setCurrentKindergarten,
}: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const isEditState = !!initialData;

    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const formik = useFormik({
        initialValues: initialData || {
            city: 'Wrocław',
            address: '',
            name: '',
            number: 0,
        },
        validationSchema: Yup.object({
            city: Yup.string().required(t('test-results.provide-city')),
            address: Yup.string().required(t('test-results.provide-address')),
            name: Yup.string().required(t('test-results.provide-name')),
            number: Yup.number()
                .min(1, t('test-results.number-min-max'))
                .max(1000, t('test-results.number-min-max'))
                .required(t('test-results.provide-number')),
        }),
        enableReinitialize: true,
        onSubmit: v => {
            if (isEditState && kindergartenId) {
                onUpdate(kindergartenId, v);
            } else {
                onAdd(v);
            }
            setIsOpen(false);
            setCurrentKindergarten(null);
        },
    });

    const translationPrefix = isEditState ? 'edit' : 'add';

    return (
        <TwoActionsModal
            lowerButtonOnClick={() => {
                setIsOpen(false);
                setCurrentKindergarten(null);
            }}
            upperButtonOnClick={() => formik.submitForm()}
            lowerButtonText={t(`${translationPrefix}-kindergarten-modal.close`)}
            upperButtonText={t(`${translationPrefix}-kindergarten-modal.${translationPrefix}`)}
            isOpen={isOpen}
            onClose={() => {
                setIsOpen(false);
                setCurrentKindergarten(null);
            }}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t(`${translationPrefix}-kindergarten-modal.title`)}
                </Typography>
                <Typography variant="body1" className={classes.description}>
                    {t(`${translationPrefix}-kindergarten-modal.description`)}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label={t('kindergarten-modal.city')}
                            variant="outlined"
                            fullWidth
                            {...formik.getFieldProps('city')}
                            error={formik.touched.city && !!formik.errors.city}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('kindergarten-modal.address')}
                            variant="outlined"
                            fullWidth
                            {...formik.getFieldProps('address')}
                            error={formik.touched.address && !!formik.errors.address}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('test-results.kindergarten-number')}
                            type="number"
                            variant="outlined"
                            fullWidth
                            required
                            {...formik.getFieldProps('number')}
                            error={formik.touched.number && !!formik.errors.number}
                            helperText={formik.touched.number && formik.errors.number}
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 1000,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={t('test-results.kindergarten-name')}
                            variant="outlined"
                            fullWidth
                            {...formik.getFieldProps('name')}
                            error={formik.touched.name && !!formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item>
                        {isEditState && kindergartenId && (
                            <>
                                <ButtonSecondary
                                    onClick={() => {
                                        setConfirmModalOpen(true);
                                    }}
                                    icon={<Delete />}
                                    innerText={t('edit-kindergarten-modal.delete')}
                                />
                                <TwoActionsModal
                                    lowerButtonOnClick={() => {
                                        setConfirmModalOpen(false);
                                    }}
                                    upperButtonOnClick={() => {
                                        onDelete(kindergartenId);
                                        setCurrentKindergarten(null);
                                        setIsOpen(false);
                                    }}
                                    lowerButtonText={t('test-results.cancel')}
                                    upperButtonText={t('test-results.delete')}
                                    isOpen={isConfirmModalOpen}
                                    onClose={() => {
                                        setConfirmModalOpen(false);
                                    }}
                                >
                                    <div className={classes.subModalContainer}>
                                        <Typography variant="h4" className={classes.title}>
                                            {t('test-results.kindergarten-deletion')}
                                        </Typography>
                                        <Typography variant="body1" className={classes.description}>
                                            {t('test-results.kindergarten-deletion-question')}{' '}
                                            {t('test-results.kindergarten-prefix')} {formik.values.number},{' '}
                                            {formik.values.name}, {formik.values.address}?
                                        </Typography>
                                    </div>
                                </TwoActionsModal>
                            </>
                        )}
                    </Grid>
                </Grid>
            </div>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 684,
        },
        subModalContainer: {
            maxWidth: 448,
        },
        title: {
            paddingBottom: theme.spacing(2),
        },
        description: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    }),
);
