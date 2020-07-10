import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../theme/theme';
import { createStyles } from '@material-ui/styles';
import { Theme } from '../theme';

export const BlogMainHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h4" gutterBottom className={classes.heading}>
                {t('blog-main-page.header')}
            </Typography>
        </ThemeProvider>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            marginTop: '20px',
            fontWeight: 'bold',
            fontSize: '34px',
            marginBottom: '4%',
            marginLeft: '3%',
            width: '60%',
            zIndex: 10,

            [theme.breakpoints.down('sm')]: {
                fontSize: '15px',
                fontWeight: 'normal',
                textAlign: 'center',
                marginLeft: '20%',
                textTransform: 'uppercase',
            },
        },
    }),
);
