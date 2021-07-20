import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Grid, Theme, CardMedia, Divider } from '@material-ui/core';
import clsx from 'clsx';

import { ArticleContent } from './ArticleContent';
import { ArticleVideo } from './ArticleVideo';
import { ArticleRedactor } from './ArticleRedactor';
import { ArticleNavigationMobile } from '../../pages/ArticleListPage/ArticleNavigationMobile';

import { useIsDevice } from '../../queries/useBreakpoints';
import { ButtonDefault } from '../Button';
import { ReadingTime } from './ReadingTime';
import { TagList } from './TagList';
import { calculateReadingTime } from '../../utils/calculateReadingTime';
import photoHeader from '../../assets/adminPreviewPhoto/headerPhoto.png';
import { Article } from '../../graphql/types';

type ArticleBoxType = {
    article: Article | any;
    previousButtonTitle: string;
    nextButtonTitle: string;
    onClickNextButtonTitle?: () => void;
    onClickPreviousButtonTitle?: () => void;
    isPreview?: boolean;
};

const ArticleBox = ({
    article,
    nextButtonTitle,
    previousButtonTitle,
    onClickNextButtonTitle,
    onClickPreviousButtonTitle,
    isPreview,
}: ArticleBoxType) => {
    const { isMobile, isTablet, isDesktop } = useIsDevice();
    const classes = useStyles();
    const history = useHistory();

    const isVideo = isPreview ? article?.values?.videoUrl : article?.videoUrl;

    function onBackClick() {
        history.goBack();
    }

    return (
        <>
            {isMobile && <ArticleNavigationMobile onClick={onBackClick} />}

            <Grid
                classes={{ root: clsx({ [classes.container]: true, [classes.mobileContainer]: !isDesktop }) }}
                container
                direction="column"
            >
                <CardMedia
                    classes={{ root: classes.imageContainer }}
                    component="img"
                    src={isPreview ? article?.values?.pictureUrl || photoHeader : article?.pictureUrl}
                />
                <Grid item>
                    <div
                        className={clsx({
                            [classes.readingTimeContainerMobile]: true,
                            [classes.readingTimeContainerTablet]: isTablet,
                            [classes.readingTimeContainerDesktop]: isDesktop,
                        })}
                    >
                        <ReadingTime
                            date={
                                isPreview
                                    ? new Date(article?.values?.publishedAt || article?.values?.createdAt)
                                    : article?.publishedAt
                            }
                            readingTime={calculateReadingTime(article?.values?.contentHTML)}
                            isPreview={isPreview}
                        />
                    </div>
                    <ArticleContent
                        title={isPreview ? article?.values?.title : article?.title}
                        description={isPreview ? article?.values?.description : article?.description}
                        contentHTML={isPreview ? article?.values?.contentHTML : article?.contentHTML}
                        isPreview={isPreview}
                    />

                    <Grid item classes={{ root: classes.videoContainer }} xs={12}>
                        {isVideo && (
                            <ArticleVideo videoUrl={isPreview ? article?.values?.videoUrl : article?.videoUrl} />
                        )}
                    </Grid>

                    <Grid item classes={{ root: classes.tagContainer }}>
                        <TagList tags={isPreview ? article?.values?.tags : article?.tags} isPreview={isPreview} />
                    </Grid>
                </Grid>
                <Grid container xs={12}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} classes={{ root: classes.redactorContainer }}>
                        <ArticleRedactor
                            redactor={isPreview ? article?.values?.redactor : article?.redactor}
                            isPreview={isPreview}
                        />
                    </Grid>
                </Grid>
                {isPreview && (
                    <Grid container xs={12} justify="flex-end">
                        <Grid item>
                            <ButtonDefault
                                className={clsx({
                                    [classes.previousButton]: isPreview,
                                })}
                                variant="contained"
                                onClick={onClickPreviousButtonTitle}
                            >
                                {previousButtonTitle}
                            </ButtonDefault>
                        </Grid>
                        <Grid item>
                            <ButtonDefault variant="contained" color="secondary" onClick={onClickNextButtonTitle}>
                                {nextButtonTitle}
                            </ButtonDefault>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        previousButton: {
            marginRight: theme.spacing(1),
        },
        container: {
            padding: theme.spacing(3),
        },
        mobileContainer: {
            padding: theme.spacing(2),
        },
        imageContainer: {
            height: 400,
        },
        readingTimeContainerMobile: {
            margin: theme.spacing(3, 0, 2),
        },
        readingTimeContainerTablet: {
            margin: theme.spacing(4, 0, 2),
        },
        readingTimeContainerDesktop: {
            margin: theme.spacing(5, 0, 2),
        },
        videoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: theme.spacing(4, 0),
        },
        tagContainer: {
            marginBottom: theme.spacing(4),
        },
        redactorContainer: {
            margin: theme.spacing(4, 0),
        },
    }),
);

export default ArticleBox;
