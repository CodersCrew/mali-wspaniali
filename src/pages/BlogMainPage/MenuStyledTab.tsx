import React from 'react';
import { Tab, withStyles, WithStyles, createStyles } from '@material-ui/core';
// import { white, blogCategoryColors } from '../../colors';

type Styles = {
    color: string;
    [key: string]: string;
};

type ColorsMap = {
    [key: string]: string;
};

interface TabStyles extends WithStyles<typeof styles> {
    color: string;
    label: string;
}

const styledBy = (property: string, colorsMap: ColorsMap) => (props: Styles) => colorsMap[props[property]];

const styles = createStyles({
    root: {
        minHeight: '0',
        height: '35px',
        border: styledBy('color', {
            orange: 'solid #f5a56e',
            yellow: 'solid  #f5a56e',
            purple: 'solid  #f5a56e',
            lightOrange: 'solid #f5a56e',
            blue: 'solid #f5a56e',
        }),
        borderRadius: '4px',
        opacity: '1',
        whiteSpace: 'nowrap',
        color: 'black',
        textTransform: 'none',
        flexShrink: 2,
        fontWeight: 600,
        marginRight: '20px',
        marginBottom: '20px',
        minWidth: 'fit-content'
    },
    wrapper: {
        margin: '0 10px',
    },
    selected: {
        height: '45px',
    },
});

export const MenuStyledTab = withStyles(styles)((props: TabStyles) => <Tab disableRipple {...props} />);