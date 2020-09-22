import React from 'react';
import { makeStyles, createStyles, Grid, Typography, CardMedia, Theme, createMuiTheme } from '@material-ui/core';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

interface Props {
    pictureUrl: string;
    contentHTML: string;
    title: string;
    description: string;
    date: Date;
    readingTime: number;
}

export const ArticleContent = ({ title, description, pictureUrl, contentHTML, date, readingTime }: Props) => {
    const classes = useStyles();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const { t } = useTranslation();

    return (
        <Grid className={classes.contentGrid} container direction="column">
            <CardMedia className={classes.contentPhotoMedia} component="img" image={pictureUrl} />

            <Grid className={classes.subContainer} item lg={9} xs={12}>
                <Grid className={classes.contentContainer} item xs={12}>
                    <div className={classes.contentDateReadingTime}>
                        <Typography className={classes.dateReadingTime} variant="overline">
                            {date ? date.toLocaleString('da-DK', options) : new Date().toLocaleString('da-DK', options)}
                        </Typography>
                        <Typography className={classes.dateReadingTime} variant="overline">
                            {readingTime} {t('single-article.reading-time')}
                        </Typography>
                    </div>
                    <div className={classes.contentHeader}>
                        <Typography className={classes.title} variant="h2">
                            {title}
                        </Typography>
                        <Typography className={classes.description} variant="h3">
                            {description}
                        </Typography>
                    </div>
                    <Grid container direction="row">
                        <Grid className={classes.contentHTML} item>
                            {parse(contentHTML)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export const customArticleTheme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 361,
            sm: 768,
            md: 1024,
            lg: 1440,
            xl: 1920,
        },
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentGrid: {
            backgroundColor: theme.palette.background.default,
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                alignItems: 'center',
            },
        },
        subContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '75vw',

            [customArticleTheme.breakpoints.down('md')]: {
                width: '96vw',
            },
            [customArticleTheme.breakpoints.between('md', 'lg')]: {
                width: '83vw',
            },
        },
        contentPhotoMedia: {
            height: '441px',
            borderRadius: '4px',

            [customArticleTheme.breakpoints.down('xs')]: {
                height: '139px',
            },
            [customArticleTheme.breakpoints.between('xs', 'sm')]: {
                height: '305.12px',
            },
            [customArticleTheme.breakpoints.between('sm', 'md')]: {
                height: '413.61px',
            },
            [customArticleTheme.breakpoints.between('md', 'lg')]: {
                height: '439.88px',
            },

            [theme.breakpoints.down('sm')]: {
                maxWidth: '100vw',
            },
        },
        contentContainer: {
            width: '100vw',
        },
        contentDateReadingTime: {
            paddingTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'row',

            [customArticleTheme.breakpoints.down('xs')]: {
                paddingTop: theme.spacing(3),
            },
            [theme.breakpoints.up('xl')]: {
                paddingTop: theme.spacing(5),
            },
        },
        dateReadingTime: {
            marginRight: theme.spacing(4),
            textTransform: 'uppercase',
        },
        contentHeader: {
            paddingTop: theme.spacing(2),

            [theme.breakpoints.up('xl')]: {
                paddingTop: theme.spacing(4),
            },
        },
        title: {
            letterSpacing: theme.typography.body2.letterSpacing,
        },
        description: {
            paddingTop: theme.spacing(2),
            letterSpacing: theme.typography.body2.letterSpacing,

            [customArticleTheme.breakpoints.down('xs')]: {
                paddingTop: theme.spacing(2) + 4,
            },
        },
        contentHTML: {
            '& > h4': {
                marginTop: 0,
                marginBottom: theme.spacing(2),
            },

            paddingTop: theme.spacing(3),
            marginTop: 0,
            paddingBottom: theme.spacing(3),
            fontSize: theme.typography.body1.fontSize,
            lineHeight: theme.typography.body1.lineHeight,
            letterSpacing: theme.typography.body1.letterSpacing,

            [theme.breakpoints.up('xl')]: {
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(4),
            },
        },
    }),
);
