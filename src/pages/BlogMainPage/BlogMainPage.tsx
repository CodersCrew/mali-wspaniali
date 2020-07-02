import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, ThemeProvider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { BlogArticleCard } from './BlogArticleCard';
import { CategoryTabs } from './CategoryTabs';
import { Pagination } from './Pagination';
import { getArticles } from '../../queries/articleQueries';
import { PaginatedArticleList, Snapshot } from '../../firebase/types';
import { ArticleCategories } from './types';
import { white, mainColor } from '../../colors';
import { DropDownMenu } from './DropDownMenu';
import { BlogMainHeader } from '../../components/BlogMainHeader';

export const BlogMainPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [currentCategory, setCurrentCategory] = useState<string>('all');
    const [blogArticles, setBlogArticles] = useState<PaginatedArticleList | null>(null);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);

    useEffect(() => {
        addArticlesToState(currentCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategory]);

    const addArticlesToState = (categoryKey: string | undefined, startAfter?: Snapshot, endBefore?: Snapshot) => {
        const category = categoryKey === 'all' ? undefined : categoryKey;

        getArticles(
            blogArticlesFromSnapshot => {
                setBlogArticles(blogArticlesFromSnapshot);
                setupPagination(blogArticlesFromSnapshot, startAfter, endBefore);
            },
            category,
            startAfter,
            endBefore,
        );
    };

    const setupPagination = (
        blogArticlesFromSnapshot: PaginatedArticleList,
        startAfter?: Snapshot,
        endBefore?: Snapshot,
    ) => {
        if (!startAfter && !endBefore) {
            setIsFirstPage(true);
            setIsLastPage(false);
            if (!blogArticlesFromSnapshot.isMore) {
                setIsLastPage(true);
            }
        } else {
            if (startAfter) {
                setIsFirstPage(false);
            }
            if (endBefore) {
                setIsLastPage(false);
            }
            if (!blogArticlesFromSnapshot.isMore && startAfter) {
                setIsLastPage(true);
            }
            if (!blogArticlesFromSnapshot.isMore && endBefore) {
                setIsFirstPage(true);
            }
        }
    };

    const paginationQuery = (paginationDirection: string) => {
        if (!blogArticles) return;
        const startAfter = paginationDirection === 'next' ? blogArticles.lastSnap : undefined;
        const endBefore = paginationDirection === 'prev' ? blogArticles.firstSnap : undefined;
        addArticlesToState(currentCategory, startAfter, endBefore);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.headerBar}>{t('blog-main-page.headerBar')}</div>
            <BlogMainHeader />

            <DropDownMenu setCategory={setCurrentCategory} />

            <CategoryTabs setCategory={setCurrentCategory} />

            <div className={classes.gridBackground}>
                {blogArticles && (
                    <Grid container justify="space-around" spacing={6} className={classes.gridContainer}>
                        {blogArticles.articleList.map(article => (
                            <Grid className={classes.grid} key={article.id} item xs={4} zeroMinWidth>
                                <BlogArticleCard
                                    title={article.title}
                                    image={article.pictureUrl}
                                    description={article.description}
                                    link={`/parent/article/${article.id}`}
                                    category={article.category[0] as ArticleCategories}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Pagination isFirst={isFirstPage} isLast={isLastPage} handleChange={paginationQuery} />
            </div>
        </ThemeProvider>
    );
};

const useStyles = makeStyles({
    headerBar: {
        backgroundColor: mainColor,
        borderRadius: '0 0 8px 8px',
        fontWeight: 'bold',
        padding: '10px',
        color: white,
        fontSize: '21px',
        top: '50px',
        left: 0,
        width: '100vw',
        position: 'absolute',
        textTransform: 'uppercase',

        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    gridContainer: {
        maxWidth: '92%',
        margin: '0 4%',

        [theme.breakpoints.down('sm')]: {
            fontSize: 150,
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '18px',
        },
    },
    gridBackground: {
        backgroundColor: white,
        borderRadius: '20px',
    },
    grid: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 'fit-content',
        },
    },
});
