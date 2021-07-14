import { makeStyles, createStyles, Grid, Avatar, Typography, Box, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Redactor } from '../../graphql/types';
import { useIsDevice } from '../../queries/useBreakpoints';
import { articleContent, isDisabledArticleClassVisible } from './utils';

interface Props {
    redactor: Redactor;
    isPreview?: boolean;
}

export const ArticleRedactor = ({ redactor, isPreview }: Props) => {
    const classes = useStyles();
    const { isDesktop } = useIsDevice();
    const { t } = useTranslation();

    return (
        <Grid container direction="row">
            <Grid
                classes={{
                    root: clsx({
                        [classes.contentRedactorAvatarContainer]: true,
                        [classes.contentRedactorAvatarContainerMobile]: !isDesktop,
                    }),
                }}
                item
            >
                <Avatar
                    className={clsx({
                        [classes.contentRedactorAvatar]: true,
                        [classes.contentRedactorAvatarMobile]: !isDesktop,
                    })}
                    alt={`${redactor?.firstName} ${redactor?.lastName}`}
                    src={redactor?.avatarUrl}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container direction="column">
                    <Grid item xs={3} md={9}>
                        <Typography
                            className={clsx({
                                [classes.contentRedactorProf]: true,
                                [classes.disabled]: isDisabledArticleClassVisible(isPreview, redactor?.profession),
                            })}
                            variant="overline"
                        >
                            {articleContent(isPreview, redactor?.profession, t('admin-articles.redactor.profession'))}
                        </Typography>
                        <Box className={classes.redactorDataContainer}>
                            <Typography
                                className={clsx({
                                    [classes.contentRedactorFirstName]: true,
                                    [classes.disabled]: isDisabledArticleClassVisible(isPreview, redactor?.firstName),
                                })}
                                variant="h4"
                            >
                                {`${articleContent(
                                    isPreview,
                                    redactor?.firstName,
                                    t('admin-articles.redactor.firstName'),
                                )} `}
                            </Typography>
                            <Typography
                                className={clsx({
                                    [classes.contentRedactorName]: true,
                                    [classes.disabled]: isDisabledArticleClassVisible(isPreview, redactor?.lastName),
                                })}
                                variant="h4"
                            >
                                {articleContent(isPreview, redactor?.lastName, t('admin-articles.redactor.lastName'))}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid>
                        <Box className={classes.contentRedactorDescriptionBox}>
                            <Typography
                                className={clsx({
                                    [classes.contentRedactorName]: true,
                                    [classes.disabled]: isDisabledArticleClassVisible(isPreview, redactor?.biography),
                                })}
                                variant="body1"
                            >
                                {articleContent(isPreview, redactor?.biography, t('admin-articles.redactor.biography'))}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentRedactorAvatarContainer: {
            paddingRight: theme.spacing(3),
        },
        contentRedactorAvatarContainerMobile: {
            paddingRight: theme.spacing(2),
        },
        contentRedactorAvatar: {
            width: 94,
            height: 94,
        },
        contentRedactorAvatarMobile: {
            width: 70,
            height: 70,
        },
        contentRedactorProf: {
            textTransform: 'uppercase',
        },
        redactorDataContainer: {
            display: 'flex',
        },
        contentRedactorName: {
            paddingTop: theme.spacing(1),
            fontWeight: theme.typography.button.fontWeight,
        },
        contentRedactorDescriptionBox: {
            fontWeight: theme.typography.button.fontWeight,
            marginTop: theme.spacing(2),
            padding: 0,
        },
        contentRedactorDescription: {
            fontSize: theme.typography.subtitle1.fontSize,
            padding: 0,
        },
        contentRedactorFirstName: {
            paddingTop: theme.spacing(1),
            fontWeight: theme.typography.button.fontWeight,
            marginRight: theme.spacing(1),
        },
        disabled: {
            color: theme.palette.text.disabled,
        },
    }),
);
