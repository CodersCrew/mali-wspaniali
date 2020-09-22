import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Theme } from '../../theme/types';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            borderRadius: '4px',

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
                fontSize: theme.typography.h4.fontSize,
                lineHeight: theme.typography.h4.lineHeight,
                fontWeight: theme.typography.h4.fontWeight,
                letterSpacing: theme.typography.h4.letterSpacing,
                width: '100%',
            },
        },
        formControl: {
            margin: '8px 0',
            flexGrow: 1,
            minWidth: '100%',
        },
        halfSize: {
            flexGrow: 1,
            minWidth: '280px',
        },
        left: {
            marginRight: theme.spacing(1),
        },
        right: {
            marginLeft: theme.spacing(1),
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
