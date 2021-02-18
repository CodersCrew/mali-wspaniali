import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@material-ui/styles';

export const BlogMainHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div>
            <div className={classes.subtitleContainer}>
                <Typography variant="h3" gutterBottom className={classes.subtitle}>
                    {t('blog-main-page.header')}
                </Typography>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        subtitle: {
            margin: 0,
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.subtitle1.fontSize,
                fontWeight: theme.typography.subtitle1.fontWeight,
                textAlign: 'center',
                textTransform: 'uppercase',
            },
        },

        subtitleContainer: {
            display: 'flex',
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(3),

            [theme.breakpoints.down('sm')]: {
                justifyContent: 'center',
            },
        },
    }),
);
