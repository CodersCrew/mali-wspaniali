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
        },
    },
    overrides: {
        MuiTabs: {
            root: {
                '& button': {
                    border: `1px solid ${secondaryColor}`,
                    color: secondaryColor,
                    textTransform: 'unset',
                    fontWeight: 700,
                    borderRadius: '10px 10px 0 0',
                    height: '34px',
                    minHeight: 'unset',
                    paddingTop: '4px',
                    opacity: 1,

                    '& .MuiTouchRipple-root': {
                        display: 'none',
                    },

                    '&:not(:last-child)': {
                        borderRight: 0,
                    },
                },

                '& .Mui-selected': {
                    color: white,
                    backgroundColor: secondaryColor,
                },
            },
            indicator: {
                display: 'none',
            },
        },
    },
});
