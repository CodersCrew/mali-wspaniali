import React from 'react';
import { makeStyles, createStyles, Grid, Typography, CardMedia, Theme } from '@material-ui/core';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

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

    console.log(header);
    console.log(title);
    console.log(subtitle);
    console.log(description);

    return (
        <Grid className={classes.contentGrid} container direction="column">
            <Grid className={classes.contentPhoto} item xs={12} sm={12} md={9}>
                <CardMedia className={classes.contentPhotoMedia} component="img" image={pictureUrl} />
            </Grid>
            <Grid className={classes.contentContainer} item xs={12} sm={12} md={7}>
                <div className={classes.contentDateReadingTime}>
                    <Typography className={classes.dateReadingTime}>
                        {date ? date.toLocaleString('da-DK', options) : new Date().toLocaleString('da-DK', options)}
                    </Typography>
                    <Typography className={classes.dateReadingTime}>
                        {readingTime} {t('single-article.reading-time')}
                    </Typography>
                </div>
                <Grid className={classes.contentHeader} item>
                    <Typography className={classes.title}>{title}</Typography>
                    <Typography className={classes.description}>{description}</Typography>
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </Grid>
                <Grid container direction="row">
                    <Grid className={classes.contentHTML} item>
                        {parse(contentHTML)}
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
        contentPhoto: {
            paddingBottom: `${theme.spacing(4)}px`,
        },
        contentPhotoMedia: {
            minHeight: '441px',
            height: 'fit-content',
            borderRadius: '4px',
            maxWidth: '100vw',

            [theme.breakpoints.down('sm')]: {
                maxWidth: '100vw',
            },
        },
        contentContainer: {
            width: '100vw',
        },
        contentDateReadingTime: {
            display: 'flex',
            flexDirection: 'row',
        },
        dateReadingTime: {
            fontSize: theme.typography.overline.fontSize,
            marginRight: theme.spacing(4),
            alignSelf: 'center',
            textTransform: 'uppercase',
        },
        contentHeader: {
            paddingTop: `${theme.spacing(2)}px`,
        },
        title: {
            fontSize: theme.typography.h2.fontSize,
            letterSpacing: theme.typography.body2.letterSpacing,
            lineHeight: theme.typography.h2.lineHeight,
        },
        description: {
            paddingTop: `20px`,
            fontSize: theme.typography.h3.fontSize,
            letterSpacing: theme.typography.body2.letterSpacing,
            lineHeight: theme.typography.h3.lineHeight,
        },
        subtitle: {
            paddingTop: `${theme.spacing(3)}px`,
            paddingBottom: `${theme.spacing(2)}px`,
            fontSize: theme.typography.h4.fontSize,
            lineHeight: theme.typography.h4.lineHeight,
            letterSpacing: theme.typography.h4.letterSpacing,
            fontWeight: theme.typography.subtitle2.fontWeight,
        },
        contentHTML: {
            '& > h4': {
                marginTop: 0,
                marginBottom: theme.spacing(2),
            },
            marginTop: 0,
            paddingBottom: theme.spacing(3),
            fontSize: theme.typography.body1.fontSize,
            lineHeight: theme.typography.body1.lineHeight,
            letterSpacing: theme.typography.body1.letterSpacing,
        },
    }),
);
