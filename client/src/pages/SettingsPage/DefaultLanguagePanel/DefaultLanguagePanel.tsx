import React, { ChangeEvent, useState } from 'react';
import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import PlFlag from '../../../assets/pl.png';
import EnFlag from '../../../assets/en.png';

export const DefaultLanguagePanel = () => {
    const classes = useStyles();
    const [value, setValue] = useState('polish');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="languages" name="languages" value={value} onChange={handleChange}>
                <span>
                    <FormControlLabel value="polish" control={<Radio color={'primary'} />} label="Polski" />
                    <img className={classes.img} src={PlFlag} alt={'pl'} />
                </span>
                <span>
                    <FormControlLabel value="english" control={<Radio color={'primary'} />} label="English" />
                    <img className={classes.img} src={EnFlag} alt={'en'} />
                </span>
            </RadioGroup>
        </FormControl>
    );
};

const useStyles = makeStyles({
    img: {
        boxShadow: '0 0 2px 0px #000',
        verticalAlign: 'middle',
    },
});
