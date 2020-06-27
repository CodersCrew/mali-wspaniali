import React, { FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Sidebar } from '../../components/Menu/Sidebar';
import { Navbar } from '../../components/Menu/Navbar';
import { mainColor, backgroundColor } from '../../colors';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { Theme } from '../../theme/types';

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <ThemeProvider>
            <div className={classes.background}>
                <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className={clsx(classes.container, isSidebarOpen ? 'opened' : null)}>
                    <Navbar />
                    <div className={classes.content}>{children}</div>
                </div>
            </div>
        </ThemeProvider>
    );
};

// eslint-disable-next-line no-shadow
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            display: 'flex',
            backgroundColor: mainColor,
            minHeight: '100vh',
            height: '100%',
            padding: '10px',

            [theme.breakpoints.down('sm')]: {
                backgroundColor,
                padding: 0,
            },
        },
        container: {
            backgroundColor,
            width: 'calc(100% - 107px)',
            minHeight: 'calc(100vh - 20px)',
            height: '100%',
            marginLeft: '107px',
            borderRadius: '10px',
            transition: 'all 0.4s',
            '&.opened': {
                marginLeft: '240px',
                width: 'calc(100% - 240px)',
                transition: 'all 0.5s',
            },
            [theme.breakpoints.down('sm')]: {
                margin: 0,
                width: '100%',
            },
        },
        content: {
            marginTop: '-40px',
            padding: '10px 60px',
            [theme.breakpoints.down('sm')]: {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '80px',
                padding: '10px',
            },
        },
    }),
);
