
import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export type ThemeObject = MuiThemeOptions;

export type Theme = MuiTheme & {};

export type BreakpointKey = Theme['breakpoints']['keys'][0];