import { Card, CardMedia, CardContent, Typography, makeStyles, Theme } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../Button/ButtonSecondary';
import { ArticleCategory } from '../../graphql/types';

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
            <ButtonSecondary
                variant="contained"
                disableElevation
                innerText={category}
                className={classes.articleBadge}
            />

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
        height: '400px',
        overflow: 'visible',
        backgroundColor: theme.palette.grey[300],
        marginTop: '54px',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
    },
    cardImage: {
        maxHeight: '200px',
        padding: `0 ${theme.spacing(2)}px`,
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
    articleBadge: {
        borderRadius: theme.spacing(2),
        height: '21.76px',
        padding: `3px ${theme.spacing(1)}px`,
        margin: `-18px 0 ${theme.spacing(2)}px 20px`,
        textTransform: 'capitalize',
        cursor: 'default',
    },
    articleTitle: {
        position: 'relative',
        bottom: '10px',
    },
    readMoreButton: {
        fontSize: '13px',
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        marginTop: '10px',
    },
}));
