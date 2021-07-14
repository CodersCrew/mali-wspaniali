import { createStyles, makeStyles, Theme, Grid, Box, Typography } from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import NoResultsImage from '../../assets/testInformation/Results/no-data.svg';

export function ResultEmptyView({ childId }: { childId: string }) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2} mb={4}>
                    <Typography variant="h3">{t('child-profile.results-empty-view.title')}</Typography>
                </Box>
            </Grid>
            <Box mx={5.5}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            {t('child-profile.results-empty-view.empty-results-reason')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box mt={2} mx={2} mb={4}>
                            <Typography variant="body1" gutterBottom>
                                {t('child-profile.results-empty-view.reason-1')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('child-profile.results-empty-view.reason-2')}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {t('child-profile.results-empty-view.reason-3')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                            <Box mb={2}>
                                <Typography variant="subtitle1">
                                    <Trans
                                        i18nKey="child-profile.results-empty-view.read-more"
                                        components={{
                                            span: (
                                                <Link
                                                    className={classes.link}
                                                    to={`/parent/child/${childId}/tests-information`}
                                                />
                                            ),
                                        }}
                                    />
                                </Typography>
                            </Box>
                            <img src={NoResultsImage} width={157} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            color: theme.palette.secondary.main,
            textDecoration: 'none',
        },
    }),
);
