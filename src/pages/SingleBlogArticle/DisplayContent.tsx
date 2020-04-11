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
import { SingleArticleColors } from '../../colors';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';

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
    let ColorButton = withStyles((theme: Theme) => ({
        root: {
            backgroundColor: SingleArticleColors.categories.emotions,
            '&:hover': {
                backgroundColor: SingleArticleColors.categoriesHover.emotions,
            },
        },
    }))(Button);

    const changeButtonStyle = (cat: string) => {
        switch (cat) {
            case 'Emotions':
                ColorButton = withStyles((theme: Theme) => ({
                    root: {
                        backgroundColor: SingleArticleColors.categories.emotions,
                        '&:hover': {
                            backgroundColor: SingleArticleColors.categoriesHover.emotions,
                        },
                    },
                }))(Button);
                break;
            case 'Activity':
                ColorButton = withStyles((theme: Theme) => ({
                    root: {
                        backgroundColor: SingleArticleColors.categories.activity,
                        '&:hover': {
                            backgroundColor: SingleArticleColors.categoriesHover.activity,
                        },
                    },
                }))(Button);
                break;
            case 'Food':
                ColorButton = withStyles((theme: Theme) => ({
                    root: {
                        backgroundColor: SingleArticleColors.categories.food,
                        '&:hover': {
                            backgroundColor: SingleArticleColors.categoriesHover.food,
                        },
                    },
                }))(Button);
                break;
            case 'Other':
                ColorButton = withStyles((theme: Theme) => ({
                    root: {
                        backgroundColor: SingleArticleColors.categories.other,
                        '&:hover': {
                            backgroundColor: SingleArticleColors.categoriesHover.other,
                        },
                    },
                }))(Button);
                break;
            default:
                break;
        }
        return ColorButton;
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
                letterSpacing: '2px',
                fontSize: '10px',
                lineHeight: '1.17',
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
            },
            contentHeaderText: {
                fontSize: '20px',
                fontWeight: 'bolder',
                letterSpacing: '2px',
                lineHeight: '1.17',
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
            },
            contentHTML: {
                paddingLeft: '2vw',
                paddingBottom: '2vw',
            },
        }),
    );

    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            <Grid className={classes.contentGrid} container direction="column">
                <Grid className={classes.contentCategory} container direction="row">
                    <Grid item xs={6}>
                        <Grid container direction="row">
                            {category.map(cat => {
                                changeButtonStyle(cat);
                                return (
                                    <>
                                        <Grid item xs={3}>
                                            <ColorButton
                                                className={classes.contentCategoryButton}
                                                href={`#${cat.toUpperCase()}`}
                                                disableElevation
                                                disableFocusRipple
                                                disableRipple
                                                disableTouchRipple
                                            >
                                                <Box fontWeight={500}>
                                                    <Typography className={classes.contentCategoryText}>
                                                        {t(`single-article.${cat}`)}
                                                    </Typography>
                                                </Box>
                                            </ColorButton>
                                        </Grid>
                                    </>
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
        </>
    );
};
