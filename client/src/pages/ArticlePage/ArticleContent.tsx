import React from 'react';
import { makeStyles, createStyles, Grid, Typography, CardMedia, Theme } from '@material-ui/core';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { customArticleTheme } from './ArticlePage';

interface Props {
    pictureUrl: string;
    contentHTML: string;
    title: string;
    header: string;
    subtitle: string;
    description: string;
    date: Date;
    readingTime: number;
}

export const ArticleContent = ({
    title,
    subtitle,
    description,
    header,
    pictureUrl,
    contentHTML,
    date,
    readingTime,
}: Props) => {
    const classes = useStyles();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const { t } = useTranslation();

    return (
        <Grid className={classes.contentGrid} container direction="column">
            <Grid item xs={12} lg={9}>
                <CardMedia className={classes.contentPhotoMedia} component="img" image={pictureUrl} />
            </Grid>
            <Grid className={classes.subContainer} item lg={9} xs={12}>
                <Grid className={classes.contentContainer} item xs={12} lg={8}>
                    <div className={classes.contentDateReadingTime}>
                        <Typography className={classes.dateReadingTime}>
                            {date ? date.toLocaleString('da-DK', options) : new Date().toLocaleString('da-DK', options)}
                        </Typography>
                        <Typography className={classes.dateReadingTime}>
                            {readingTime} {t('single-article.reading-time')}
                        </Typography>
                    </div>
                    <div className={classes.contentHeader}>
                        <Typography className={classes.title}>{title}</Typography>
                        <Typography className={classes.description}>{description}</Typography>
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentGrid: {
            backgroundColor: theme.palette.background.default,
        },
        subContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            paddingTop: `${theme.spacing(4)}px`,
            display: 'flex',
            flexDirection: 'row',

            [customArticleTheme.breakpoints.down('xs')]: {
                paddingTop: `${theme.spacing(3)}px`,
            },
            [theme.breakpoints.up('xl')]: {
                paddingTop: `${theme.spacing(5)}px`,
            },
        },
        dateReadingTime: {
            fontSize: theme.typography.overline.fontSize,
            marginRight: theme.spacing(4),
            textTransform: 'uppercase',
            letterSpacing: theme.typography.overline.letterSpacing,
        },
        contentHeader: {
            paddingTop: `${theme.spacing(2)}px`,

            [theme.breakpoints.up('xl')]: {
                paddingTop: `${theme.spacing(4)}px`,
            },
        },
        title: {
            fontSize: theme.typography.h2.fontSize,
            letterSpacing: theme.typography.body2.letterSpacing,
            lineHeight: theme.typography.h2.lineHeight,
        },
        description: {
            paddingTop: `${theme.spacing(2)}px`,
            fontSize: theme.typography.h3.fontSize,
            letterSpacing: theme.typography.body2.letterSpacing,
            lineHeight: theme.typography.h3.lineHeight,

            [customArticleTheme.breakpoints.down('xs')]: {
                paddingTop: `20px`,
            },
        },
        contentHTML: {
            '& > h4': {
                marginTop: 0,
                marginBottom: theme.spacing(2),
            },

            paddingTop: `${theme.spacing(3)}px`,
            marginTop: 0,
            paddingBottom: theme.spacing(3),
            fontSize: theme.typography.body1.fontSize,
            lineHeight: theme.typography.body1.lineHeight,
            letterSpacing: theme.typography.body1.letterSpacing,

            [theme.breakpoints.up('xl')]: {
                paddingTop: `${theme.spacing(3)}px`,
                paddingBottom: theme.spacing(4),
            },
        },
    }),
);
