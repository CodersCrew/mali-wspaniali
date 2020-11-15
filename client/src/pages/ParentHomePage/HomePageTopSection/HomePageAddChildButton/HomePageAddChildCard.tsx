import React, { FC } from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { cardBackgroundColor } from '../../../../colors';

type AddChildCardProps = {
    text: string;
    onClick: () => void;
};

export const HomePageAddChildCard: FC<AddChildCardProps> = ({ text, onClick }) => {
    const classes = useStyles();

    return (
        <div className={classes.container} onClick={onClick}>
            <AddCircleIcon className={classes.icon} />
            <div>
                <Typography variant="subtitle2">{text}</Typography>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
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
        icon: {
            color: theme.palette.text.secondary,
            width: '75px',
            height: '126px',
            objectFit: 'contain',
            borderRadius: '4px 4px 0px 0px',

            [theme.breakpoints.down('sm')]: {
                // maxWidth: '90px',
                width: '75px',
                maxHeight: '90px',
                height: '90px',
            },
        },
    }),
);
