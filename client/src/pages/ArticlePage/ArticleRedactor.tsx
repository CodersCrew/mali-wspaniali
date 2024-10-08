import { makeStyles, createStyles, Grid, Avatar, Typography, Box, Theme, Divider } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useIsDevice } from '../../queries/useBreakpoints';
import { articleStore } from '../AdminUpdateArticlePage/ArticleCreator/ArticleCreatorStore';

export const ArticleRedactor = observer(() => {
    const classes = useStyles();
    const { isDesktop } = useIsDevice();
    const { article } = articleStore;

    if (!article || (!article.redactor.firstName && !article.redactor.lastName)) return null;

    const { redactor } = article;

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Box mb={3}>
                    <Divider />
                </Box>
            </Grid>
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
                    alt={`${redactor.firstName} ${redactor.lastName}`}
                    src={redactor.avatarUrl}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container direction="column">
                    <Grid item xs={3} md={9}>
                        <Typography className={classes.contentRedactorProf} variant="overline">
                            {redactor.profession}
                        </Typography>
                        <Typography
                            className={classes.contentRedactorName}
                            variant="h4"
                        >{`${redactor.firstName} ${redactor.lastName}`}</Typography>
                    </Grid>
                    <Grid>
                        <Box className={classes.contentRedactorDescriptionBox}>
                            <Typography className={classes.contentRedactorDescription} variant="body1">
                                {redactor.biography}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

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
    }),
);
