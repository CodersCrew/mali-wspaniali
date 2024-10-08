import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField, Grid, makeStyles, createStyles, Typography, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Kindergarten, AddKindergartenInput } from '../../../graphql/types';

interface Props {
    onClose: () => void;
    onSubmit: (values: AddKindergartenInput) => void;
    onDelete: (kindergarten: Kindergarten) => void;
    kindergarten: Kindergarten | null;
}

export const KindergartenModal = ({ onClose, onSubmit, onDelete, kindergarten }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            city: kindergarten?.city || 'Wrocław',
            address: kindergarten?.address || '',
            name: kindergarten?.name || '',
            number: kindergarten?.number || 0,
        },
        validationSchema: Yup.object({
            city: Yup.string().required(t('kindergarten-modal.provide-city')),
            address: Yup.string().required(t('kindergarten-modal.provide-address')),
            name: Yup.string().required(t('kindergarten-modal.provide-name')),
            number: Yup.number()
                .min(1, t('kindergarten-modal.number-min-max'))
                .max(1000, t('kindergarten-modal.number-min-max'))
                .required(t('kindergarten-modal.provide-number')),
        }),
        enableReinitialize: true,
        onSubmit,
    });

    const translationPrefix = kindergarten ? 'edit' : 'add';

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={formik.submitForm}
            lowerButtonText={t(`${translationPrefix}-kindergarten-modal.close`)}
            upperButtonText={t(`${translationPrefix}-kindergarten-modal.${translationPrefix}`)}
            isOpen
            onClose={onClose}
        >
            <Typography variant="h4" className={classes.title}>
                {t(`${translationPrefix}-kindergarten-modal.title`)}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {t(`${translationPrefix}-kindergarten-modal.description`)}
            </Typography>
            <Grid container spacing={2}>
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
                        label={t('kindergarten-modal.city')}
                        variant="outlined"
                        fullWidth
                        {...formik.getFieldProps('city')}
                        error={formik.touched.city && !!formik.errors.city}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid>
                <Grid item>
                    {kindergarten && (
                        <ButtonSecondary
                            onClick={() => {
                                onDelete(kindergarten);
                                onClose();
                            }}
                            icon={<Delete />}
                            innerText={t('edit-kindergarten-modal.delete')}
                        />
                    )}
                </Grid>
            </Grid>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
