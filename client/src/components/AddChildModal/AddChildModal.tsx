import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';

import { useTranslation } from 'react-i18next';
import Modal from '@material-ui/core/Modal';
import * as yup from 'yup';
import { useBreakpoints } from '../../queries/useBreakpoints';
import { selectValues } from './selectValues';
import { Input } from './Input';
import { Select } from './Select';
import { useStyles } from './useStyles';

const initialValues = {
    name: '',
    sex: '',
    'birth-date': '',
    'birth-quarter': '',
    city: selectValues.city[0].value,
    kindergarten: '',
};

const validationSchema = yup.object({
    name: yup.string().required(),
    sex: yup.string().required(),
    'birth-date': yup.string().required(),
    'birth-quarter': yup.string().required(),
    city: yup.string().required(),
    kindergarten: yup.string().required(),
});

interface Props {
    handleSubmit: (data: {}) => void;
}

export const AddChildModal = ({ handleSubmit }: Props) => {
    const classes = useStyles();
    const [isOpen] = useState(true);
    const { t } = useTranslation();
    const device = useBreakpoints();

    return (
        <Modal open={isOpen}>
            <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={data => handleSubmit(data)}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className={classes.modal}>
                            <h4>{t('add-child-modal.heading')}</h4>
                            <p>{t('add-child-modal.description')}</p>
                            <Input value={values.name} name="name" label={t('add-child-modal.inputs.name-surname')} />
                            <Select
                                label={t('add-child-modal.select-options.sex.label')}
                                value={values.sex}
                                name="sex"
                                className={classes.formControl}
                            />
                            <Select
                                label={t('add-child-modal.select-options.birth-date.label')}
                                value={values['birth-date']}
                                name="birth-date"
                                className={
                                    device === 'DESKTOP' ? `${classes.halfSize} ${classes.left}` : classes.formControl
                                }
                            />
                            <Select
                                label={t('add-child-modal.select-options.birth-quarter.label')}
                                value={values['birth-quarter']}
                                name="birth-quarter"
                                className={
                                    device === 'DESKTOP' ? `${classes.halfSize} ${classes.right}` : classes.formControl
                                }
                            />
                            <Select
                                label={t('add-child-modal.select-options.city.label')}
                                value={values.city}
                                name="city"
                                className={classes.formControl}
                                disabled
                            />
                            <Select
                                label={t('add-child-modal.select-options.kindergarten.label')}
                                value={values.kindergarten}
                                name="kindergarten"
                                className={classes.formControl}
                            />
                            <Button color="primary" type="submit" disabled={isSubmitting} className={classes.btn}>
                                {t('add-child-modal.button')}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
