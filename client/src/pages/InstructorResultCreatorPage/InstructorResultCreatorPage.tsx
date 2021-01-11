import React, { useEffect } from 'react';
import { createStyles, Grid, makeStyles, Divider, Paper, Typography } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChildPicker } from './ChildPicker/ChildPicker';
import { MeasurementEditor } from './MeasurementEditor/MeasurementEditor';
import { activePage } from '../../apollo_client';
import { ChildHeader } from './MeasurementEditor/ChildHeader';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';
import { PageContainer } from '../../components/PageContainer';
import { ResultCreatorErrorReturnProps, ResultCreatorReturnProps, useResultCreator } from './useResultCreator';
import { ChildPickerDrawer } from './ChildPicker/ChildPickerDrawer';
import { useIsDevice } from '../../queries/useBreakpoints';

interface PageParams {
    assessmentId: string;
    kindergartenId: string;
    childId: string;
    measurement: string;
}

export default function InstructorResultCreatorPage() {
    const { assessmentId, kindergartenId, childId, measurement } = useParams<PageParams>();

    const history = useHistory();
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useIsDevice();

    useEffect(() => {
        activePage(['instructor-menu.add-results']);
    }, []);

    const resultCreator = useResultCreator({
        assessmentId,
        kindergartenId,
        childId,
        measurement,
    });

    if (isResultCreatorErrorReturnProps(resultCreator)) {
        return null;
    }

    function onChildClicked(type: string, value: string) {
        if (isResultCreatorErrorReturnProps(resultCreator)) {
            return;
        }

        if (type === 'child') {
            history.push(
                `/instructor/result/add/${measurement}/${resultCreator.selectedAssessment._id}/${resultCreator.selectedKindergarten._id}/${value}`,
            );
        }

        if (type === 'measurement') {
            history.push(`/instructor/result/add/${value}/${assessmentId}/${kindergartenId}/${childId}`);
        }

        if (type === 'kindergarten') {
            const currentSelectedKindergarten = resultCreator.selectedAssessment?.kindergartens.find(
                (k) => k.kindergarten._id === value,
            )?.kindergarten;
            const firstChildren = currentSelectedKindergarten?.children![0];

            if (firstChildren) {
                history.push(
                    `/instructor/result/add/${measurement}/${resultCreator.selectedAssessment._id}/${value}/${firstChildren._id}`,
                );
            }
        }
    }

    return (
        <>
            <PageContainer>
                {device.isSmallMobile && (
                    <ChildPickerDrawer
                        selectedKindergarten={resultCreator.selectedKindergarten._id || ''}
                        kindergartens={resultCreator.selectedAssessment.kindergartens.map((k) => k.kindergarten) || []}
                        selected={resultCreator.selectedChild._id}
                        measurement={measurement}
                        childList={resultCreator.selectedKindergarten.children || []}
                        onClick={onChildClicked}
                    />
                )}
                <Paper>
                    {!device.isSmallMobile ? (
                        <Grid container>
                            <Grid item xs={4}>
                                <ChildPicker
                                    header={<Typography variant="h4">{t('add-result-page.kindergarten')}</Typography>}
                                    selectedKindergarten={resultCreator.selectedKindergarten._id || ''}
                                    kindergartens={
                                        resultCreator.selectedAssessment.kindergartens.map((k) => k.kindergarten) || []
                                    }
                                    selected={resultCreator.selectedChild._id}
                                    measurement={measurement}
                                    childList={resultCreator.selectedKindergarten.children || []}
                                    onClick={onChildClicked}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <ChildHeader
                                            description={t(`add-result-page.title-${measurement}-measurement`)}
                                            selectedChild={resultCreator.selectedChild}
                                            points={Object.values(resultCreator.points).reduce((acc, v) => acc + v, 0)}
                                            maxPoints={Object.values(
                                                resultCreator.selectedChild!.currentParams!,
                                            ).reduce((acc, v) => {
                                                if (!v || !v.lowerLimitPoints || !v.upperLimitPoints) return acc;

                                                if (v.lowerLimitPoints > v.upperLimitPoints) {
                                                    return acc + v.lowerLimitPoints;
                                                }

                                                return acc + v.upperLimitPoints;
                                            }, 0)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Divider />
                                    </Grid>
                                    <Grid item className={classes.editor}>
                                        <MeasurementEditor
                                            child={resultCreator.selectedChild}
                                            values={resultCreator.values}
                                            points={resultCreator.points}
                                            edited={resultCreator.edited}
                                            onChange={resultCreator.onChange}
                                            onEditClick={resultCreator.edit}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Divider />
                                    </Grid>
                                    <Grid item>
                                        <Grid container justify="flex-end">
                                            <Grid item>
                                                <ButtonSecondary variant="text">
                                                    {t('add-result-page.back-to-table')}
                                                </ButtonSecondary>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container direction="column">
                            <Grid item>
                                <ChildHeader
                                    description={t(`add-result-page.title-${measurement}-measurement`)}
                                    selectedChild={resultCreator.selectedChild}
                                    points={Object.values(resultCreator.points).reduce((acc, v) => acc + v, 0)}
                                    maxPoints={Object.values(resultCreator.selectedChild!.currentParams!).reduce(
                                        (acc, v) => {
                                            if (!v || !v.lowerLimitPoints || !v.upperLimitPoints) return acc;

                                            if (v.lowerLimitPoints > v.upperLimitPoints) {
                                                return acc + v.lowerLimitPoints;
                                            }

                                            return acc + v.upperLimitPoints;
                                        },
                                        0,
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Divider />
                            </Grid>
                            <Grid item className={classes.editor}>
                                <MeasurementEditor
                                    child={resultCreator.selectedChild}
                                    values={resultCreator.values}
                                    points={resultCreator.points}
                                    edited={resultCreator.edited}
                                    onChange={resultCreator.onChange}
                                    onEditClick={resultCreator.edit}
                                />
                            </Grid>
                            <Grid item>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <ButtonSecondary variant="text">
                                            {t('add-result-page.back-to-table')}
                                        </ButtonSecondary>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </PageContainer>
        </>
    );
}

const useStyles = makeStyles(() =>
    createStyles({
        editor: {
            maxHeight: '63vh',
            overflowY: 'auto',
        },
    }),
);

function isResultCreatorErrorReturnProps(
    value: ResultCreatorReturnProps | ResultCreatorErrorReturnProps,
): value is ResultCreatorErrorReturnProps {
    return !!value.error;
}
