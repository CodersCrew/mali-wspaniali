import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { mainColor, backgroundColor } from '../../colors';

export const AppWrapper: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.background}>
                <div className={classes.container}>{children}</div>
            </div>
        </ThemeProvider>
    );
};

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '"Montserrat"',
        ].join(','),
    },
});

const useStyles = makeStyles({
    background: {
        backgroundColor: mainColor,
        minHeight: '100vh',
        height: '100%',
        padding: '10px 10px 10px 100px',
    },
    container: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
    },

});
