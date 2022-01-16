import {
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Typography,
    makeStyles,
    Theme,
    Chip,
    CardActions,
    IconButton,
    Tooltip,
    Box,
} from '@material-ui/core';
import { Create, Delete, Public, Visibility } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Article } from '@app/graphql/types';
import { openQuestionDialog } from '../QuestionDialog';
import { useUpdateArticle } from '../../operations/mutations/Articles/updateArticle';
import { useArticles } from '../../operations/queries/Articles/getArticles';

interface BlogArticleCardProps {
    article: Article;
    readOnly?: boolean;
}

export const BlogArticleCard = (props: BlogArticleCardProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { updateArticle } = useUpdateArticle();
    const { refetch } = useArticles(1);

    return (
        <Card classes={{ root: classes.card }}>
            <CardActionArea href={`/parent/article/${props.article._id}`}>
                <CardMedia
                    component="img"
                    alt={props.article.title}
                    image={props.article.pictureUrl}
                    title={props.article.title}
                    classes={{ root: classes.cardImage }}
                />
                <CardContent className={classes.cardContent}>
                    <div className={classes.tagContainer}>
                        <Chip color="secondary" size="small" label={t(`single-article.${props.article.category}`)} />
                    </div>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.article.title}
                    </Typography>
                    <Typography className={classes.cardDescription} variant="body2" color="textSecondary" component="p">
                        {props.article.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {!props.readOnly && (
                <CardActions classes={{ root: classes.cardActions }}>
                    <Box ml={1}>
                        <Tooltip title={<>{t('admin-article-list.card.views')}</>}>
                            <span className={classes.views}>
                                <Visibility />
                                &nbsp;
                                {props.article.views}
                            </span>
                        </Tooltip>
                    </Box>
                    <span>
                        <Tooltip title={<>{t('admin-article-list.card.edit')}</>}>
                            <IconButton href={`/admin/article/${props.article._id}/edit`}>
                                <Create />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={getPublishUnpublishTitle()}>
                            <IconButton onClick={onPublishOrHideArticleClick}>
                                <Public color={props.article.isPublished ? 'secondary' : 'inherit'} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<>{t('admin-article-list.card.delete')}</>}>
                            <IconButton onClick={onDeletedArticleClick}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </span>
                </CardActions>
            )}
        </Card>
    );

    function getPublishUnpublishTitle() {
        return props.article.isPublished
            ? t('admin-article-list.card.unpublish')
            : t('admin-article-list.card.publish');
    }

    function onDeletedArticleClick() {
        openQuestionDialog({
            title: t('admin-article-list.card.delete-article-dialog.title', { title: props.article.title }),
            primaryButtonLabel: t('question-dialog.delete'),
        }).then((response) => {
            if (response.close || !response.decision?.accepted) return;

            updateArticle({ ...props.article, isDeleted: true }).then(refetch);
        });
    }

    function onPublishOrHideArticleClick() {
        openQuestionDialog({
            title: getPublishOrHideArticleTitle(),
            primaryButtonLabel: getPublishOrHideArticleButtonName(),
        }).then((response) => {
            if (response.close || !response.decision?.accepted) return;

            updateArticle({ ...props.article, isPublished: !props.article.isPublished }).then(refetch);
        });
    }

    function getPublishOrHideArticleTitle() {
        return t(
            props.article.isPublished
                ? 'admin-article-list.card.hide-article-dialog.title'
                : 'admin-article-list.card.publish-article-dialog.title',
            { title: props.article.title },
        );
    }

    function getPublishOrHideArticleButtonName() {
        return t(props.article.isPublished ? 'question-dialog.hide' : 'question-dialog.publish');
    }
};

const useStyles = makeStyles((theme: Theme) => ({
    tagContainer: {
        marginBottom: theme.spacing(1),
        textTransform: 'capitalize',
    },
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
    cardActions: {
        justifyContent: 'space-between',
        display: 'flex',
    },
    views: {
        display: 'flex',
        alignItems: 'center',
    },
}));
