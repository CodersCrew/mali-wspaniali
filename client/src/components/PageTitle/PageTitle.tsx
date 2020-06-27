import React from 'react';
import { useStyles } from './styles';

export const PageTitle: React.FC = ({ children }) => {
    const classes = useStyles();

    return <h1 className={classes.header}>{children}</h1>;
};
