import React from 'react';
import { TextField } from '@material-ui/core';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '../../../theme';
import { Values } from './ChildDetails';

export const ChildForm = (props: { values: Values }) => {
    const classes = useStyles();
    const {
        values: { firstnameAndSurname, sex, yearOfBirth, quaterOfBirth, city, kindergarden },
    } = props;

    return (
        <form
            className={classes.fieldsContainer}
            onSubmit={() => {
                alert('submitted');
            }}
        >
            <TextField
                id="firstnameAndSurname"
                name="firstnameAndSurname"
                label="firstname and surname"
                value={firstnameAndSurname}
                fullWidth
                variant="outlined"
            />
            <TextField id="sex" name="sex" label="sex" fullWidth value={sex} variant="outlined" />
            <TextField
                select
                id="yearOfBirth"
                name="yearOfBirth"
                label="year of birth"
                fullWidth
                value={yearOfBirth}
                variant="outlined"
            />
            <TextField
                select
                id="quaterOfBirth"
                name="quaterOfBirth"
                label="quater of birth"
                fullWidth
                value={quaterOfBirth}
                variant="outlined"
            />

            <TextField select id="city" name="city" label="city" fullWidth value={city} variant="outlined" />
            <TextField
                select
                id="kindergarden"
                name="kindergarden"
                label="kindergarden"
                fullWidth
                value={kindergarden}
                variant="outlined"
            />
            <ButtonSecondary className={classes.saveButton} type="submit">
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
            height: '476px',
            justifyContent: 'space-around',
        },
        saveButton: {
            alignSelf: 'flex-end',
        },
    }),
);
