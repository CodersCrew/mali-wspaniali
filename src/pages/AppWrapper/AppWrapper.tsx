import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Sidebar } from '../../components/Sidebar';
import { mainColor, backgroundColor } from '../../colors';

export const AppWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const [openSidebar, setOpenSidebar] = useState(false);
    const { background, narrowContainer, wideContainer } = classes;

    const containerStyle = openSidebar ? narrowContainer : wideContainer;

    const toggleSidebar = () => setOpenSidebar(!openSidebar);

    return (
        <div className={background}>
            <div>
                <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
            </div>
            <div className={containerStyle}>{children}</div>
        </div>
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
        display: 'flex',
        backgroundColor: mainColor,
        minHeight: '100vh',
        height: '100%',
        padding: '10px 10px 10px 100px',
    },
    wideContainer: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        overflowX: 'hidden',
    },
    narrowContainer: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        overflowX: 'hidden',
        width: '90%',
    },

});
