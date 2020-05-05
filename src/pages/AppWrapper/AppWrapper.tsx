import React, { FC, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider, createStyles, Theme } from '@material-ui/core';
import { Sidebar } from '../../components/Sidebar';
import { mainColor, backgroundColor } from '../../colors';

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.background}>
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className={classes.container}>{children}</div>
            </div>
        </ThemeProvider>
    );
};

const theme = createMuiTheme({
    typography: {
        fontFamily: ['"Montserrat"'].join(','),
    },
});

// eslint-disable-next-line no-shadow
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            display: 'flex',
            backgroundColor: mainColor,
            minHeight: '100vh',
            height: '100%',
            padding: '10px 10px 10px 10px',

            [theme.breakpoints.down('sm')]: {
                backgroundColor,
            },
        },
        container: {
            backgroundColor,
            minHeight: 'calc(100vh - 20px)',
            height: '100%',
            borderRadius: '10px',
            width: '100%',
        },
    }),
);
