import React from 'react';
import { Grid } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { activePage } from '../../apollo_client';
import { ButtonSecondary } from '../../components/Button';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { openQuestionDialog } from '../../components/QuestionDialog';
import { PageContainer } from '../../components/PageContainer';

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

    const { submit, kindergartens, reasonForBeingDisabled, assessemnt, updateAssessment, isLoading } =
        useAssessmentManager(assessmentId, onAssessmentSubmited);

    React.useEffect(() => {
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
                                        <BasicInformationForm assessment={assessemnt} onClick={() => null} />
                                    ) : (
                                        <EditableBasicInformationForm
                                            isDisabled={isViewOnly}
                                            assessment={assessemnt}
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
                        <Grid container justify="space-between">
                            <Grid item xs={6}>
                                {
                                    <ButtonSecondary
                                        variant="text"
                                        onClick={() => {
                                            openQuestionDialog({
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
                                <Grid container justify="flex-end" spacing={2}>
                                    <Grid container justify="flex-end" spacing={3}>
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

    function onAssessmentSubmited(result: SuccessState | ErrorState) {
        if ('errors' in result) {
            openSnackbar({ text: t(result.errors), severity: 'error' });
        } else {
            openSnackbar({ text: result.message! });
            redirectIntoTestPage();
        }
    }

    function redirectIntoTestPage() {
        history.push('/admin/test-management');
    }

    function onPickerClick(value: string[], options: { selectedAll?: boolean } = {}) {
        const kindergartensCopy = [...assessemnt.kindergartenIds];

        if (options.selectedAll) {
            updateAssessment({ kindergartenIds: value });

            return;
        }

        if (assessemnt.kindergartenIds.includes(value[0])) {
            updateAssessment({ kindergartenIds: kindergartensCopy.filter((id) => id !== value[0]) });

            return;
        }

        updateAssessment({ kindergartenIds: [...kindergartensCopy, ...value] });
    }

    function isState(name: string) {
        return history.location.pathname.includes(`/${name}`);
    }
}
