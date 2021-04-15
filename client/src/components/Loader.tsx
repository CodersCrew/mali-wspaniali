import { makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import { white } from '../colors';

export const Loader = () => {
    const classes = useStyles();

    return (
        <Backdrop classes={{ root: classes.root }} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

const useStyles = makeStyles({
    root: {
        zIndex: 1000,
        color: white,
    },
});
