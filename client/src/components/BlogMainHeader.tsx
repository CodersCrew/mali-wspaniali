import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@material-ui/styles';
import { Theme } from '../theme/types';

export const BlogMainHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Typography variant="h2" gutterBottom className={classes.heading}>
            {t('blog-main-page.header')}
        </Typography>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            marginTop: '20px',
            marginBottom: '4%',
            marginLeft: '3%',
            width: '60vw',
            zIndex: 10,

            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.subtitle1.fontSize,
                textAlign: 'center',
                marginLeft: '20%',
                textTransform: 'uppercase',
            },
        },
    }),
);
