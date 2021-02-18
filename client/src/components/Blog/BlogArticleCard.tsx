import React from 'react';
import { Card, CardMedia, CardContent, Typography, makeStyles, Theme } from '@material-ui/core';

interface Props {
    pictureUrl: string;
    title: string;
    description: string;
    link: string;
}

export const BlogArticleCard = ({ pictureUrl, title, description, link }: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={0}>
            <CardMedia component="img" alt={title} image={pictureUrl} title={title} className={classes.cardImage} />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="subtitle1" className={classes.articleTitle}>
                    {title}
                </Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        position: 'relative',
        height: '312px',
        maxWidth: '330px',
        overflow: 'hidden',
        backgroundColor: theme.palette.grey[300],
        marginTop: '20%',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
    },
    cardImage: {
        maxHeight: '200px',
        padding: '0 16px',
        position: 'relative',
        bottom: '30px',
    },
    cardContent: {
        padding: `0 ${theme.spacing(2)}px`,
        height: '125px',
        wordBreak: 'break-word',
    },
    articleTitle: {
        marginBottom: theme.spacing(1),
    },
    readMoreButton: {
        fontSize: '13px',
        position: 'absolute',
        right: '16px',
        bottom: '16px',
        marginTop: '10px',
    },
}));
