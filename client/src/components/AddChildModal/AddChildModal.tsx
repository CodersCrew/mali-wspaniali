import React, { useState, useEffect } from 'react';
import { makeStyles, InputLabel, FormControl } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Theme } from '../../theme/types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { FieldAttributes, Formik, Form, useField } from 'formik';
import { Select as SelectField } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '../../queries/useBreakpoints';
import Modal from '@material-ui/core/Modal';

interface OptionProps {
    info: string;
    label: string;
}

function OptionField(props: OptionProps) {
    const classes = useStyles();
    return (
        <>
            <span>{props.label}</span>
            <span className={classes.helperLabel}>{props.info}</span>
        </>
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
    'birth-date': [
        ...Array.apply(null, new Array(20)).map((x, i) => ({
            value: new Date().getFullYear() - i,
            label: new Date().getFullYear() - i,
        })),
    ],
    'birth-quarter': [
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

const initialValues = {
    name: '',
    sex: '',
    'birth-date': '',
    'birth-quarter': '',
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
                        <MenuItem value={label} key={label}>
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
    const device = useBreakpoints();

    useEffect(() => {
        setModalIsOpen(true);
    }, []);

    return modalIsOpen ? (
        <Modal open={true}>
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
                        <div className={classes.modal}>
                            <h4>{t(`add-child-modal.heading`)}</h4>
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
                                value={values['birth-date']}
                                name="birth-date"
                                className={device === 'DESKTOP' ? classes.half_size_l : classes.formControl}
                            />
                            <Select
                                label={t(`add-child-modal.select-options.birth-quarter.label`)}
                                value={values['birth-quarter']}
                                name="birth-quarter"
                                className={device === 'DESKTOP' ? classes.half_size_r : classes.formControl}
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
                            <Button color="primary" type="submit" disabled={isSubmitting} className={classes.btn}>
                                {t(`add-child-modal.button`)}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    ) : null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        shadow: {
            background: theme.palette.action.active,
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
            padding: '0 24px',
            background: theme.palette.info.contrastText,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            justifyContent: 'flex-end',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            '& .MuiTextField-root': {
                margin: '8px 0',
                minWidth: '270px',
                flexGrow: 1,
            },

            '& p': {
                width: '100%',
                marginTop: '8px',
                color: theme.palette.text.secondary,
            },

            '& h4': {
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.h4.fontSize,
                lineHeight: theme.typography.h4.lineHeight,
                fontWeight: theme.typography.subtitle2.fontWeight, //na layoucie jest 500, więc musiałem dobrać coś podobnego
                letterSpacing: theme.typography.h4.letterSpacing,
                width: '100%',
            },
        },
        formControl: {
            margin: '8px 0',
            flexGrow: 1,
            minWidth: '100%',
        },
        half_size_l: {
            marginRight: theme.spacing(1),
            flexGrow: 1,
            minWidth: '280px',
        },
        half_size_r: {
            marginLeft: theme.spacing(1),
            flexGrow: 1,
            minWidth: '280px',
        },
        btn: {
            marginBottom: theme.spacing(1),
        },
        helperLabel: {
            color: theme.palette.grey['400'],
            marginLeft: theme.spacing(1),
        },
    }),
);
