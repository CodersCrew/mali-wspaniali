import React from 'react';
import { Tab, withStyles, WithStyles, createStyles } from '@material-ui/core';
import { white, blogCategoryColors } from '../../colors';

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
        backgroundColor: styledBy('color', {
            orange: blogCategoryColors.orange,
            yellow: blogCategoryColors.yellow,
            purple: blogCategoryColors.purple,
            lightOrange: blogCategoryColors.lightOrange,
            blue: blogCategoryColors.blue,
        }),
        borderRadius: '4px',
        opacity: '1',
        whiteSpace: 'nowrap',
        color: white,
        textTransform: 'none',
        flexShrink: 2,
        fontWeight: 600,
    },
    wrapper: {
        margin: '0 10px',
    },
    selected: {
        height: '45px',
    },
});

export const StyledTab = withStyles(styles)((props: TabStyles) => <Tab disableRipple {...props} />);
