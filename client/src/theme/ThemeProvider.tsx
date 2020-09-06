import React, { FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import { enUS, Localization, plPL } from '@material-ui/core/locale';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeObject } from './types';
import { theme } from './theme';

type Language = 'en' | 'pl';

const languages: Record<Language, Localization> = { pl: plPL, en: enUS };

type ThemeProviderProps = {
    language: Language;
    theme: ThemeObject;
};

export const PureThemeProvider: FC<ThemeProviderProps> = ({ children, language }) => {
    const languageObject = languages[language];
    const muiTheme = createMuiTheme(theme, languageObject);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export const ThemeProvider: FC = ({ children }) => {
    return (
        <PureThemeProvider language="pl" theme={theme}>
            {children}
        </PureThemeProvider>
    );
};

declare module '@material-ui/core/styles/createPalette' {
    interface PaletteOptions {
        cookies_modal?: PaletteColorOptions;
    }

    interface Palette {
        cookies_modal: PaletteColor;
    }
}
