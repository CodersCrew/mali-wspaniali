import { makeStyles, createStyles, Grid, Typography, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { ArticlePreviousContentHtml } from './ArticlePreviousContentHtml';
import { articleContent, isDisabledArticleClassVisible } from './utils';

export const isArticlePreviewVisible = (isPreView: boolean, componentProperty: any) => {
    if (componentProperty || (!componentProperty && !isPreView)) return false;

    return true;
};

type ArticleContentProps = {
    contentHTML: string;
    title: string;
    description: string;
    isPreview: boolean;
};

export const ArticleContent = ({ title, description, contentHTML, isPreview }: ArticleContentProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const parseHtml = /(<([^>]+)>)/gi;

    return (
        <Grid container direction="column">
            <Typography
                className={clsx({
                    [classes.disabled]: isDisabledArticleClassVisible(isPreview, title),
                })}
                variant="h2"
            >
                {articleContent(isPreview, title, t('admin-articles.previewView.title'))}
            </Typography>
            <Typography
                className={clsx({
                    [classes.description]: true,
                    [classes.disabled]: isDisabledArticleClassVisible(isPreview, description),
                })}
                variant="h3"
            >
                {articleContent(isPreview, description, t('admin-articles.previewView.description'))}
            </Typography>
            <Grid item>
                {contentHTML ? (
                    <Typography variant="h3">{contentHTML.replace(parseHtml, '')}</Typography>
                ) : (
                    <div className={classes.disabled}>
                        <ArticlePreviousContentHtml />
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        description: {
            margin: theme.spacing(2, 0, 4),
        },
        disabled: {
            color: theme.palette.text.disabled,
        },
    }),
);
