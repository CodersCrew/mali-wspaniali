import React from 'react';
import { Card, CardMedia, CardContent, Typography, makeStyles, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';
import { darkGrey } from '../../colors';
import { BlogArticleCardProps } from './types';
import { ArticleBadge } from './ArticleBadge';

export const BlogArticleCard = (props: BlogArticleCardProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { image, title, description, link, category } = props;

    return (
        <Card className={classes.card} elevation={0}>
            <CardMedia
                component="img"
                alt={title}
                image={image}
                title={title}
                className={classes.cardIamge}
            />
            <ArticleBadge articleCategory={category} />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" className={classes.articleTitle}>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            {/* <div className={classes.buttonContainer}> */}
            <Button
                href={link}
                variant="contained"
                color="secondary"
                startIcon={<SendIcon />}
                className={classes.readMoreButton}
                disableElevation
            >
                {t('blog-article-card.read-more')}
            </Button>
            {/* </div> */}
        </Card>
    );
};

const useStyles = makeStyles({
    card: {
        width: '100%',
        height: '400px',
        overflow: 'visible',
        backgroundColor: darkGrey,
        borderRadius: '4px',
        marginTop: '20%',
    },
    cardIamge: {
        width: '100%',
        maxHeight: '200px',
        padding: '0 16px',
        position: 'relative',
        bottom: '30px'
    },
    cardContent: {
        position: 'relative',
        bottom: '20px',
        paddingBottom: 0,
        height: '120px',
    },
    articleTitle: {
        position: 'relative',
        bottom: '10px',
        fontSize: '15px',
        fontWeight: 'bold'
    },
    // buttonContainer: {
    //     display: 'flex',
    //     justifyContent: 'flex-end',
    //     margin: '5%'
    // },
    readMoreButton: {
        color: 'white',
        fontSize: '13px',
        whiteSpace: 'nowrap',
        borderRadius: '4px',
        marginLeft: '50%'
    }
});