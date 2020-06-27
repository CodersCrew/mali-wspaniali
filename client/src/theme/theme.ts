import { ThemeObject } from './types';

export const theme: ThemeObject = {
    palette: {
        type: 'light',
        primary: {
            main: '#008AAD',
        },
        secondary: {
            main: '#ff3d00',
            dark: '#b22a00',
        },
        error: {
            main: '#f44336',
        },
        text: {
            primary: 'rgba(29, 29, 29, 1.0)',
        },
        background: {
            default: '#F1F2F4',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontWeight: 'bold',
            fontSize: '36px',
            lineHeight: '120%',
            textTransform: 'uppercase',
        },
        h2: {
            fontWeight: 'bold',
            fontSize: '21px',
            lineHeight: '140%',
            textTransform: 'uppercase',
        },
        h4: {},
        h6: {},
    },
};