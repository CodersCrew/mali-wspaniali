import React from 'react';
import { Card,  CardMedia, CardActionArea, CardActions, CardContent, Typography, makeStyles, Theme } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from '../Button';

interface Props {
    pictureUrl: string;
    title: string;
    description: string;
    link: string;
}

export const BlogArticleCard = ({ pictureUrl, title, description, link }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        // <Card className={classes.card} elevation={3}>
        //     <CardMedia component="img" alt={title} image={pictureUrl} title={title} className={classes.cardImage} />
        //     <CardContent className={classes.cardContent}>
        //         <Typography gutterBottom variant="subtitle1" className={classes.articleTitle}>
        //             {title}
        //         </Typography>
        //         <Typography variant="body2">{description}</Typography>
        //     </CardContent>
            // <ButtonSecondary
            //     href={link}
            //     variant="contained"
            //     startIcon={<SendIcon />}
            //     className={classes.readMoreButton}
            //     disableElevation
            //     innerText={t('blog-article-card.read-more')}
            // />
        // </Card>
        <Card className={classes.card}>
            <CardActionArea href={link} className={classes.actionArea}>
                <CardMedia component="img" alt={title} image={pictureUrl} title={title} className={classes.cardImage} />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                <ButtonSecondary
                    href={link}
                    variant="contained"
                    startIcon={<SendIcon />}
                    className={classes.readMoreButton}
                    disableElevation
                    innerText={t('blog-article-card.read-more')}
                />
                </CardActions>
            </CardActionArea>
            {/* <CardActions className={classes.actions}>
                   <ButtonSecondary
                    href={link}
                    variant="contained"
                    startIcon={<SendIcon />}
                    className={classes.readMoreButton}
                    disableElevation
                    innerText={t('blog-article-card.read-more')}
                />
            </CardActions> */}
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        // position: 'relative',
        height: '45vh',
        // backgroundColor: theme.palette.grey[300],
        // marginTop: '10 %',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
    },
    actionArea: {
        height: '100%',
    },
    cardImage: {
        height: '40%',
        // maxHeight: '20vh',
        // padding: '0 16px',
        // position: 'relative',
        // bottom: '20px',
    },
    cardContent: {
        height: '45%',
        // position: 'relative',
        // bottom: '20px',
        // marginTop: theme.spacing(1),
        // paddingBottom: 0,
        // height: '120px',
        wordBreak: 'break-word',
        overflow: 'hidden',
    },
    actions: {
        height: '15%',
    },
    // articleTitle: {
    //     position: 'relative',
    //     bottom: '10px',
    // },
    readMoreButton: {
        fontSize: '13px',
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    // actions: {
    //     backgroundColor: 'blue',
    // },
}));
