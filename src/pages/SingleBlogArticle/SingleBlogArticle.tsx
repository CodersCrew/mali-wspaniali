import React, { useState, useEffect} from 'react';
import Interweave from 'interweave';
//import { useParams } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
//import { useAuthorization } from '../../hooks/useAuthorization';
import { getSingleArticleById, getSimilarArticlesListData} from '../../queries/singleArticleQueries';
import { load } from '../../utils/load';
import { Article } from '../../firebase/types';
import { Typography, Container, makeStyles, createStyles, Grid, createMuiTheme, Theme, ThemeProvider, Button, Box, CardMedia } from '@material-ui/core';

export const SingleBlogArticle = () => {
    //useAuthorization(true, '/', ['admin', 'parent']);
    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                '"Montserrat"',
            ].join(','),
        },
    });

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            typography: {
                fontFamily: 'Montserrat',
            },
            rootBlogSingleArticleContainer: {
                backgroundColor: '#008aad',
            },
            rootGrid: {
                padding: '10px 20px 20px 5vw',
            },
            rootContainer: {
                backgroundColor: '#f1f2f4',
                borderRadius: '20px',
                height: '3000px',
                padding: '50px 0px 0px 5vw',
            },
            displayPath: {
                justifyContent: 'flex-start',
            },
            displayPathText: {
                fontWeight: 'bold',
                letterSpacing: '2px',
                lineHeight: '1.17',
                margin: '0px 5px 0px 5px',
            },
            displayPathTextButton: {
                margin: '-8px 0px 0px 0px',
            },
            displayPathTitle: {
                color: '#656269',
                letterSpacing: '2px',
                lineHeight: '1.17',
                fontSize: '12px',
                padding: '1px 5px 0px 10px',
            },
            displayPathArrow: {
                border: 'solid #ff7149',
                borderWidth: '0px 3px 3px 0px',
                padding: '4px',
                margin: '0px 5px 0px 5px',
                width: '5px',
                height: '5px',
                transform: 'rotate(-45deg)',
            },
            headerLongTitle: {
                padding: '40px 0px 100px 0px',
            },
            headerLongTitleText: {
                fontSize: '34px',
                color: '#008aad',
                fontWeight: 'bold',
                letterSpacing: '2px',
                lineHeight: '1.17',
            },
            content: {
                backgroundColor: '#ffffff',
                padding: '0px 30px 0px 30px',
            },
            contentHeader: {},
            contentHeaderText: {
                fontSize: '20px',
                fontWeight: 'bolder',
                letterSpacing: '2px',
                lineHeight: '1.17',
                padding: '0px 0px 30px 0px',
            },
            contentHeaderPhoto: {
                borderRadius: '4px',
                border: 'solid #d7d6d6',
                borderWidth: '2px',
            },
            contentHeaderPhotoMedia: {
                maxHeight: '500px',
                height: '100%',
                width: '100%',
            },
            contentHeaderCategory: {
                padding: '1px 0px 50px 0px',
            },
            contentHeaderCategoryBackground: {
                backgroundColor: '#f5a56e',
                height: '25px',
                width: '85px',
                borderRadius: '4px',
                margin: '0px 0px 0px 5vw',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
            },
            contentHeaderCategoryText: {
                color: '#ffffff',
                letterSpacing: '2px',
                fontSize: '10px',
                lineHeight: '1.17',
            },
            mainContentHTML: {
                padding: '30px 0px 0px 0px',
                height: '600px',
            },
            videoContent: {
                padding: '15px 0px 0px 0px',
                margin: '30px 0px 30px 0px',
                borderTop: 'solid #d7d6d6',
                borderBottom: 'solid #d7d6d6',
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
            },
            videoContentPlayerContainer: {
                padding: '15px 0px 80px 0px',
            },
            videoContentPlayer: {
                width: '90%',
                height: '100%',
                minHeight: '400px',
                padding: '30px 0px 0px 5%',
                border: 'none',
            },
            videoContentTags: {
                padding: '0px 0px 30px 0px',
            },
            videoContentTagsDisplay: {
                padding: '30px 0px 30px 0px',
            },
            videoContentTagsDisplayButton: {
                backgroundColor: '#e0e0e0',
                width: '15%',
                height: '40px',
                padding: '0px',
                margin: '0px 5% 0px 0px',
                fontFamily: 'Roboto',
                fontSize: '15px',
                fontWeight: 'bold',
            },
            singleArticle: {
                position: 'absolute',
                width: '80%',
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
        }),
    );
    const classes = useStyles();
    //const { t } = useTranslation();
    //const { articleId } = useParams<{ articleId: string }>();
    const [articleId] = useState<string>('KRw6nEGIXsTnAXrpBIqg');
    const [article, setArticle] = useState<Article>();
    const [similarArticles, setSimilarArticles] = useState<Article[]>();
    const [listeners, setListeners] = useState<(() => void)[]>([]);

    const detachListeners = () => {
        listeners.forEach(listener => () => listener());
    };

    const waitForArticlesData = async () => {
        const { article, unsubscribe } = await getSingleArticleById(articleId);
        if (unsubscribe) {
            setArticle(article);
            const { articleList, unsubscribed } = await getSimilarArticlesListData(article, article.category, article.tags);
            if (unsubscribed) {
                setSimilarArticles(articleList);
                setListeners([...listeners, unsubscribe, unsubscribed]);
            };
        };
    };

    useEffect(() => {
        //load(waitForArticleData(articleId));
        //load(waitForArticleListData());
        load(waitForArticlesData());
        return () => detachListeners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={classes.rootBlogSingleArticleContainer}>
                    {article && similarArticles ? (
                        <>
                            <Container>
                                <Grid className={classes.rootGrid} container>
                                    <Grid className={classes.rootContainer} item xs={12} direction="row">
                                        <Grid className={classes.displayPath} container xs={10} direction={'row'}>
                                            <Button
                                                className={classes.displayPathTextButton}
                                                href="#BLOG"
                                                disableElevation
                                                disableFocusRipple
                                                disableRipple
                                                disableTouchRipple
                                            >
                                                <Typography className={classes.displayPathText}>BLOG</Typography>
                                            </Button>
                                            <Typography className={classes.displayPathArrow} />
                                            <Button // eslint-disable-next-line
                                                className={classes.displayPathTextButton}
                                                href={`#${article.category[0].toUpperCase()}`}
                                                disableElevation
                                                disableFocusRipple
                                                disableRipple
                                                disableTouchRipple
                                            >
                                                <Typography className={classes.displayPathText}>
                                                    {article.category[0].toUpperCase()}
                                                </Typography>
                                            </Button>
                                            <Typography className={classes.displayPathArrow} />
                                            <Typography className={classes.displayPathTitle}>
                                                {article.titles[0].toUpperCase()}
                                            </Typography>
                                        </Grid>
                                        <Grid className={classes.headerLongTitle} container xs={10} direction="row">
                                            <Typography className={classes.headerLongTitleText}>
                                                {article.titles[1].toUpperCase()}
                                            </Typography>
                                        </Grid>
                                        <Grid className={classes.content} container xs={11}>
                                            <Grid className={classes.contentHeader} container xs={12} direction="row">
                                                <Grid
                                                    className={classes.contentHeaderCategory}
                                                    container
                                                    xs={12}
                                                    direction="row"
                                                >
                                                    <Typography className={classes.contentHeaderCategoryText}>
                                                        <Box
                                                            className={classes.contentHeaderCategoryBackground}
                                                            fontWeight={600}
                                                        >
                                                            {article.category[0]}
                                                        </Box>
                                                    </Typography>
                                                </Grid>
                                                <Grid container xs={12} direction="row">
                                                    <Typography className={classes.contentHeaderText}>
                                                        {`${article.header.toUpperCase()}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                className={classes.contentHeaderPhoto}
                                                container
                                                xs={12}
                                                direction="row"
                                            >
                                                <CardMedia
                                                    className={classes.contentHeaderPhotoMedia}
                                                    component="img"
                                                    image={article.pictureUrl}
                                                />
                                            </Grid>
                                            <Grid>
                                                <Grid
                                                    className={classes.mainContentHTML}
                                                    container
                                                    xs={12}
                                                    direction="row"
                                                >
                                                    <Interweave content={article.contentHTML} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className={classes.videoContent} container xs={11}>
                                            <Grid
                                                className={classes.videoContentPlayerContainer}
                                                container
                                                xs={12}
                                                direction="row"
                                            >
                                                <Container>
                                                    <CardMedia
                                                        className={classes.videoContentPlayer}
                                                        component="iframe"
                                                        src={article.videoUrl}
                                                    />
                                                </Container>
                                            </Grid>
                                            <Grid
                                                className={classes.videoContentTags}
                                                container
                                                xs={12}
                                                direction="row"
                                            >
                                                <Container className={classes.videoContentTagsDisplay}>
                                                    <Button
                                                        className={classes.videoContentTagsDisplayButton}
                                                    >{`#${article.tags[0]}`}</Button>
                                                    <Button
                                                        className={classes.videoContentTagsDisplayButton}
                                                    >{`#${article.tags[1]}`}</Button>
                                                    <Button
                                                        className={classes.videoContentTagsDisplayButton}
                                                    >{`#${article.tags[2]}`}</Button>
                                                </Container>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                        >

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4"></Typography>
                        </>
                    )}
                </div>
            </ThemeProvider>
        </>
    );
};
