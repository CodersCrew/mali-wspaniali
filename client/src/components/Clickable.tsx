import { makeStyles } from '@material-ui/core';

export const Clickable: React.FC = ({ children }: { children?: React.ReactNode }) => {
    const classes = useStyles();

    return <span className={classes.container}>{children}</span>;
};

const useStyles = makeStyles({
    container: {
        cursor: 'pointer',
    },
});
