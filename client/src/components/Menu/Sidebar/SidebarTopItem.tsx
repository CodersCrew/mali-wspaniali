import React from 'react';
import { Link } from 'react-router-dom';
import { FastForward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { mainColor } from '../../../colors';
import SidebarLogo from '../../../assets/MALWSP_logo_nav.png';
import { Me } from '../../../graphql/types';

export interface Props {
    toggleSidebar(): void;
    extended: boolean;
    user: Me;
}

export const SidebarTopItem = ({ toggleSidebar, extended, user }: Props) => {
    const classes = useStyles();

    const switcherIconStyle = clsx({ [classes.switcherIcon]: true, opened: extended });

    return (
        <div className={classes.sidebarLogoWrapper}>
            <Link to={`/${user.role}`}>
                <img src={SidebarLogo} alt="mali_wspaniali" />
            </Link>
            <button onClick={toggleSidebar} className={classes.sidebarSwitcher}>
                <FastForward className={switcherIconStyle} />
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
        marginBottom: 52,
    },
    sidebarSwitcher: {
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
    switcherIcon: {
        width: 16,
        height: 16,
        transition: 'transform 0.4s',

        '&.opened': {
            transform: 'rotate(-180deg)',
        },
    },
});
