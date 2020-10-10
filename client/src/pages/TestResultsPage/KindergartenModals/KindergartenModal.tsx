import React, { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { KindergartenFormValue } from '../types';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: (values: KindergartenFormValue) => void;
    initialData?: KindergartenFormValue;
    kindergartenId?: string;
    onDelete?: (id: string) => void;
}

export const KindergartenModal = ({ isOpen, setIsOpen, onSubmit, onDelete, initialData, kindergartenId }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const formik = useFormik({
        initialValues:
            initialData ||
            ({
                city: 'Wrocław',
                address: '',
                name: '',
            } as KindergartenFormValue),
        onSubmit: v => {
            onSubmit(v);
            setIsOpen(false);
        },
    });

    const isEditState = !!initialData;
    const translationPrefix = isEditState ? 'edit' : 'add';

    return (
        <TwoActionsModal
            lowerButtonOnClick={() => setIsOpen(false)}
            upperButtonOnClick={() => formik.submitForm()}
            lowerButtonText={t(`${translationPrefix}-kindergarten-modal.close`)}
            upperButtonText={t(`${translationPrefix}-kindergarten-modal.${translationPrefix}`)}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
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
                    <Grid item xs={12} sm={8}>
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
                    <Grid item xs={12} sm={4}>
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
                    <Grid item>
                        {isEditState && (
                            <ButtonSecondary
                                onClick={() => {
                                    if (onDelete) onDelete(kindergartenId!);

                                    setIsOpen(false);
                                }}
                                icon={<Delete />}
                                innerText={t('edit-kindergarten-modal.delete')}
                            />
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
