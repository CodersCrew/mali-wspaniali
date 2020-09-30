import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '../../../theme';

interface Values {
    firstnameAndSurname: string;
    sex: string;
    yearOfBirth: number;
    quaterOfBirth: number;
    city: string;
    preSchool: string;
}

export function ChildDetails() {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h4"> Edit your child's details if necessary</Typography>
            <Formik
                initialValues={{
                    firstnameAndSurname: '',
                    sex: '',
                    yearOfBirth: 0,
                    quaterOfBirth: 0,
                    city: '',
                    preSchool: '',
                }}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form className={classes.formContainer}>
                    <Grid
                        className={classes.fieldsContainer}
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <label htmlFor="firstName and Surname">First Name and Surname</label>
                        <Field id="firstNameAndSurname" name="firstNameAndSurname" />

                        <label htmlFor="Sex">Sex</label>
                        <Field as="select" id="Sex" name="Sex">
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </Field>

                        <label htmlFor="yearOfBirth">Year of birth</label>
                        <Field as="select" id="yearOfBirth" name="yearOfBirth" />

                        <label htmlFor="quaterOfBirth">Quater of birth</label>
                        <Field as="select" id="quaterOfBirth" name="quaterOfBirth" />

                        <label htmlFor="city">City</label>
                        <Field as="select" id="city" name="city" />

                        <label htmlFor="preSchool">Pre School</label>
                        <Field as="select" id="preSchool" name="preSchool" />
                    </Grid>

                    <button type="submit">Save</button>
                </Form>
            </Formik>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingTop: theme.spacing(1),
        },
        fieldsContainer: {
            margin: '0px 8px 8px',
        },
    }),
);
