import React from 'react';
import { makeStyles, createStyles, Grid, Typography, CardMedia, Theme } from '@material-ui/core';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { SingleArticleColors } from '../../colors';
import { lineHeight, letterSpace } from '../../fontStyle';

interface Props {
    pictureUrl: string;
    contentHTML: string;
    title: string;
    date: Date;
    readingTime: number;
}

export const ArticleContent = ({ title, pictureUrl, contentHTML, date, readingTime }: Props) => {
    const classes = useStyles();
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const { t } = useTranslation();

    return (
        <Grid className={classes.contentGrid} container direction="column" spacing={4}>
            <Grid className={classes.contentPhoto} item xs={12}>
                <CardMedia className={classes.contentPhotoMedia} component="img" image={pictureUrl} />
            </Grid>
            <Grid className={classes.contentContainer} item xs={12}>
                <div className={classes.contentDateReadingTime}>
                    <Typography className={classes.dateReadingTime}>
                        {date ? date.toLocaleString('da-DK', options) : new Date().toLocaleString('da-DK', options)}
                    </Typography>
                    <Typography className={classes.dateReadingTime}>
                        {readingTime} {t(`single-article.reading-time`).toUpperCase()}
                    </Typography>
                </div>
                <Grid className={classes.contentHeader} item xs={12}>
                    <Typography className={classes.contentTitleText}>{title}</Typography>
                </Grid>
                <Grid container direction="row">
                    <Grid className={classes.contentHTML} item xs={12}>
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
            paddingBottom: '2.14vw',
            paddingTop: '32px',
        },
        contentPhotoMedia: {
            height: '200px',
            borderRadius: '4px',
            border: 'solid',
            borderColor: SingleArticleColors.break,
            borderWidth: '2px',
            maxHeight: '40vw',
            maxWidth: '70vw',

            [theme.breakpoints.down('sm')]: {
                maxWidth: '100vw',
            },
        },
        contentContainer: {
            width: '60vw',
        },
        contentDateReadingTime: {
            display: 'flex',
            flexDirection: 'row',
        },
        dateReadingTime: {
            fontSize: '10px',
            marginRight: theme.spacing(4),
            alignSelf: 'center',
        },
        contentHeader: {
            paddingTop: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                paddingTop: '30px',
                paddingBottom: '25px',
            },
        },
        contentTitleText: {
            fontSize: '20px',
            fontWeight: 'bolder',
            letterSpacing: letterSpace,
            lineHeight,
            textTransform: 'uppercase',

            [theme.breakpoints.down('sm')]: {
                textTransform: 'initial',
            },
        },
        contentHTML: {
            paddingBottom: theme.spacing(3),
        },
    }),
);
