import React from 'react';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '../../../theme';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';

export interface Values {
    firstnameAndSurname: string;
    sex: string;
    yearOfBirth: number;
    quaterOfBirth: number;
    city: string;
    kindergarden: string;
}

export const ChildForm = (props: { values: Values }) => {
    const classes = useStyles();
    const {
        values: { firstnameAndSurname, sex, yearOfBirth, quaterOfBirth, city, kindergarden },
    } = props;
    console.log(firstnameAndSurname);

    return (
        <form
            className={classes.fieldsContainer}
            onSubmit={() => {
                alert('submitted');
            }}
        >
            <TextField
                select
                id="firstnameAndSurname"
                name="firstnameAndSurname"
                label="firstnameAndSurname"
                fullWidth
                value={firstnameAndSurname}
                variant="outlined"
                size="medium"
            />
            <TextField id="sex" name="sex" label="sex" fullWidth value={sex} variant="outlined" size="medium" />
            <TextField
                select
                id="yearOfBirth"
                name="yearOfBirth"
                label="year of birth"
                fullWidth
                value={yearOfBirth}
                variant="outlined"
                size="medium"
            />

            <TextField
                select
                id="quaterOfBirth"
                name="quaterOfBirth"
                label="quater of birth"
                fullWidth
                value={quaterOfBirth}
                variant="outlined"
                size="medium"
            />

            <TextField
                select
                id="city"
                name="city"
                label="city"
                fullWidth
                value={city}
                variant="outlined"
                size="medium"
            />

            <TextField
                select
                variant="outlined"
                id="kindergarden"
                name="kindergarden"
                label="kindergarden"
                fullWidth
                value={kindergarden}
                size="medium"
            />
            <ButtonSecondary
                className={classes.saveButton}
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
            >
                Save
            </ButtonSecondary>
        </form>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fieldsContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '62vw',
            height: theme.spacing(60),
            justifyContent: 'space-around',
            paddingTop: theme.spacing(3),
        },
        saveButton: {
            alignSelf: 'flex-end',
        },
    }),
);
