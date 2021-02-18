import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, makeStyles, Theme } from '@material-ui/core';
import { ButtonSecondary } from '../Button/ButtonSecondary';
import { ArticleCategory } from '../../graphql/types';

interface Props {
    pictureUrl: string;
    title: string;
    description: string;
    link: string;
    category?: ArticleCategory;
}

export const BlogArticleCard = ({ pictureUrl, title, description, link, category }: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={0}>
            <NavLink to={link}>
                <CardMedia component="img" alt={title} image={pictureUrl} title={title} className={classes.cardImage} />
            </NavLink>
            <div className={classes.articleBadgeContainer}>
                <ButtonSecondary
                    variant="contained"
                    disableElevation
                    innerText={category}
                    className={classes.articleBadge}
                />
            </div>

            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="subtitle1" className={classes.articleTitle}>
                    {title}
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                    {description}
                </Typography>
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
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column wrap',
        marginBottom: theme.spacing(3),
    },
    cardImage: {
        maxHeight: '140px',
        marginBottom: theme.spacing(2),
    },
    cardContent: {
        padding: `0 ${theme.spacing(2)}px`,
        height: '125px',
        wordBreak: 'break-word',
    },
    articleBadgeContainer: {
        width: '100%',
    },
    articleBadge: {
        borderRadius: theme.spacing(2),
        height: '21.76px',
        padding: `3px ${theme.spacing(1)}px`,
        marginBottom: theme.spacing(1),
        textTransform: 'capitalize',
        cursor: 'default',
        marginLeft: theme.spacing(2),
    },
    articleTitle: {
        marginBottom: theme.spacing(1),
    },
    cardDescription: {
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'clip',
        height: '4vw',
    },
}));
