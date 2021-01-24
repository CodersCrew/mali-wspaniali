import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import NoResultImg from '../../assets/family.png';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';

interface Props {
    onClick: () => void;
}

export function NoAssessmentView({ onClick }: Props) {
    const { t } = useTranslation();

    return (
        <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item xs={12} md={8}>
                <img alt="family" width="100%" src={NoResultImg} />
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" align="center">
                    {t('add-results-page.no-assessments.title')}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant="body2" align="center">
                    {t('add-results-page.no-assessments.description')}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <ButtonSecondary variant="contained" onClick={onClick}>
                    {t('add-results-page.no-assessments.go-to-articles')}
                </ButtonSecondary>
            </Grid>
        </Grid>
    );
}
