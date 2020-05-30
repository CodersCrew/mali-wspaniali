import { createMuiTheme } from '@material-ui/core/styles';
import { mainColor, secondaryColor, white } from './colors';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Montserrat',
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
});
