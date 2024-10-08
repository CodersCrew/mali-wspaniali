import { FC, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';

export const Clickable: FC = ({ children }: { children?: ReactNode }) => {
    const classes = useStyles();

    return <span className={classes.container}>{children}</span>;
};

const useStyles = makeStyles({
    container: {
        cursor: 'pointer',
    },
});
