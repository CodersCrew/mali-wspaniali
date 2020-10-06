import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '../../../theme';
import { ChildForm } from './ChildForm';

export interface Values {
    firstnameAndSurname: string;
    sex: string;
    yearOfBirth: number;
    quaterOfBirth: number;
    city: string;
    kindergarden: string;
}

export function ChildDetails() {
    const classes = useStyles();
    const values = {
        firstnameAndSurname: '',
        sex: '',
        yearOfBirth: 0,
        quaterOfBirth: 0,
        city: '',
        kindergarden: '',
    };
    return (
        <div className={classes.mainContainer}>
            <Typography variant="h4"> Edit your child's details if necessary</Typography>
            <Formik
                render={values => <ChildForm {...values} />}
                initialValues={values}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            ></Formik>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContainer: {
            background: theme.palette.background.paper,
            margin: theme.spacing(3),
            padding: theme.spacing(2),
            height: '576px',
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingTop: theme.spacing(3),
        },
    }),
);
