import React, { useEffect, useState } from 'react';
import { BarChart } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { activePage } from '../../apollo_client';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { CustomContainer } from '../../components/CustomContainer';
import { ChildListHeader } from './ChildListHeader';
import { ChildListContainer } from './ChildListContainer';
import { PageContainer } from '../../components/PageContainer';
import { openAddNoteDialog } from './AddNoteDialog';
import { NoAssessmentView } from './NoAssessmentsView';
import { SecondaryFab } from '../../components/SecondaryFab';
import { useIsDevice } from '../../queries/useBreakpoints';
import { ChildListCompactContainer } from './ChildListCompactContainer';
import { AssessmentSubheader } from './AssessmentSubheader';

export function InstructorAddResultsPage() {
    const { assessments, areAssessmentsLoading } = useAssessments({ withChildren: true });
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [selectedKindergarten, setSelectedKindergarten] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();
    const history = useHistory();
    const device = useIsDevice();

    const currentAssessment = assessments.find((a) => a._id === selectedAssessment);

    const currentChildren =
        currentAssessment?.kindergartens.find((k) => k.kindergarten._id === selectedKindergarten)?.kindergarten
            .children || [];

    useEffect(() => {
        activePage(['instructor-menu.add-results']);
    }, []);

    useEffect(() => {
        const [assessment] = assessments;

        if (assessment) {
            setSelectedAssessment(assessment._id);

            setSelectedKindergarten(assessment.kindergartens[0]?.kindergarten._id);
        }
    }, [assessments]);

    if (areAssessmentsLoading) return null;

    if (assessments.length === 0 || !currentAssessment) {
        return (
            <PageContainer>
                <NoAssessmentView onClick={() => history.push('/parent/blog/all')} />
            </PageContainer>
        );
    }

    function onFilterChanged(type: string, value: string) {
        if (type === 'assessment') {
            setSelectedAssessment(value);

            return;
        }

        if (type === 'searchTerm') {
            setSearchTerm(value);

            return;
        }

        setSelectedKindergarten(value);
    }

    function onChildClicked(type: string, value: string) {
        if (type === 'add-first-assessment-result') {
            history.push(`/instructor/result/add/first/${selectedAssessment}/${selectedKindergarten}/${value}`);
        }

        if (type === 'add-last-assessment-result') {
            history.push(`/instructor/result/add/last/${selectedAssessment}/${selectedKindergarten}/${value}`);
        }

        if (type === 'add-first-assessment-note') {
            openAddNoteDialog({ title: t('add-results-page.note-first-measurement'), note: '' });
        }

        if (type === 'add-last-assessment-note') {
            openAddNoteDialog({ title: t('add-results-page.note-last-measurement'), note: '' });
        }
    }

    function onFabClick() {
        history.push(
            `/instructor/result/add/first/${selectedAssessment}/${selectedKindergarten}/${currentChildren[0]._id}`,
        );
    }

    const filtredChildList = currentChildren.filter((c) =>
        c.firstname.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <PageContainer>
            {device.isDesktop || device.isTablet ? (
                <>
                    <CustomContainer
                        header={
                            <ChildListHeader
                                assessments={assessments}
                                selectedAssessment={selectedAssessment}
                                selectedKindergarten={selectedKindergarten}
                                searchTerm={searchTerm}
                                onChange={onFilterChanged}
                            />
                        }
                        subheader={<AssessmentSubheader assessment={currentAssessment} />}
                        container={
                            <ChildListContainer
                                assessment={currentAssessment}
                                childList={filtredChildList}
                                onClick={onChildClicked}
                            />
                        }
                    />
                    {currentChildren[0] && (
                        <SecondaryFab
                            text={t('add-results-page.add-result')}
                            icon={<BarChart />}
                            onClick={onFabClick}
                        />
                    )}
                </>
            ) : (
                <>
                    <CustomContainer
                        header={
                            <ChildListHeader
                                assessments={assessments}
                                selectedAssessment={selectedAssessment}
                                selectedKindergarten={selectedKindergarten}
                                searchTerm={searchTerm}
                                onChange={onFilterChanged}
                                compact
                            />
                        }
                        container={<ChildListCompactContainer childList={filtredChildList} onClick={onChildClicked} />}
                    />
                    {currentChildren[0] && (
                        <SecondaryFab
                            text={t('add-results-page.add-result')}
                            icon={<BarChart />}
                            onClick={onFabClick}
                        />
                    )}
                </>
            )}
        </PageContainer>
    );
}
