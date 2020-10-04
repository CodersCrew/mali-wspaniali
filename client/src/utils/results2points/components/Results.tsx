import React, { ChangeEvent, useState } from 'react';
import { createStyles, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '../../../theme';
import { ButtonPrimary } from '../../../components/Button';
import { determinePoints } from '../results2points';

interface Props {
    disciplines: string[];
    ages: number[];
}

export const Results = (props: Props) => {
    const classes = useStyles();
    const [discipline, setDiscipline] = useState('');
    const [sex, setSex] = useState('');
    const [year, setYear] = useState('');
    const [urban, setUrban] = useState('');
    const [result, setResult] = useState('');
    const [points, setPoints] = useState('');

    const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (event.target.name === 'discipline') setDiscipline(event.target.value as string);
        if (event.target.name === 'sex') setSex(event.target.value as string);
        if (event.target.name === 'year') setYear(event.target.value as string);
        if (event.target.name === 'urban-rural') setUrban(event.target.value as string);
        if (event.target.name === 'result') setResult(event.target.value as string);
        if (event.target.name === 'points') setPoints(event.target.value as string);
    };

    const handleClick = () => {
        setPoints('');
        const numberOfPoints = determinePoints({
            dyscyplina: discipline,
            plec: sex,
            rocznik: parseInt(year, 0),
            wynik: parseFloat(result),
            'miasto-wies': urban,
        });
        setPoints(numberOfPoints.toString());
    };

    return (
        <>
            <Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Discipline</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={discipline}
                        onChange={handleChange}
                        label="Discipline"
                        name="discipline"
                    >
                        {props.disciplines.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sex}
                        onChange={handleChange}
                        label="Sex"
                        name="sex"
                    >
                        <MenuItem value="K">Female</MenuItem>
                        <MenuItem value="M">Male</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        onChange={handleChange}
                        label="Year"
                        name="year"
                    >
                        {props.ages.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Urban or Rural</InputLabel>
                    <Select
                        value={discipline !== 'rzut' ? '' : urban}
                        onChange={handleChange}
                        label="Urban or Rural"
                        name="urban-rural"
                        disabled={discipline !== 'rzut'}
                    >
                        <MenuItem value="miasto">Urban</MenuItem>
                        <MenuItem value="wieś">Rural</MenuItem>
                    </Select>
                </FormControl>
            </Typography>
            <Typography className={classes.root}>
                <TextField
                    label="Result"
                    variant="outlined"
                    name="result"
                    type="number"
                    value={result}
                    onChange={handleChange}
                />
                <ButtonPrimary variant="contained" onClick={handleClick}>
                    Calculate
                </ButtonPrimary>
            </Typography>
            <Typography className={classes.root}>
                <TextField
                    type="text"
                    label="Points"
                    variant="outlined"
                    name="points"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={points}
                    error={parseFloat(points) === -1}
                />
            </Typography>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '10ch',
            },
        },
    }),
);
