import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Sidebar } from '../../components/Sidebar';
import { mainColor, backgroundColor } from '../../colors';

export const AppWrapper: React.FC = ({ children }) => {
    const classes = useStyles();
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => setOpenSidebar(!openSidebar);

    return (
        <div className={classes.background}>
            <div>
                <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
            </div>
            <div className={openSidebar ? classes.containerOpened : classes.container}>{children}</div>
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
        overflowX: 'hidden',
    },
    containerOpened: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        overflowX: 'hidden',
        width: '90%',
    },
});
