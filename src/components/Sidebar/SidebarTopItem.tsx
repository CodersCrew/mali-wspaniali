import React from 'react';
import { FastForward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { mainColor } from '../../colors';
import { SidebarPropTypes } from './types';

export const SidebarTopItem = ({ toggleSidebar, openSidebar }: SidebarPropTypes) => {
    const classes = useStyles();

    const sidebarSwitchIcon = openSidebar ? classes.switchIconOpened : classes.switchIconClosed;

    return (
        <div className={classes.sidebarLogoWrapper}>
            <img src={require('../../assets/MALWSP_logo_nav.png')} alt="mali_wspaniali" />
            <button onClick={toggleSidebar} className={classes.sidebarSwitch}>
                <FastForward className={sidebarSwitchIcon} />
            </button>
        </div>
    );
};

const useStyles = makeStyles({
    sidebarLogoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 62,
    },
    sidebarSwitch: {
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        position: 'absolute',
        right: '-28px',
        background: mainColor,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        color: '#fff',
    },
    switchIconClosed: {
        width: 16,
        height: 16,
        transition: 'transform 0.5s',
    },
    switchIconOpened: {
        width: 16,
        height: 16,
        transform: 'rotate(-180deg)',
        transition: 'transform 0.5s',
    },
});
