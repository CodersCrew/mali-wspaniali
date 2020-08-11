import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { mainColor, backgroundColor } from '../../../colors';

export interface Props {
    handleLogoutClick(): void;
    extended: boolean;
}

export const SidebarLogoutItem = ({ handleLogoutClick, extended }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const logoutBtnStyle = clsx({ [classes.logoutBtn]: true, opened: extended });
    const logoutBtnContent = extended ? t('menu.logout') : <PowerSettingsNew />;

    return (
        <div className={classes.logoutBtnContainer}>
            <IconButton className={logoutBtnStyle} onClick={handleLogoutClick}>
                {logoutBtnContent}
            </IconButton>
        </div>
    );
};

const useStyles = makeStyles({
    logoutBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    logoutBtn: {
        position: 'absolute',
        bottom: 53,
        color: '#fff',

        '& span': {
            '&:hover': {
                opacity: 0.7,
            },
        },

        '&.opened': {
            border: '1px solid #E3E3E8',
            borderRadius: '4px',
            padding: '5px 10px',
            lineHeight: '18px',
            fontWeight: 'normal',
            fontSize: '15px',
            textTransform: 'uppercase',

            '&:hover': {
                color: mainColor,
                backgroundColor,
            },
        },
    },
});
