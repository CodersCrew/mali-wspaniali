import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { activePage } from '../../apollo_client';
import { AssessmentHistoryList } from './AssessmentHistoryList/AssessmentHistoryList';
import { ButtonSecondary } from '../../components/Button';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { PageContainer } from '../../components/PageContainer';

export function AdminAssessmentHistoryPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();
    const { assessments } = useAssessments();

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
            <div className={classes.searchContainer}>
                <ButtonSecondary variant="contained" onClick={redirectToAddAssessmentPage}>
                    {t('manage-test-view.test-search.create-test')}
                </ButtonSecondary>
            </div>
            <div className={classes.listContainer}>
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
            </div>
        </PageContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchContainer: {
            marginTop: 44,
        },
        listContainer: {
            marginTop: 50,
        },
    }),
);
