import React from 'react';
import { FormControlLabel, makeStyles, Radio } from '@material-ui/core';

export interface LanguageRadioButtonProps {
    value: string;
    label: string;
    alt: string;
    src: string;
}

export const LanguageRadioButton = (props: LanguageRadioButtonProps) => {
    const classes = useStyles();

    return (
        <span>
            <FormControlLabel value={props.value} control={<Radio color={'primary'} />} label={props.label} />
            <img className={classes.img} src={props.src} alt={props.alt} />
        </span>
    );
};

const useStyles = makeStyles({
    img: {
        boxShadow: '0 0 2px 0px #000',
        verticalAlign: 'middle',
    },
});
