import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { ChildProps } from './types';
import { cardBackgroundColor } from '../../../colors';

export const HomePageChildCard: FC<ChildProps> = ({ firstname, userId, link, PictureComponent }) => {
    const classes = useStyles();

    return (
        <div className={classes.container} key={userId}>
            <span> {PictureComponent}</span>
            <div>
                <span className={classes.Child}>{firstname}</span>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

            [theme.breakpoints.down('sm')]: {
                marginRight: 0,
            },
        },
        childAva: {
            minWidth: '122px',
            height: '126px',
            objectFit: 'cover',
            borderRadius: '4px 4px 0px 0px',
        },
        childName: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Child: {
            fontSize: 12,
            lineHeight: '15px',
        },
    }),
);
