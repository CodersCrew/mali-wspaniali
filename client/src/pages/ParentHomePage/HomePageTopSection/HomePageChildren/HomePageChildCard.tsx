import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ChildPropTypes } from './types';
import { cardBackgroundColor } from '../../../../colors';

export const HomePageChildCard: FC<ChildPropTypes> = ({
    id,
    firstName,
    PictureComponent,
}) => {
    const classes = useStyles();

    return (
        <Link to={`parent/child/${id}/results`} className={classes.link}>
            <div className={classes.container} key={id}>
                <span>{PictureComponent}</span>
                <div>
                    <span className={classes.childName}>{firstName}</span>
                </div>
            </div>
        </Link>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            height: '163px',

            '&:hover': {
                cursor: 'pointer',
                opacity: 0.8,
                boxShadow: '0 0 2px 0px #fff',
                transition: 'all 0.3s ease-in-out',
            },

            [theme.breakpoints.down('sm')]: {
                marginRight: 0,
                width: '90px',
                maxWidth: '100px',
                maxHeight: '120px',
                height: '120px',
            },
        },
        childName: {
            fontSize: 12,
            lineHeight: '15px',
        },
        link: {
            textDecoration: 'none',
            color: '#000',

            [theme.breakpoints.down('sm')]: {
                margin: '0 12px',
            },
        },
    }),
);
