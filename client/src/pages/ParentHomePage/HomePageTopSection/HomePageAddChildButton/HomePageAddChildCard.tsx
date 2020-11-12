import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { AddChildPropTypes } from './types';
import { cardBackgroundColor } from '../../../../colors';

export const HomePageAddChildCard: FC<AddChildPropTypes> = ({ id, firstName, PictureComponent, onClick }) => {
    const classes = useStyles();

    return (
        <div className={classes.container} key={id} onClick={onClick}>
            <span>{PictureComponent}</span>
            <div>
                <span className={classes.childName}>{firstName}</span>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // paddingBottom: '9px',
            alignItems: 'center',
            marginRight: 16,
            marginBottom: 16,
            background: cardBackgroundColor,
            boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            fontWeight: 'bold',
            minWidth: '121px',
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
                minWidth: '90px',
                width: '90px',
                maxWidth: '90px',
                maxHeight: '120px',
                height: '120px',
            },
        },
        childName: {
            fontSize: 12,
            lineHeight: '15px',
        },
    }),
);
