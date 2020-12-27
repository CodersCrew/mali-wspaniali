import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import NoResultImg from '../../assets/family.png';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';

interface Props {
    onClick: () => void;
}

export function NoAssessmentView({ onClick }: Props) {
    const { t } = useTranslation();

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Box display="flex" justifyContent="center">
                    <Box width="75%">
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Box display="flex" justifyContent="center">
                                    <img alt="family" src={NoResultImg} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display="flex" flexDirection="column" justifyContent="center">
                                    <Box mb={3}>
                                        <Typography variant="h4" align="center">
                                            {t('add-results-page.no-assessments.title')}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" align="center">
                                        {t('add-results-page.no-assessments.description')}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display="flex" justifyContent="center">
                                    <ButtonSecondary variant="contained" onClick={onClick}>
                                        {t('add-results-page.no-assessments.go-to-articles')}
                                    </ButtonSecondary>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
