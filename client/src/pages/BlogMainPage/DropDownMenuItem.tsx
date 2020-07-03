import React from 'react';
import { Tab, withStyles, WithStyles, createStyles } from '@material-ui/core';
import { blogCategoryColors } from '../../colors';

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
        height: '45px',
        border: styledBy('color', {
            orange: `solid 1px ${blogCategoryColors.orange}`,
            yellow: `solid 1px ${blogCategoryColors.yellow}`,
            purple: `solid 1px ${blogCategoryColors.purple}`,
            lightOrange: `solid 1px ${blogCategoryColors.lightOrange}`,
            blue: `solid 1px ${blogCategoryColors.blue}`,
        }),
        borderRadius: '4px',
        opacity: '1',
        whiteSpace: 'nowrap',
        color: styledBy('color', {
            orange: blogCategoryColors.orange,
            yellow: blogCategoryColors.yellow,
            purple: blogCategoryColors.purple,
            lightOrange: blogCategoryColors.lightOrange,
            blue: blogCategoryColors.blue,
        }),
        textTransform: 'none',
        flexShrink: 2,
        fontWeight: 600,
        marginRight: '20px',
        marginBottom: '20px',
        minWidth: 'fit-content',
    },
    wrapper: {
        margin: '0 10px',
    },
    selected: {
        height: '45px',
    },
});

export const DropDownMenuItem = withStyles(styles)((props: TabStyles) => <Tab disableRipple {...props} />);
