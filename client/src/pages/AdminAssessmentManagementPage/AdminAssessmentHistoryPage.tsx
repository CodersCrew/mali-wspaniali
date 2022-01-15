import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { activePage } from '../../apollo_client';
import { AssessmentHistoryList } from './AssessmentHistoryList/AssessmentHistoryList';
import { ButtonSecondary } from '../../components/Button';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { PageContainer } from '../../components/PageContainer';
import { CustomContainer } from '../../components/CustomContainer';

export default function AdminAssessmentHistoryPage() {
    const { t } = useTranslation();
    const history = useHistory();
    const { assessments, areAssessmentsLoading } = useAssessments();

    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    function redirectToAddAssessmentPage() {
        history.push('/admin/test-management/add');
    }

    function redirectToEditAssessmentPage(id: string) {
        history.push(`/admin/test-management/${id}/edit`);
    }

    function redirectToDetailsAssessmentPage(id: string) {
        history.push(`/admin/test-management/${id}/details`);
    }

    return (
        <PageContainer>
            <CustomContainer
                header={
                    <ButtonSecondary variant="contained" onClick={redirectToAddAssessmentPage}>
                        {t('manage-test-view.test-search.create-test')}
                    </ButtonSecondary>
                }
                container={
                    <Box mb={3}>
                        {areAssessmentsLoading ? (
                            <EmptyPage />
                        ) : (
                            <AssessmentHistoryList
                                assessments={assessments}
                                onTestClick={(type, id) => {
                                    if (type === 'edit') {
                                        redirectToEditAssessmentPage(id);
                                    }

                                    if (type === 'details') {
                                        redirectToDetailsAssessmentPage(id);
                                    }
                                }}
                            />
                        )}
                    </Box>
                }
            />
        </PageContainer>
    );
}

function EmptyPage() {
    return (
        <>
            <Skeleton height={64} />
            <Skeleton height={64} />
            <Skeleton height={64} />
            <Skeleton height={64} />
        </>
    );
}
