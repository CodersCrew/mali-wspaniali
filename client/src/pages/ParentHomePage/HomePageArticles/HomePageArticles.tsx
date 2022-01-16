import { makeStyles, Typography, Grid, Theme } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { useTranslation } from 'react-i18next';

import { Article } from '@app/graphql/types';
import { BlogArticleCard } from '../../../components/Blog/BlogArticleCard';
import { getChunks } from '../../../utils/chunkArray';
import { useIsDevice } from '../../../queries/useBreakpoints';

interface Props {
    articles: Article[];
}

export const HomePageArticles = ({ articles }: Props) => {
    const classes = useStyles();
    const { isSmallMobile } = useIsDevice();
    const { t } = useTranslation();

    const renderArticles = (articlesArray: Article[]) => {
        return articlesArray.map((article) => {
            return (
                <Grid item key={article._id} xs={12} sm={6} md={4}>
                    <BlogArticleCard article={article} readOnly />
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
                        <Grid
                            container
                            direction={isSmallMobile ? 'column' : 'row'}
                            spacing={3}
                            key={groupIndex}
                            justify="center"
                        >
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

const useStyles = makeStyles((theme: Theme) => ({
    articleHeader: {
        textTransform: 'uppercase',
        marginBottom: theme.spacing(3),
    },
}));
