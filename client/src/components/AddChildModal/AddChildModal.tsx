import React from 'react';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Modal from '@material-ui/core/Modal';
import * as yup from 'yup';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { selectValues } from './selectValues';
import { Input } from './Input';
import { Select } from './Select';
import { useStyles } from './useStyles';
import { Kindergarten } from '../../graphql/types';

const initialValues = {
    name: '',
    sex: '',
    'birth-date': '',
    'birth-quarter': '',
    city: selectValues.city[0].value,
    kindergarten: '',
};

interface Props {
    isOpen: boolean;
    kindergartens: Kindergarten[];
    handleSubmit: (data: {}) => void;
}

const validationSchema = yup.object({
    name: yup.string().required(),
    sex: yup.string().required(),
    'birth-date': yup.string().required(),
    'birth-quarter': yup.string().required(),
    city: yup.string().required(),
    kindergarten: yup.string().required(),
});

export const AddChildModal = ({ handleSubmit, isOpen, kindergartens }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useBreakpoints();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: data => handleSubmit(data),
    });

    return (
        <Modal open={isOpen}>
            <form onSubmit={formik.handleSubmit}>
                <div className={classes.modal}>
                    <h4>{t('add-child-modal.heading')}</h4>
                    <p>{t('add-child-modal.description')}</p>
                    <Input
                        value={formik.values.name}
                        name="name"
                        label={t('add-child-modal.inputs.name-surname')}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                        onChange={formik.handleChange}
                    />
                    <Select
                        label={t('add-child-modal.select-options.sex.label')}
                        value={formik.values.sex}
                        error={formik.errors.sex}
                        touched={formik.touched.sex}
                        name="sex"
                        className={classes.formControl}
                        onChange={formik.handleChange}
                    />
                    <Select
                        label={t('add-child-modal.select-options.birth-date.label')}
                        value={formik.values['birth-date']}
                        error={formik.errors['birth-date']}
                        touched={formik.touched['birth-date']}
                        name="birth-date"
                        className={device === 'DESKTOP' ? `${classes.halfSize} ${classes.left}` : classes.formControl}
                        onChange={formik.handleChange}
                    />
                    <Select
                        label={t('add-child-modal.select-options.birth-quarter.label')}
                        value={formik.values['birth-quarter']}
                        error={formik.errors['birth-quarter']}
                        touched={formik.touched['birth-quarter']}
                        name="birth-quarter"
                        className={device === 'DESKTOP' ? `${classes.halfSize} ${classes.right}` : classes.formControl}
                        onChange={formik.handleChange}
                    />
                    <Select
                        label={t('add-child-modal.select-options.city.label')}
                        value={formik.values.city}
                        error={formik.errors.city}
                        touched={formik.touched.city}
                        name="city"
                        className={classes.formControl}
                        onChange={formik.handleChange}
                        disabled
                    />
                    <Select
                        label={t('add-child-modal.select-options.kindergarten.label')}
                        value={formik.values.kindergarten}
                        error={formik.errors.kindergarten}
                        touched={formik.touched.kindergarten}
                        name="kindergarten"
                        className={classes.formControl}
                        onChange={formik.handleChange}
                    />
                    <Button color="primary" type="submit" className={classes.btn}>
                        {t('add-child-modal.button')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
