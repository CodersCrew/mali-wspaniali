import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { useTranslation } from 'react-i18next';

import { Article } from '../../../graphql/types';
import { BlogArticleCard } from '../../../components/Blog/BlogArticleCard';
import { getChunks } from '../../../utils/chunkArray';
import { useIsDevice } from '../../../queries/useBreakpoints';

interface Props {
    articles: Article[];
}

export const HomePageArticles = ({ articles }: Props) => {
    const classes = useStyles();
    const { isMobile } = useIsDevice();
    const { t } = useTranslation();

    const renderArticles = (articlesArray: Article[]) => {
        return articlesArray.map((article) => {
            return (
                <Grid item key={article._id} xs={isMobile ? 12 : 4}>
                    <BlogArticleCard
                        title={article.title}
                        pictureUrl={article.pictureUrl}
                        description={article.description}
                        link={`/parent/article/${article._id}`}
                        category={article.category}
                    />
                </Grid>
            );
        });
    };

    const grouped = getChunks([...articles], 3);

    return (
        <>
            <Typography variant="h3" className={classes.articleHeader}>
                {t('home-page-content.recent-news')}
            </Typography>
            {articles.length > 4 ? (
                <Carousel autoPlay={false} animation="slide" timeout={300}>
                    {grouped.map((articlesArray, groupIndex) => (
                        <Grid container direction={isMobile ? 'column' : 'row'} spacing={3} key={groupIndex}>
                            {renderArticles(articlesArray)}
                        </Grid>
                    ))}
                </Carousel>
            ) : (
                <Grid container direction="row" spacing={3}>
                    {renderArticles(articles)}
                </Grid>
            )}
        </>
    );
};

const useStyles = makeStyles({
    articleHeader: {
        textTransform: 'uppercase',
    },
});
