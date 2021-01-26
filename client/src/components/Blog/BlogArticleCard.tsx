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
            <CardActionArea href={link} className={classes.actionArea}>
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
        height: '40vh',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
        [theme.breakpoints.down('xs')]: {
            height: '60vh',
            width: '90vw',
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.only('sm')]: {
            height: '50vh',
            width: '44vw',
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.only('md')]: {
            height: '62vh',
            width: '28vw',
            marginBottom: theme.spacing(2),
        },
    },
    actionArea: {
        height: '100%',
    },
    cardImage: {
        height: '45%',
    },
    cardContent: {
        height: '50%',
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
