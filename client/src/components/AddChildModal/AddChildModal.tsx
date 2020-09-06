import React, { useState, useEffect } from 'react';
import { makeStyles, InputLabel, FormControl } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Theme } from '../../theme/types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { FieldAttributes, Formik, Form, useField } from 'formik';
import { Select as SelectField } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';

interface OptionProps {
    info: string;
    label: string;
}

function OptionField(props: OptionProps) {
    return (
        <span>
            {props.label}
            {props.info}
        </span>
    );
}

const selectValues: { [index: string]: any } = {
    sex: [
        {
            value: 'mężczyzna',
            label: 'mężczyzna',
        },
        {
            value: 'kobieta',
            label: 'kobieta',
        },
    ],
    birth_date: [
        ...Array.apply(null, new Array(20)).map((x, i) => ({
            value: new Date().getFullYear() - i,
            label: new Date().getFullYear() - i,
        })),
    ],
    birth_quarter: [
        {
            value: 'pierwsza',
            label: 'I',
            helperLabel: '(styczen-marzec)',
        },
        {
            value: 'druga',
            label: 'II',
            helperLabel: '(kwiecień-czerwiec)',
        },
        {
            value: 'trzecia',
            label: 'III',
            helperLabel: '(lipiec-wrzesień)',
        },
        {
            value: 'czwarta',
            label: 'IV',
            helperLabel: '(październik-grudzień)',
        },
    ],
    city: [
        {
            value: 'Wrocław',
            label: 'Wrocław',
        },
    ],
    kindergarten: [
        {
            value: 'Krasnoludki',
            label: 'Krasnoludki',
        },
    ],
};
// addChildTranslations:{

// }

const initialValues = {
    name: '',
    sex: '',
    birth_date: '',
    birth_quarter: '',
    city: selectValues.city[0]['value'],
    kindergarten: selectValues.kindergarten[0]['value'],
};

interface SelectProps {
    label: string;
    fullWidth?: boolean;
    // onChange: (event: React.ChangeEvent<{ value: unknown; name?: string }>) => void;
}

const Select: React.FC<FieldAttributes<SelectProps>> = ({ label, value, fullWidth, className, disabled, ...props }) => {
    const { name } = props;
    const { t } = useTranslation();
    const [field, meta] = useField<SelectProps>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <FormControl variant="outlined" className={className}>
            <InputLabel htmlFor={name} {...field} error={!!errorText}>
                {label}
            </InputLabel>
            <SelectField
                {...field}
                error={!!errorText}
                id="outlined-select-currency"
                label={label}
                value={value}
                name={name}
                renderValue={() => value}
                labelId={name}
                disabled={!!disabled}
            >
                {selectValues[name].map((option: any, i: number) => {
                    const path = `add-child-modal.select-options.${name}.l${i + 1}`;
                    const label = t(path) !== path ? t(path) : option.label;
                    const hpath = `add-child-modal.select-options.${name}.hl${i + 1}`;
                    const helperLabel = t(hpath) !== hpath ? t(hpath) : option.helperLabel;

                    return (
                        <MenuItem value={option.label} key={label}>
                            <OptionField info={helperLabel} label={label} />
                        </MenuItem>
                    );
                })}
            </SelectField>
            <FormHelperText {...field} error={!!errorText}>
                {errorText}
            </FormHelperText>
        </FormControl>
    );
};

interface InputProps {
    label: string;
}

const Input: React.FC<FieldAttributes<InputProps>> = ({ label, ...props }) => {
    const { name } = props;
    const [field, meta] = useField<InputProps>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField
            {...field}
            error={!!errorText}
            helperText={errorText}
            name={name}
            label={label}
            id="outlined-helperText"
            variant="outlined"
            fullWidth
        />
    );
};

export const AddChildModal: React.FC<{ handleSubmit: (data: {}) => void }> = ({ handleSubmit }) => {
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setModalIsOpen(true);
    }, []);

    return modalIsOpen ? (
        <Formik
            validateOnChange={true}
            initialValues={initialValues}
            validate={(values: { [index: string]: any }) => {
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
                console.log('submit: ', data);
                handleSubmit(data);
                setSubmitting(false);
            }}
        >
            {({ values, isSubmitting }) => (
                <Form>
                    <Box className={classes.shadow} zIndex="modal">
                        <div className={classes.modal}>
                            <h1>{t(`add-child-modal.heading`)}</h1>
                            <p>{t(`add-child-modal.paragraf`)}</p>
                            <Input value={values.name} name="name" label={t(`add-child-modal.inputs.name_surname`)} />
                            <Select
                                label={t(`add-child-modal.select-options.sex.label`)}
                                value={values.sex}
                                name="sex"
                                fullWidth
                                className={classes.formControl}
                            />
                            <Select
                                label={t(`add-child-modal.select-options.birth-date.label`)}
                                value={values.birth_date}
                                name="birth_date"
                                className={classes.half_size}
                            />
                            <Select
                                label={t(`add-child-modal.select-options.birth-quarter.label`)}
                                value={values.birth_quarter}
                                name="birth_quarter"
                                className={classes.half_size}
                            />
                            <Select
                                label={t(`add-child-modal.select-options.city.label`)}
                                value={values.city}
                                name="city"
                                className={classes.formControl}
                                disabled
                            />
                            <Select
                                label={t(`add-child-modal.select-options.kindergarten.label`)}
                                value={values.kindergarten}
                                name="kindergarten"
                                className={classes.formControl}
                                disabled
                            />
                            <Button color="primary" type="submit" disabled={isSubmitting}>
                                {t(`add-child-modal.button`)}
                            </Button>
                        </div>
                    </Box>
                </Form>
            )}
        </Formik>
    ) : null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        shadow: {
            background: 'rgba(1,1,1,0.5)',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
        },
        modal: {
            overflow: 'scroll',
            position: 'absolute',
            minWidth: '300px',
            maxHeight: '80vh',
            padding: '16px',
            // backgroundColor: theme.popups.info.light,
            background: 'white',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            justifyContent: 'flex-end',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            '& > *': {
                margin: '10px',
            },

            '& .MuiTextField-root': {
                margin: '10px',
                minWidth: '270px',
                flexGrow: 1,
            },

            '& p': {
                width: '100%',
            },

            '& h1': {
                width: '100%',
                marginBottom: '20px',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            flexGrow: 1,
            minWidth: '90%',
        },
        half_size: {
            margin: theme.spacing(1),
            flexGrow: 1,
            minWidth: '280px',
        },
    }),
);
