import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            fontSize: 36,
            margin: 0,
            textTransform: 'uppercase',
            lineHeight: '44px',

            [theme.breakpoints.down('sm')]: {
                fontSize: 21,
                lineHeight: '26px',
            },
        },
    }),
);
