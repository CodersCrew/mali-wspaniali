import React from 'react';
import {
    makeStyles,
    Theme,
    createStyles,
    Grid,
    Button,
    withStyles,
    Box,
    Typography,
    CardMedia,
} from '@material-ui/core';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

import { SingleArticleColors } from '../../colors';
import { lineHeight, letterSpace } from '../../fontStyle';

export const DisplayContent = ({
    category,
    header,
    pictureUrl,
    contentHTML,
}: {
    category: string[];
    header: string;
    pictureUrl: string;
    contentHTML: string;
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid className={classes.contentGrid} container direction="column">
            <Grid className={classes.contentCategory} container direction="row">
                <Grid item xs={6}>
                    <Grid container direction="row">
                        {category.map(cat => {
                            return (
                                <Grid item xs={3}>
                                    <ColorButton
                                        className={`$classes.contentCategoryButton${cat}`}
                                        href={`#${cat.toUpperCase()}`}
                                        disableElevation
                                        disableFocusRipple
                                        disableRipple
                                        disableTouchRipple
                                    >
                                        <Box className={classes.contentCategoryTextBox}>
                                            <Typography className={classes.contentCategoryText}>
                                                {t(`single-article.${cat}`).toUpperCase()}
                                            </Typography>
                                        </Box>
                                    </ColorButton>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid className={classes.contentHeader} item xs={12}>
                    <Typography className={classes.contentHeaderText}>{`${header.toUpperCase()}`}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid className={classes.contentPhoto} item xs={12}>
                    <CardMedia className={classes.contentPhotoMedia} component="img" image={pictureUrl} />
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid className={classes.contentHTML} item xs={12}>
                    {parse(contentHTML)}
                </Grid>
            </Grid>
        </Grid>
    );
};

let ColorButton = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: SingleArticleColors.categories.emotions,
        '&:hover': {
            backgroundColor: SingleArticleColors.categoriesHover.emotions,
        },
    },
}))(Button);

const colorButtonpaddingTop = '2px';
const colorButtonHeight = '25px';
const colorButtonWidth = '85px';
const colorButtonBorderRadius = '4px';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentGrid: {
            backgroundColor: SingleArticleColors.contentBackground,
            padding: '0 2.14vw 2.85vw',
        },
        contentCategory: {
            paddingLeft: '2.14vw',
        },
        contentCategoryText: {
            color: SingleArticleColors.contentBackground,
            letterSpacing: letterSpace,
            fontSize: '10px',
            lineHeight: lineHeight,
        },
        contentCategoryTextBox: {
            fontWeight: 500,
        },
        contentCategoryButtonEmotions: {
            root: {
                backgroundColor: SingleArticleColors.categories.emotions,
                '&:hover': {
                    backgroundColor: SingleArticleColors.categoriesHover.emotions,
                },
            },
            paddingTop: colorButtonpaddingTop,
            height: colorButtonHeight,
            width: colorButtonWidth,
            borderRadius: colorButtonBorderRadius,
        },
        contentCategoryButtonActivity: {
            root: {
                backgroundColor: SingleArticleColors.categories.activity,
                '&:hover': {
                    backgroundColor: SingleArticleColors.categoriesHover.activity,
                },
            },
            paddingTop: colorButtonpaddingTop,
            height: colorButtonHeight,
            width: colorButtonWidth,
            borderRadius: colorButtonBorderRadius,
        },
        contentCategoryButtonFood: {
            root: {
                backgroundColor: SingleArticleColors.categories.food,
                '&:hover': {
                    backgroundColor: SingleArticleColors.categoriesHover.food,
                },
            },
            paddingTop: colorButtonpaddingTop,
            height: colorButtonHeight,
            width: colorButtonWidth,
            borderRadius: colorButtonBorderRadius,
        },
        contentCategoryButtonOther: {
            root: {
                backgroundColor: SingleArticleColors.categories.other,
                '&:hover': {
                    backgroundColor: SingleArticleColors.categoriesHover.other,
                },
            },
            paddingTop: colorButtonpaddingTop,
            height: colorButtonHeight,
            width: colorButtonWidth,
            borderRadius: colorButtonBorderRadius,
        },
        contentHeader: {
            paddingTop: '4vw',
            paddingBottom: '2.14vw',
        },
        contentHeaderText: {
            fontSize: '20px',
            fontWeight: 'bolder',
            letterSpacing: letterSpace,
            lineHeight: lineHeight,
        },
        contentPhoto: {
            paddingBottom: '2vw',
        },
        contentPhotoMedia: {
            borderRadius: colorButtonBorderRadius,
            border: 'solid',
            borderColor: SingleArticleColors.break,
            borderWidth: '2px',
            maxHeight: '40vw',
            maxWidth: '70vw',
        },
        contentHTML: {
            paddingLeft: '2vw',
            paddingBottom: '2vw',
        },
    }),
);
