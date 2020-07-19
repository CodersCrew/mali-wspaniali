import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';

import { SingleArticleColors } from '../../colors';
import { lineHeight, letterSpace } from '../../fontStyle';
import { Button } from '../../components/Button';

interface Props {
    category: string;
    title: string;
    readingTime: number;
}

export const BreadcrumbsWithDescription = ({ category, title, readingTime }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid item xs={8} className={classes.pathContainer}>
            <Grid container direction="row">
                <Button href="/parent/blog/all/1" disableElevation disableFocusRipple disableRipple disableTouchRipple>
                    <Typography className={classes.pathText}>{t('single-article.blog').toUpperCase()}</Typography>
                </Button>
                <div className={classes.pathArrowContainer}>
                    <Typography className={classes.pathArrow} />
                </div>
                <Button
                    href={`/parent/blog/${category}/1`}
                    disableElevation
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                >
                    <Typography className={classes.pathText}>
                        {t(`single-article.${category}`).toUpperCase()}
                    </Typography>
                </Button>
                <div className={classes.pathArrowContainer}>
                    <Typography className={classes.pathArrow} />
                </div>
                <div className={classes.pathTitleContainer}>
                    <Typography className={classes.pathTitle}>{`${title.toUpperCase()}   (${t(
                        'single-article.length',
                    ).toUpperCase()} - ${readingTime} MIN)`}</Typography>
                </div>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pathContainer: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        pathText: {
            fontWeight: 'bold',
            letterSpacing: letterSpace,
            lineHeight,
            margin: '0px 5px 0px 5px',
        },
        pathTitleContainer: {
            marginTop: '8px',
        },
        pathTitle: {
            color: SingleArticleColors.title,
            letterSpacing: letterSpace,
            lineHeight,
            fontSize: '12px',
            padding: '1px 5px 0px 10px',
        },
        pathArrowContainer: {
            marginTop: '10px',
        },
        pathArrow: {
            border: 'solid',
            borderColor: SingleArticleColors.arrow,
            borderWidth: '0px 3px 3px 0px',
            padding: '4px',
            margin: '0px 5px 0px 5px',
            width: '5px',
            height: '5px',
            transform: 'rotate(-45deg)',
        },
        readingTime: {
            color: SingleArticleColors.title,
            lineHeight,
            fontSize: '10px',
            padding: '1px 5px 0px 10px',
        },
    }),
);
