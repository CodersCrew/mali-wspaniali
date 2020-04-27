import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles, Grid, Button, Typography } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';
import { lineHeight, letterSpace } from '../../fontStyle';
import { Path } from './types';

export const ArticlePath = ({ path }: { path: Path }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid item xs={8}>
            <Grid container direction="row">
                <Button href="#BLOG" disableElevation disableFocusRipple disableRipple disableTouchRipple>
                    <Typography className={classes.pathText}>{t('single-article.blog').toUpperCase()}</Typography>
                </Button>
                <div className={classes.pathArrowContainer}>
                    <Typography className={classes.pathArrow} />
                </div>
                <Button
                    href={`#${path.category.toUpperCase()}`}
                    disableElevation
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                >
                    <Typography className={classes.pathText}>
                        {t(`single-article.${path.category}`).toUpperCase()}
                    </Typography>
                </Button>
                <div className={classes.pathArrowContainer}>
                    <Typography className={classes.pathArrow} />
                </div>
                <div className={classes.pathTitleContainer}>
                    <Typography className={classes.pathTitle}>{`${path.subtitle.toUpperCase()}   (${t(
                        'single-article.length',
                    ).toUpperCase()} - ${path.readingTime} MIN)`}</Typography>
                </div>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pathText: {
            fontWeight: 'bold',
            letterSpacing: letterSpace,
            lineHeight: lineHeight,
            margin: '0px 5px 0px 5px',
        },
        pathTitleContainer: {
            marginTop: '8px',
        },
        pathTitle: {
            color: SingleArticleColors.title,
            letterSpacing: letterSpace,
            lineHeight: lineHeight,
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
            lineHeight: lineHeight,
            fontSize: '10px',
            padding: '1px 5px 0px 10px',
        },
    }),
);
