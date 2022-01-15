import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';

import { BlogArticleCard } from '../../components/Blog/BlogArticleCard';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';
import { Pagination } from '../../components/Blog/Pagination';
import { useIsDevice } from '../../queries/useBreakpoints';
import { useCreateArticle } from '../../operations/mutations/Articles/createArticle';
import { ARTICLES_PER_PAGE, useArticles } from '../../operations/queries/Articles/getArticles';

export default function AdminArticlesPage() {
    const history = useHistory();
    const classes = useStyles();
    const { t } = useTranslation();
    const { isSmallMobile } = useIsDevice();
    const { createArticle } = useCreateArticle();

    const [currentPage, setCurrentPage] = useState(1);

    const { paginatedArticles, loading, fetchMore, refetch } = useArticles(currentPage);

    useEffect(() => {
        activePage(['admin-menu.articles.title']);
        setCurrentPage(1);
    }, []);

    if (!paginatedArticles || loading) return null;

    const { articles, count, hasNext } = paginatedArticles;

    return (
        <PageContainer>
            <Typography className={classes.headerText} variant="h3">
                {t('admin-articles.title')}
            </Typography>
            <ButtonSecondary
                variant="contained"
                className={clsx(classes.addButton, classes.link)}
                onClick={onCreateArticleClick}
            >
                <AddIcon className={classes.addIcon} />
                {t('admin-articles.add-article')}
            </ButtonSecondary>
            <Grid container justify="center" spacing={isSmallMobile ? 2 : 4}>
                {articles.map((article) => (
                    <Grid key={article._id} item xs={12} sm={6} md={4} zeroMinWidth>
                        <BlogArticleCard article={article} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.paginationContainer}>
                <Pagination
                    count={articles.length}
                    maxCount={count}
                    disabled={!hasNext}
                    hidden={articles.length < ARTICLES_PER_PAGE}
                    onClick={() => {
                        const { scrollY } = window;

                        fetchMore({
                            variables: {
                                page: currentPage + 1,
                                perPage: ARTICLES_PER_PAGE,
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                setCurrentPage((prevPage) => prevPage + 1);

                                if (!fetchMoreResult) return prev;

                                return {
                                    ...prev,
                                    paginatedArticles: {
                                        ...prev.paginatedArticles,
                                        ...fetchMoreResult!.paginatedArticles,
                                        articles: [
                                            ...prev.paginatedArticles.articles,
                                            ...fetchMoreResult!.paginatedArticles.articles,
                                        ],
                                    },
                                };
                            },
                        }).then(() => {
                            window.scroll(0, scrollY);
                        });
                    }}
                />
            </div>
        </PageContainer>
    );

    function onCreateArticleClick() {
        createArticle().then((id) => {
            refetch().then(() => history.push(`/admin/article/${id}/edit`));
        });
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addIcon: {
            marginRight: theme.spacing(1),
        },
        link: {
            textDecoration: 'none',
            position: 'fixed',
            bottom: theme.spacing(3),
            right: theme.spacing(3),
            zIndex: 99,
        },
        addButton: {
            borderRadius: theme.spacing(3),
            padding: theme.spacing(1.5),
        },
        headerText: {
            marginBottom: theme.spacing(3),
        },
        paginationContainer: {
            marginBottom: theme.spacing(3),
        },
    }),
);
