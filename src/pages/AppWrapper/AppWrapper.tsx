import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Sidebar } from '../../components/Sidebar';
import { mainColor, backgroundColor } from '../../colors';

const isMobile = window.screen.width < 960;

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => setOpenSidebar(!openSidebar);

    return (
        <div className={classes.background}>
            {isMobile ? null : <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />}
            <div className={classes.container}>{children}</div>
        </div>
    );
};

const useStyles = makeStyles({
    background: {
        display: 'flex',
        backgroundColor: mainColor,
        minHeight: '100vh',
        height: '100%',
        padding: '10px',
    },
    container: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        width: '100%',
        overflowX: 'hidden',
    },
});
