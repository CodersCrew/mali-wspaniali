import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { MeasurementType } from '@app/pages/TestResultsPage/TestToggleButton';
import { useAssessments } from '@app/operations/queries/Assessment/getAllAssessments';
import { activePage } from '@app/apollo_client';
import { ButtonSecondary } from '@app/components/Button';
import { openSnackbar } from '@app/components/Snackbar/openSnackbar';
import { openQuestionDialog } from '@app/components/QuestionDialog';
import { PageContainer } from '@app/components/PageContainer';

import { BasicInformationForm } from './BasicInformationForm/BasicInformationForm';
import { KindergartenPicker } from './KindergartenPicker';
import { useAssessmentManager, SuccessState, ErrorState } from './useAssessmentManager';
import { ActionButton } from './ActionButton';
import { EditableBasicInformationForm } from './EditableBasicInformationForm';
import { KindergartenList } from './KindergartenList';

export default function AdminManageSingleAssessmentPage() {
    const { t } = useTranslation();
    const history = useHistory();
    const params = useParams<{ id?: string }>();

    const assessmentId = params.id;

    const isEditOnly = isState('edit');
    const isViewOnly = isState('details');

    const { assessments } = useAssessments();

    const { submit, kindergartens, reasonForBeingDisabled, assessment, updateAssessment, isLoading } =
        useAssessmentManager(assessmentId, onAssessmentSubmitted);

    const handleViewTestDetailsClick = (measurementType: MeasurementType) => {
        if (assessmentId && measurementType) {
            history.push(`/admin/${assessmentId}/${measurementType}`, { assessment: assessments });
        }
    };

    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    return (
        <PageContainer>
            <Grid
                container
                direction="column"
                alignItems="flex-end"
                spacing={6}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item sm={12}>
                                    {isViewOnly ? (
                                        <BasicInformationForm
                                            assessment={assessment}
                                            onClick={handleViewTestDetailsClick}
                                        />
                                    ) : (
                                        <EditableBasicInformationForm
                                            isDisabled={isViewOnly}
                                            assessment={assessment}
                                            onChange={updateAssessment}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={5}>
                            {isViewOnly ? (
                                <KindergartenList kindergartens={kindergartens} />
                            ) : (
                                <KindergartenPicker
                                    isDisabled={isViewOnly}
                                    kindergartens={kindergartens}
                                    onSelect={onPickerClick}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex', alignItems: 'flex-end' }}>
                    {!isViewOnly && (
                        <Grid container justifyContent="space-between">
                            <Grid item xs={6}>
                                {
                                    <ButtonSecondary
                                        variant="text"
                                        onClick={() => {
                                            // eslint-disable-next-line no-void
                                            void openQuestionDialog({
                                                title: t('add-test-view.delete-test-dialog.title'),
                                                description: t('add-test-view.delete-test-dialog.description'),
                                                primaryButtonLabel: t('question-dialog.delete'),
                                            }).then(({ decision }) => {
                                                if (decision?.accepted) {
                                                    submit({ isDeleted: true });
                                                }
                                            });
                                        }}
                                    >
                                        <DeleteIcon />
                                        &nbsp;{t('add-test-view.delete')}
                                    </ButtonSecondary>
                                }
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container justifyContent="flex-end" spacing={2}>
                                    <Grid container justifyContent="flex-end" spacing={3}>
                                        <Grid item>
                                            <ButtonSecondary variant="text" onClick={redirectIntoTestPage}>
                                                {t('add-test-view.cancel')}
                                            </ButtonSecondary>
                                        </Grid>

                                        <Grid item>
                                            <ActionButton
                                                name={
                                                    isEditOnly
                                                        ? t('add-test-view.update-test')
                                                        : t('add-test-view.create-test')
                                                }
                                                onClick={() => submit()}
                                                reasonForBeingDisabled={
                                                    reasonForBeingDisabled || (isLoading && 'loading')
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </PageContainer>
    );

    function onAssessmentSubmitted(result: SuccessState | ErrorState) {
        if ('errors' in result) {
            // eslint-disable-next-line no-void
            void openSnackbar({ text: t(result.errors), severity: 'error' });
        } else {
            // eslint-disable-next-line no-void
            void openSnackbar({ text: result.message! });
            redirectIntoTestPage();
        }
    }

    function redirectIntoTestPage() {
        history.push('/admin/test-management');
    }

    function onPickerClick(value: string[], options: { selectedAll?: boolean } = {}) {
        const kindergartensCopy = [...assessment.kindergartenIds];

        if (options.selectedAll) {
            updateAssessment({ kindergartenIds: value });

            return;
        }

        if (assessment.kindergartenIds.includes(value[0])) {
            updateAssessment({ kindergartenIds: kindergartensCopy.filter((id) => id !== value[0]) });

            return;
        }

        updateAssessment({ kindergartenIds: [...kindergartensCopy, ...value] });
    }

    function isState(name: string) {
        return history.location.pathname.includes(`/${name}`);
    }
}
