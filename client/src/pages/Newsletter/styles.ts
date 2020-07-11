import { createStyles, makeStyles } from '@material-ui/core';
import { Theme } from '../../theme';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalIcon: {
            color: theme.palette.primary.main,
            width: 24,
            height: 24,
            position: 'absolute',
            top: 25,
            left: 20,
        },
        modalContent: {
            padding: '29px 54px 0',
        },
        modalTextBold: {
            fontWeight: 'bold',
            marginBottom: theme.spacing(2),
        },
        modalButton: {
            fontFamily: 'Montserrat',
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.palette.info.main,
        },
        modalButtonWrapper: {
            paddingRight: 17,
        },
    }),
);
