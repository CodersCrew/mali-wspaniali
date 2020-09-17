import { ThemeObject } from './types';

export const theme: ThemeObject = {
    palette: {
        type: 'light',
        primary: {
            main: '#00ACC1',
            light: '#33BCCD',
            dark: '#007887',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FF3D00',
            light: '#FF6333',
            dark: '#B22A00',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#F44336',
            light: '#E57373',
            dark: '#D32F2F',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FF9800',
            light: '#FFB74D',
            dark: '#F57C00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
            main: '#2196F3',
            light: '#64B5F6',
            dark: '#1976d2',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        grey: {
            300: '#e0e0e0',
            400: '#bdbdbd',
        },
        text: {
            primary: 'rgba(29, 29, 29, 1.0)',
            secondary: 'rgba(0, 0, 0, 0.54)',
        },
        action: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            focus: 'rgba(0, 0, 0, 0.12)',
        },
        cookiesModal: {
            main: '#255071',
            light: '#FFF',
            dark: '#0D3C61',
            contrastText: '#0D3C61',
        },
        background: {
            default: '#F1F2F4',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontSize: '48px',
            lineHeight: '59px',
            fontWeight: 300,
        },
        h2: {
            fontSize: '34px',
            lineHeight: '41px',
            fontWeight: 300,
            letterSpacing: '0.25px',
        },
        h3: {
            fontSize: '24px',
            lineHeight: '29px',
            fontWeight: 400,
        },
        h4: {
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: 400,
            letterSpacing: '0.15px',
        },
        subtitle1: {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 400,
            letterSpacing: '0.15px',
        },
        subtitle2: {
            fontSize: '14px',
            lineHeight: '17px',
            fontWeight: 500,
            letterSpacing: '0.1px',
        },
        body1: {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 400,
            letterSpacing: '0.5px',
        },
        body2: {
            fontSize: '14px',
            lineHeight: '17px',
            fontWeight: 400,
            letterSpacing: '0.25px',
        },
        button: {
            fontSize: '14px',
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '1.25px',
            textTransform: 'uppercase',
        },
        caption: {
            fontSize: '12px',
            lineHeight: '15px',
            fontWeight: 400,
            letterSpacing: '0.4px',
        },
        overline: {
            fontSize: '10px',
            lineHeight: '12px',
            fontWeight: 400,
            letterSpacing: '1.5px',
        },
    },
    zIndex: {
        appBar: 1500,
    },
};
