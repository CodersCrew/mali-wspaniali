import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Typography, makeStyles, Theme } from '@material-ui/core';

interface Props {
    pictureUrl: string;
    title: string;
    description: string;
    link: string;
}

export const BlogArticleCard = ({ pictureUrl, title, description, link }: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea href={link} >
                <CardMedia component="img" alt={title} image={pictureUrl} title={title} className={classes.cardImage} />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography className={classes.cardDescription} variant="body2" color="textSecondary" component="p">
                    {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        minHeight: '100%',
    },
    cardImage: {
        height: 140,
    },
    cardContent: {
        wordBreak: 'break-word',
        overflow: 'hidden',
    },
    cardDescription: {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 4,
        '-webkit-box-orient': 'vertical',
    },
}));