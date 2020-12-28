import React, { useEffect } from 'react';
import { createStyles, Grid, makeStyles, Divider, Paper, Theme } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { ChildPicker } from './ChildPicker/ChildPicker';
import { MeasurementEditor } from './MeasurementEditor/MeasurementEditor';
import { activePage } from '../../apollo_client';
import { ChildHeader } from './MeasurementEditor/ChildHeader';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';
import { PageContainer } from '../../components/PageContainer';

export function InstructorResultCreatorPage() {
    const { assessments } = useAssessments({ withChildren: true });
    const params = useParams() as { [index: string]: string };
    const history = useHistory();
    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        activePage(['instructor-menu.add-results']);
    }, []);

    const selectedAssessment = assessments.find((a) => a._id === params.assessmentId);
    const selectedKindergarten = selectedAssessment?.kindergartens.find(
        (k) => k.kindergarten._id === params.kindergartenId,
    )?.kindergarten;
    const selectedChild = selectedKindergarten?.children?.find((c) => c._id === params.childId);

    if (!selectedAssessment || !selectedKindergarten || !selectedChild) {
        return null;
    }

    return (
        <PageContainer>
            <Paper>
                <Grid container>
                    <Grid item xs={4}>
                        <ChildPicker
                            selectedKindergarten={selectedKindergarten._id || ''}
                            kindergartens={selectedAssessment.kindergartens.map((k) => k.kindergarten) || []}
                            selected={selectedChild._id}
                            measurement={params.measurement}
                            childList={selectedKindergarten.children || []}
                            onClick={(type, value) => {
                                if (type === 'child') {
                                    history.push(
                                        `/instructor/result/add/${params.measurement}/${selectedAssessment._id}/${selectedKindergarten._id}/${value}`,
                                    );
                                }

                                if (type === 'measurement') {
                                    history.push(
                                        `/instructor/result/add/${value}/${params.assessmentId}/${params.kindergartenId}/${params.childId}`,
                                    );
                                }

                                if (type === 'kindergarten') {
                                    const currentSelectedKindergarten = selectedAssessment?.kindergartens.find(
                                        (k) => k.kindergarten._id === value,
                                    )?.kindergarten;
                                    const firstChildren = currentSelectedKindergarten?.children![0];

                                    if (firstChildren) {
                                        history.push(
                                            `/instructor/result/add/${params.measurement}/${selectedAssessment._id}/${value}/${firstChildren._id}`,
                                        );
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction="column">
                            <Grid item>
                                <ChildHeader
                                    description={t(`add-result-page.title-${params.measurement}-measurement`)}
                                    selectedChild={selectedChild}
                                />
                            </Grid>
                            <Grid item>
                                <Divider />
                            </Grid>
                            <Grid item className={classes.editor}>
                                <MeasurementEditor />
                            </Grid>
                            <Grid item>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <ButtonSecondary variant="text">
                                            {t(`add-result-page.back-to-table`)}
                                        </ButtonSecondary>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </PageContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        editor: {
            maxHeight: '63vh',
            overflowY: 'auto',
        },
    }),
);
