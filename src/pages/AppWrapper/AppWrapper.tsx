import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Sidebar } from '../../components/Sidebar';
import { mainColor, backgroundColor } from '../../colors';

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [openSidebar, setOpenSidebar] = useState(false);

    const containerStyle = openSidebar ? classes.narrowContainer : classes.wideContainer;
    const toggleSidebar = () => setOpenSidebar(!openSidebar);

    return (
        <div className={classes.background}>
            <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
            <div className={containerStyle}>{children}</div>
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
    wideContainer: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        width: '100%',
    },
    narrowContainer: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        width: '100%',
    },
});
