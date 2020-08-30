import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './EmptyResultStyles';

export const EmptyResultSimple = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.wrapper}>
            <div className={classes.titleWrapper}>
                <Typography variant="h4" className={classes.title}>
                    {t('child-profile.no-results-title')}
                </Typography>
            </div>
            <Typography variant="body2" className={classes.content}>
                {t('child-profile.no-results-text')}
            </Typography>
            <img
                className={classes.image}
                src="https://via.placeholder.com/160x100"
                alt="placeholder"
            />
        </div>
    );
};
