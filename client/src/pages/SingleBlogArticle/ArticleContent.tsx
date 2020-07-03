import React from 'react';
import {
    makeStyles,
    createStyles,
    Grid,
    Button,
    withStyles,
    Box,
    Typography,
    CardMedia,
    Theme,
} from '@material-ui/core';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { SingleArticleColors } from '../../colors';
import { lineHeight, letterSpace } from '../../fontStyle';
import { Content } from './types';

export const ArticleContent = ({ content }: { content: Content }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid className={classes.contentGrid} container direction="column">
            <Grid className={classes.contentCategory} container direction="row">
                <Grid item xs={6}>
                    <Grid container direction="row">
                        {content.category.map(cat => {
                            const ColorButton = createColorButton(cat);
                            return (
                                <Grid key={cat} item xs={3}>
                                    <ColorButton
                                        className={classes.contentCategoryButton}
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
                    <Typography className={classes.contentHeaderText}>{`${content.header}`}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid className={classes.contentPhoto} item xs={12}>
                    <CardMedia className={classes.contentPhotoMedia} component="img" image={content.pictureUrl} />
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid className={classes.contentHTML} item xs={12}>
                    {parse(content.contentHTML)}
                </Grid>
            </Grid>
        </Grid>
    );
};

const createColorButton = (category: string) => {
    const singleArticleColor = getSingleArticleColor(category);
    const singleArticleColorHover = getSingleArticleColorHover(category);

    return withStyles(() => ({
        root: {
            backgroundColor: singleArticleColor,
            '&:hover': {
                backgroundColor: singleArticleColorHover,
            },
        },
    }))(Button);
};

const getSingleArticleColor = (category: string) => {
    const { categories }: { categories: { [index: string]: string } } = SingleArticleColors;
    const selectedColor = categories[category];

    return selectedColor || categories.emotions;
};

const getSingleArticleColorHover = (category: string) => {
    const { categoriesHover }: { categoriesHover: { [index: string]: string } } = SingleArticleColors;
    const selectedColor = categoriesHover[category];

    return selectedColor || categoriesHover.emotions;
};

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
            lineHeight,
        },
        contentCategoryTextBox: {
            fontWeight: 500,
        },
        contentCategoryButton: {
            paddingTop: '2px',
            height: '25px',
            width: '85px',
            borderRadius: '4px',
        },
        contentHeader: {
            paddingTop: '4vw',
            paddingBottom: '2.14vw',

            [theme.breakpoints.down('sm')]: {
                paddingTop: '30px',
                paddingBottom: '25px',
            },
        },
        contentHeaderText: {
            fontSize: '20px',
            fontWeight: 'bolder',
            letterSpacing: letterSpace,
            lineHeight,
            textTransform: 'uppercase',

            [theme.breakpoints.down('sm')]: {
                textTransform: 'initial',
            },
        },
        contentPhoto: {
            paddingBottom: '2vw',
        },
        contentPhotoMedia: {
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
        contentHTML: {
            paddingLeft: '2vw',
            paddingBottom: '2vw',
        },
    }),
);
