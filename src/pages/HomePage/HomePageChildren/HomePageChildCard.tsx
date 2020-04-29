import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { ChildProps } from './types';
import { cardBackgroundColor } from '../../../colors';

export const HomePageChildCard: FC<ChildProps> = ({ firstname, userId, link, PictureComponent }) => {
    const classes = useStyles();

    return (
        <div className={ classes.container } key={ userId }>
            <Link to={link} className={classes.menuLink}>
                <span> {PictureComponent}</span>
                <div className={classes.childName}>
                    <span className={classes.Child}>{firstname}</span>
                </div>
            </Link>
        </div>
    );
};

const useStyles = makeStyles({
    menuLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '9px',
        alignItems: 'center',
        marginRight: 35,
        background: cardBackgroundColor,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '4px',
        fontWeight: 'bold',
        maxWidth: '121px',
        maxHeight: '163px',
    },
    childAva: {
        minWidth: '122px',
        height: '126px',
        objectFit: 'cover',
        borderRadius: '4px 4px 0px 0px',
    },

    childName: {
        display: 'flex',
        justifyContent: 'center'
    },
    Child: {
        fontSize: 12,
        lineHeight: '15px',
    },
});
