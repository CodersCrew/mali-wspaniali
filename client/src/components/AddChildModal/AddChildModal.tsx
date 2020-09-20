import React, { useState, useEffect, FC } from 'react';

import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';

import { useTranslation } from 'react-i18next';
import Modal from '@material-ui/core/Modal';
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
    kindergarten: selectValues.kindergarten[0].value,
};

export const AddChildModal: FC<{ handleSubmit: (data: {}) => void }> = ({ handleSubmit }) => {
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { t } = useTranslation();
    const device = useBreakpoints();

    useEffect(() => {
        setModalIsOpen(true);
    }, []);

    return modalIsOpen ? (
        <Modal open={true}>
            <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validate={(values: { [index: string]: string }) => {
                    const errors: Record<string, string> = {};

                    if (values.name === '') {
                        errors.name = t('add-child-modal.errors.e1');
                    } else if (values.name.split(' ').length !== 2) {
                        errors.name = t('add-child-modal.errors.e2');
                    }
                    const selects: string[] = Object.keys(values).filter(
                        value => value !== 'name' && value !== 'city' && value !== 'kindergarten',
                    );
                    selects.forEach((name: string) => {
                        if (values[name] === '') {
                            errors[name] = t('add-child-modal.errors.e1');
                        }
                    });

                    return errors;
                }}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    handleSubmit(data);
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className={classes.modal}>
                            <h4>{t('add-child-modal.heading')}</h4>
                            <p>{t('add-child-modal.paragraf')}</p>
                            <Input value={values.name} name="name" label={t('add-child-modal.inputs.name_surname')} />
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
                                className={device === 'DESKTOP' ? classes.halfSizeL : classes.formControl}
                            />
                            <Select
                                label={t('add-child-modal.select-options.birth-quarter.label')}
                                value={values['birth-quarter']}
                                name="birth-quarter"
                                className={device === 'DESKTOP' ? classes.halfSizeR : classes.formControl}
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
                                disabled
                            />
                            <Button color="primary" type="submit" disabled={isSubmitting} className={classes.btn}>
                                {t('add-child-modal.button')}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    ) : null;
};
