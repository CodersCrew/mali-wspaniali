import React from 'react';
import { Tab, withStyles, WithStyles, createStyles } from '@material-ui/core';
import { whiteFont } from '../../colors';


type Styles = {
    color: string;
    [key: string]: any;
}

type ColorsMapping = {
    [key: string]: string;
}

interface TabStyles extends WithStyles<typeof styles> {
    color: string;
    label: string;
}

const styledBy = (property: string, mapping: ColorsMapping) => (props: Styles) =>
    mapping[props[property]];


const styles = createStyles({
    root: {
        minHeight: '0',
        height: '35px',
        backgroundColor: styledBy('color', {
            orange: '#ff7149',
            yellow: '#fed448',
            purple: '#c2559b',
            lightOrange: '#f5a56e',
            blue: '#4ca9df'
        }),
        borderRadius: '4px',
        opacity: '1',
        whiteSpace: 'nowrap',
        width: 'auto',
        color: whiteFont,
        textTransform: 'none',
    },
    wrapper: {
        margin: '0 10px'
    },
    selected: {
        height: '45px'
    }
});

export const StyledTab = withStyles(styles)((props: TabStyles) => <Tab disableRipple {...props} />);
