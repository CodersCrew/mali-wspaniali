import React from 'react';
import { makeStyles, createStyles, Theme, Typography, Grid } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { useTranslation } from 'react-i18next';

import { textColor } from '../../../colors';
import { Article } from '../../../graphql/types';
import { BlogArticleCard } from '../../../components/Blog/BlogArticleCard';
import { useBreakpoints } from '../../../queries/useBreakpoints';
import { getChunks } from '../../../utils/chunkArray';

interface Props {
    articles: Article[];
}

export const HomePageArticles = ({ articles }: Props) => {
    const classes = useStyles();
    const device = useBreakpoints();
    const { t } = useTranslation();

    const grouped = getChunks([...articles], 3);

    return (
        <>
            <Typography variant="h3" className={classes.articleHeader}>{t('home-page-content.recent-news')}</Typography>
            {device !== 'DESKTOP' && articles.length > 4 ? (
                <Carousel autoPlay={false}>
                    {grouped.map((items, groupIndex) => (
                        <Grid container direction="row" spacing={3} key={groupIndex} className={classes.gridContainer}>
                            {items.map((item) => {
                                return (
                                    <Grid item md={4} sm={6} key={item._id} className={classes.card}>
                                        <BlogArticleCard
                                            title={item.title}
                                            pictureUrl={item.pictureUrl}
                                            description={item.description}
                                            link={`/parent/article/${item._id}`}
                                        />
                                    </Grid>
                                );})}
                        </Grid>
                    ))}</Carousel>
            ) : (
                <Grid container direction="row" spacing={3}>
                    {articles.map(article => {
                        return (
                            <Grid item className={classes.card} key={article._id}>
                                <BlogArticleCard
                                    title={article.title}
                                    pictureUrl={article.pictureUrl}
                                    description={article.description}
                                    link={`/parent/article/${article._id}`}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 305,
        },
        articleHeader: {
            textTransform: 'uppercase',
            color: textColor,
            margin: theme.spacing(2.5, 0),

            [theme.breakpoints.down('sm')]: {
                margin: theme.spacing(0),
            },
        },
        gridContainer: {
            justifyContent: "center",
        }
    }),
);
