import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Theme } from '../../theme/types';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        shadow: {
            background: theme.palette.action.active,
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
        },
        modal: {
            overflow: 'scroll',
            position: 'absolute',
            minWidth: '300px',
            maxHeight: '80vh',
            padding: '0 24px',
            background: theme.palette.info.contrastText,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            justifyContent: 'flex-end',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            '& .MuiTextField-root': {
                margin: '8px 0',
                minWidth: '270px',
                flexGrow: 1,
            },

            '& p': {
                width: '100%',
                marginTop: '8px',
                color: theme.palette.text.secondary,
            },

            '& h4': {
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.h4.fontSize,
                lineHeight: theme.typography.h4.lineHeight,
                fontWeight: theme.typography.h4.fontWeight, // subtitle2
                letterSpacing: theme.typography.h4.letterSpacing,
                width: '100%',
            },
        },
        formControl: {
            margin: '8px 0',
            flexGrow: 1,
            minWidth: '100%',
        },
        halfSizeL: {
            marginRight: theme.spacing(1),
            flexGrow: 1,
            minWidth: '280px',
        },
        halfSizeR: {
            marginLeft: theme.spacing(1),
            flexGrow: 1,
            minWidth: '280px',
        },
        btn: {
            marginBottom: theme.spacing(1),
        },
        helperLabel: {
            color: theme.palette.grey['400'],
            marginLeft: theme.spacing(1),
        },
    }),
);
