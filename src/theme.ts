import { createMuiTheme } from '@material-ui/core/styles';
import { mainColor, secondaryColor, white } from './colors';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Montserrat',
        h3: {
            fontSize: '21px',
            fontWeight: 700,
            lineHeight: '40px',
        },
        subtitle1: {
            fontSize: '12px',
            color: 'rgba(0, 0, 0, 0.54)',
        },
        body2: {
            fontSize: '15px',
            lineHeight: '21px',
        },
    },
    palette: {
        primary: {
            main: mainColor,
        },
        secondary: {
            main: secondaryColor,
            contrastText: white,
        },
    },
    overrides: {
        MuiExpansionPanel: {
            root: {
                '&:last-child': {
                    marginTop: 0,
                },
            },
        },
    },
});
