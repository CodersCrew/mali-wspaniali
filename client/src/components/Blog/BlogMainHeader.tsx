import { Typography, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { createStyles } from '@material-ui/styles';

export const BlogMainHeader = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div>
            <div className={classes.subtitleContainer}>
                <Typography variant="h4" gutterBottom className={classes.subtitle}>
                    {t('blog-main-page.header')}
                </Typography>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            color: theme.palette.primary.contrastText,
            fontSize: theme.typography.h4.fontSize,
            textTransform: 'uppercase',
            cursor: 'default',
            userSelect: 'none',
        },
        subtitle: {
            fontSize: theme.typography.h2.fontSize,
            zIndex: 10,
            width: '60vw',

            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.subtitle1.fontSize,
                fontWeight: theme.typography.subtitle1.fontWeight,
                textAlign: 'center',
                textTransform: 'uppercase',
            },
        },

        subtitleContainer: {
            display: 'flex',
            marginTop: '20px',
            zIndex: 10,

            [theme.breakpoints.down('sm')]: {
                justifyContent: 'center',
            },
        },
    }),
);
