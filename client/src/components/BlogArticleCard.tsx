import React from 'react';
import { Card, CardMedia, CardContent, Typography, makeStyles, Theme } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';
import { ArticleCategory } from '../graphql/types';
import { ArticleBadge } from '../pages/BlogMainPage/ArticleBadge';
import { ButtonSecondary } from './Button';

interface Props {
    pictureUrl: string;
    title: string;
    description: string;
    link: string;
    category: ArticleCategory;
}

export const BlogArticleCard = ({ pictureUrl, title, description, link, category }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Card className={classes.card} elevation={0}>
            <CardMedia component="img" alt={title} image={pictureUrl} title={title} className={classes.cardImage} />
            <ArticleBadge articleCategory={category} />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="subtitle1" className={classes.articleTitle}>
                    {title}
                </Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <ButtonSecondary
                href={link}
                variant="contained"
                startIcon={<SendIcon />}
                className={classes.readMoreButton}
                disableElevation
                innerText={t('blog-article-card.read-more')}
            />
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'visible',
        backgroundColor: theme.palette.grey[300],
        marginTop: '20%',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
    },
    cardImage: {
        width: '100%',
        maxHeight: '200px',
        padding: '0 16px',
        position: 'relative',
        bottom: '30px',
    },
    cardContent: {
        position: 'relative',
        bottom: '20px',
        paddingBottom: 0,
        height: '120px',
        wordBreak: 'break-word',
    },
    articleTitle: {
        position: 'relative',
        bottom: '10px',
    },
    readMoreButton: {
        fontSize: '13px',
        position: 'absolute',
        right: '16px',
        bottom: '16px',
        marginTop: '10px',
    },
}));
