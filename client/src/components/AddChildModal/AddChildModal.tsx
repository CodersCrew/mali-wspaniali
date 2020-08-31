import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core'; //IconButton
import { createStyles } from '@material-ui/styles';
import { Theme } from '../../theme/types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
// import { Formik, Field, Form, useField, FieldAttributes, FieldArray } from 'formik';
import { useField, FieldAttributes, Formik } from 'formik';
// import { TextField, Button, Checkbox, Radio, FormControlLabel, Select, MenuItem } from '@material-ui/core';
// import { useTranslation } from 'react-i18next';
import { styled } from '@material-ui/core/styles';

interface Opt {
    info: string;
}
const Option = styled(MenuItem)({
    a: (props: Opt) => {
        return props.info;
    },
    '&::after': {
        content: (props: Opt) => `"${props.info}"`,
        color: 'gray',
        display: 'inline-block',
        marginLeft: '10px',
    },
});

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

const initialValues = {
    sex: '',
    birth_date: '',
    birth_quarter: '',
    city: selectValues.city[0]['value'],
    kindergarten: selectValues.kindergarten[0]['value'],
};

interface SelectProps {
    label: string;
    fullWidth?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select: React.FC<FieldAttributes<SelectProps>> = ({ onChange, label, value, fullWidth, className, ...props }) => {
    const { name } = props;
    const [field, meta] = useField<SelectProps>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField
            {...field}
            helperText={errorText}
            error={!!errorText}
            id="outlined-select-currency"
            select
            label={label}
            value={value}
            name={name}
            onChange={onChange}
            variant="outlined"
            fullWidth={fullWidth}
        >
            {selectValues[name].map((option: any) => {
                return option.helperLabel ? (
                    <Option key={option.value} value={option.value} info={option.helperLabel}>
                        {option.label}
                    </Option>
                ) : (
                    <MenuItem key={option.value} value={option.value} className={className}>
                        {option.label}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export const AddChildModal: React.FC = () => {
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [values, setValues] = useState(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value, name } = event.target;
        console.log(value, name, name === 'birth_quarter', values);
        setValues({ ...values, [name]: value });
    };

    useEffect(() => {
        setModalIsOpen(true);
    }, []);

    return modalIsOpen ? (
        <Formik
            validateOnChange={true}
            initialValues={initialValues}
            // validationSchema={validationSchema}
            // validate={values => {
            //   const errors: Record<string, string> = {};

            //   if (values.firstName.includes("bob")) {
            //     errors.firstName = "no bob";
            //   }

            //   return errors;
            // }}
            onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                // make async call
                console.log('submit: ', data);
                setSubmitting(false);
            }}
        >
            <Box className={classes.shadow} zIndex="modal">
                <div className={classes.modal}>
                    <h1>Witaj na stronie Mali Wspaniali</h1>
                    <p>Zanim przejdziesz do strony głównej wprowadź dane swojego dziecka.</p>
                    <TextField
                        id="outlined-helperText"
                        label="Imię i nazwisko dziecka"
                        defaultValue=""
                        fullWidth
                        variant="outlined"
                    />
                    <Select label="Płeć" value={values.sex} name="sex" onChange={handleChange} fullWidth />
                    <Select label="Rok urodzenia" value={values.birth_date} name="birth_date" onChange={handleChange} />
                    <Select
                        label="Kwartał urodzenia"
                        value={values.birth_quarter}
                        name="birth_quarter"
                        onChange={handleChange}
                        className={classes.withHelpers}
                    />
                    <Select label="Miasto" value={values.city} name="city" onChange={handleChange} fullWidth />
                    <Select
                        label="Przedszkole"
                        value={values.kindergarten}
                        name="kindergarten"
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button href="#text-buttons" color="primary">
                        Dodaj
                    </Button>
                </div>
            </Box>
        </Formik>
    ) : null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        withHelpers: {
            '&::after': {
                content: '"test"',
                // content: props.selectValues,
                display: 'inline-block',
                marginLeft: '10px',
            },
        },
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
        // modal: {
        //     position: 'absolute',
        //     width: 'calc(90% - 120px)', // w '../../pages/AppWrapper/AppWrapper' padding: '10px 60px'
        //     padding: '16px',
        //     // backgroundColor: theme.popups.info.light,
        //     background: 'white',
        //     display: 'flex',
        //     flexWrap: 'wrap',
        //     alignItems: 'flex-start',
        //     // letterSpacing: theme.typography.caption.letterSpacing,
        // },
        // modal_title: {
        //     margin: '12px 0',
        //     padding: '0px',
        //     fontSize: '16px',
        //     fontWeight: 500,
        //     fontFamil: 'montserrat',
        //     height: '22px',
        //     lineHeight: '22px',
        // },
        // modal_textWrapper: {
        //     padding: '0 12px',
        // },
        // modal_info: {
        //     fonrSize: '14px',
        // },
        // modal_icon_info: {
        //     width: '22px',
        //     height: '22px',
        //     margin: '12px 0',
        //     color: theme.popups.info.main,
        // },
        // modal_icon_close: {
        //     width: '22px',
        //     height: '22px',
        //     color: theme.popups.info.dark,
        // },
    }),
);
