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
import { parseDateToAge } from '../../utils/parseDateToAge';
import { useCreateAssessmentResult } from '../../operations/mutations/Results/createAssessmentResult';
import { useAssessmentResults } from '../../operations/queries/Results/getAssessmentResults';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import {
    useUpdateAssessmentResult,
    UpdatedAssessmentInput,
} from '../../operations/mutations/Results/updateAssessmentResult';

export default function InstructorAddResultsPage() {
    const { assessments, areAssessmentsLoading } = useAssessments({ withChildren: true });
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [selectedKindergarten, setSelectedKindergarten] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [fullNameSortType, setFullNameSortType] = useState('asc');
    const [ageSortType, setAgeSortType] = useState('');
    const { t } = useTranslation();
    const history = useHistory();
    const device = useIsDevice();
    const { createAssessmentResult } = useCreateAssessmentResult();
    const { updateAssessmentResult } = useUpdateAssessmentResult();
    const { kindergartenResults } = useAssessmentResults(selectedKindergarten, selectedAssessment);

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

    const childList = getFiltredAndSortedChildList();
    const maxResults = childList.length * 4;

    if (areAssessmentsLoading) return null;

    if (assessments.length === 0 || !currentAssessment) {
        return (
            <PageContainer>
                <NoAssessmentView onClick={() => history.push('/parent/blog/all')} />
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            {!device.isSmallMobile ? (
                <>
                    <CustomContainer
                        header={
                            <ChildListHeader
                                assessments={assessments}
                                selectedAssessment={selectedAssessment}
                                selectedKindergarten={selectedKindergarten}
                                searchTerm={searchTerm}
                                onChange={handleFilterChanged}
                            />
                        }
                        subheader={
                            <AssessmentSubheader
                                results={kindergartenResults}
                                max={maxResults}
                                assessment={currentAssessment}
                            />
                        }
                        container={
                            <ChildListContainer
                                assessment={currentAssessment}
                                results={kindergartenResults}
                                childList={childList}
                                onClick={handleClick}
                                fullNameSortType={fullNameSortType}
                                ageSortType={ageSortType}
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
                                onChange={handleFilterChanged}
                                compact
                            />
                        }
                        container={
                            <ChildListCompactContainer
                                assessment={currentAssessment}
                                childList={childList}
                                results={kindergartenResults}
                                onClick={handleClick}
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
            )}
        </PageContainer>
    );

    function handleFilterChanged(type: string, value: string) {
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

    async function handleClick(type: string, value: string) {
        if (type === 'add-first-assessment-result') {
            history.push(`/instructor/result/add/first/${selectedAssessment}/${selectedKindergarten}/${value}`);
        }

        if (type === 'add-last-assessment-result') {
            history.push(`/instructor/result/add/last/${selectedAssessment}/${selectedKindergarten}/${value}`);
        }

        if (type === 'add-first-assessment-note') {
            const currentChild = currentChildren.find((c) => c._id === value);

            if (!currentChild) return;

            const response = await openAddNoteDialog({
                title: t('add-results-page.note-first-measurement'),
                note: getFirstMeasurementNote(value),
            });

            if (!response || response.close) return;

            await createOrUpdateResult({
                childId: value,
                kindergartenId: selectedKindergarten,
                assessmentId: selectedAssessment,
                firstMeasurementNote: response.decision!.note,
            });

            await openSnackbar({
                text: t('add-results-page.added-first-note-for', {
                    name: `${currentChild.firstname} ${currentChild.lastname}`,
                }),
                severity: 'success',
            });
        }

        if (type === 'add-last-assessment-note') {
            const currentChild = currentChildren.find((c) => c._id === value);

            if (!currentChild) return;

            const response = await openAddNoteDialog({
                title: t('add-results-page.note-last-measurement'),
                note: getLastMeasurementNote(value),
            });

            if (response.close) return;

            await createOrUpdateResult({
                childId: value,
                kindergartenId: selectedKindergarten,
                assessmentId: selectedAssessment,
                lastMeasurementNote: response.decision!.note,
            });

            await openSnackbar({
                text: t('add-results-page.added-last-note-for', {
                    name: `${currentChild.firstname} ${currentChild.lastname}`,
                }),
                severity: 'success',
            });
        }

        if (type === 'full-name') {
            setFullNameSortType((prev) => (prev === 'asc' ? 'dsc' : 'asc'));
            setAgeSortType('');
        }

        if (type === 'age') {
            setAgeSortType((prev) => (prev === 'asc' ? 'dsc' : 'asc'));
            setFullNameSortType('');
        }
    }

    function onFabClick() {
        history.push(
            `/instructor/result/add/first/${selectedAssessment}/${selectedKindergarten}/${currentChildren[0]._id}`,
        );
    }

    function getFiltredAndSortedChildList() {
        const filtredChildList = currentChildren.filter((c) =>
            c.firstname.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        if (fullNameSortType !== '') {
            filtredChildList.sort((a, b) => {
                const fullNameA = `${a.firstname} ${a.lastname}`;
                const fullNameB = `${b.firstname} ${b.lastname}`;

                if (fullNameSortType === 'asc') {
                    return fullNameA > fullNameB ? 1 : -1;
                }

                return fullNameA > fullNameB ? -1 : 1;
            });
        }

        if (ageSortType !== '') {
            filtredChildList.sort((a, b) => {
                const childAgeA = parseDateToAge(a.birthYear, a.birthQuarter);
                const childAgeB = parseDateToAge(b.birthYear, b.birthQuarter);

                if (ageSortType === 'asc') {
                    return childAgeA - childAgeB;
                }

                return childAgeB - childAgeA;
            });
        }

        return filtredChildList;
    }

    function createOrUpdateResult(update: Partial<UpdatedAssessmentInput>) {
        const childResult = kindergartenResults.find((r) => r.childId === update.childId);

        if (childResult) {
            updateAssessmentResult({ _id: childResult._id, ...update });
        } else {
            createAssessmentResult(update);
        }
    }

    function getFirstMeasurementNote(childId: string) {
        return kindergartenResults.find((r) => r.childId === childId)?.firstMeasurementNote || '';
    }

    function getLastMeasurementNote(childId: string) {
        return kindergartenResults.find((r) => r.childId === childId)?.lastMeasurementNote || '';
    }
}
