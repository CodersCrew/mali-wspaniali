import { useEffect, useState } from 'react';
import { Box, createStyles, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Theme } from '../../theme';
import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';
import { useLastArticles } from '../../operations/queries/Articles/getLastArticles';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useAddChild } from '../../operations/mutations/User/addChild';
import { PageContainer } from '../../components/PageContainer';
import { useIsDevice } from '../../queries/useBreakpoints';

import { Footer } from './HomePageFooter/Footer';
import { HomePageArticles } from './HomePageArticles';
import { HomePageChildren } from './HomePageTopSection/HomePageChildren/HomePageChildren';
import { HomePageInfo } from './HomePageTopSection/HomePageInfo';
import { SocialMediaBar } from './SocialMediaBar';

export default function ParentHomePage() {
    const user = useMe();
    const { addChild } = useAddChild();
    const { articles } = useLastArticles(6);
    const { t } = useTranslation();
    const history = useHistory();
    const { isMobile } = useIsDevice();
    const classes = useStyles();
    const [isInfoComponentVisible, setIsInfoComponentVisible] = useState(
        () => localStorage.getItem('infoNote') !== 'closed',
    );

    function toggleInfoComponent() {
        setIsInfoComponentVisible((prev) => !prev);
        localStorage.setItem('infoNote', 'closed');
    }

    const { kindergartenList } = useKindergartens();

    useEffect(() => {
        activePage(['parent-menu.home']);
    }, []);

    if (!user || !kindergartenList) return null;

    return (
        <>
            <PageContainer>
                <Grid className={classes.container}>
                    <Grid item xs={12}>
                        <Typography variant={isMobile ? 'h2' : 'h1'} align={isMobile ? 'center' : 'left'}>
                            {t('home-page-content.greeting')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <p className={classes.description}>
                            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                                <Box width={isMobile ? '100%' : 'fit-content'}>
                                    <Typography
                                        variant={isMobile ? 'subtitle1' : 'h3'}
                                        align={isMobile ? 'center' : 'left'}
                                    >
                                        {t('home-page-content.learn-more')}
                                        <Link
                                            className={classes.link}
                                            href="http://mali-wspaniali.pl/pl/index.html"
                                            target="_blank"
                                        >
                                            {t('home-page-content.mali-wspaniali')}
                                        </Link>
                                    </Typography>
                                </Box>

                                {!isMobile && <SocialMediaBar />}
                            </Box>
                        </p>
                    </Grid>
                    <HomePageChildren
                        childrenList={user.children}
                        handleModalSubmit={addChild}
                        onChildClick={(id) => {
                            history.push(`parent/child/${id}/results`);
                        }}
                    />
                    <div className={classes.infoContainer}>
                        {isInfoComponentVisible && <HomePageInfo toggleInfoComponent={toggleInfoComponent} />}
                    </div>
                    <HomePageArticles articles={articles} />
                </Grid>
            </PageContainer>
            <Footer />
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: '0 0 54px 0',

            [theme.breakpoints.down('md')]: {
                padding: '0 0 5px 0',
            },
        },
        description: {
            margin: '20px 0 40px 0',

            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                margin: '15px 0 20px 0',
            },
        },
        link: {
            color: theme.palette.primary.main,
            fontWeight: 'bold',

            [theme.breakpoints.down('sm')]: {
                textTransform: 'uppercase',
                lineHeight: '18px',
            },
        },
        infoContainer: {
            display: 'flex',
            marginBottom: theme.spacing(5),
            flexWrap: 'wrap',

            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center',
                paddingRight: theme.spacing(0),
                marginBottom: theme.spacing(4),
            },
        },
    }),
);
