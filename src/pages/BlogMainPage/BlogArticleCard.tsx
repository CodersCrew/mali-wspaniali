import React from 'react';
import { Card, CardMedia, CardContent, Typography, makeStyles, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { darkGrey } from '../../colors';

type BlogArticleCardProps = {
    image: string,
    title: string,
    description: string,
    link: string
}

export const BlogArticleCard = (props: BlogArticleCardProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { image, title, description, link } = props;

    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.card} elevation={0}>
                <CardMedia
                    component="img"
                    alt={title}
                    image={image}
                    title={title}
                    className={classes.cardIamge}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.articleTitle}>
                        {title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {description}
                    </Typography>
                </CardContent>
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
            </Card>
        </ThemeProvider>
    );
};

const useStyles = makeStyles({
    card: {
        width: '100%',
        height: '83%',
        overflow: 'visible',
        backgroundColor: darkGrey,
        borderRadius: '4px',
        marginTop: '20%'
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
        paddingBottom: 0
    },
    articleTitle: {
        position: 'relative',
        bottom: '10px',
        fontSize: '15px',
        fontWeight: 'bold'
    },
    readMoreButton: {
        color: 'white',
        fontSize: '13px',
        marginBottom: '5%',
        whiteSpace: 'nowrap',
        float: 'right',
        marginRight: '10%'
    }
});