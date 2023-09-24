import { useState, useEffect } from 'react';
import { BarChart } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Assessment } from '@app/graphql/types';
import { activePage } from '@app/apollo_client';
import { useAssessments } from '@app/operations/queries/Assessment/getAllAssessments';
import { CustomContainer } from '@app/components/CustomContainer';
import { PageContainer } from '@app/components/PageContainer';
import { SecondaryFab } from '@app/components/SecondaryFab';
import { useIsDevice } from '@app/queries/useBreakpoints';
import { parseDateToAge } from '@app/utils/parseDateToAge';
import { useCreateAssessmentResult } from '@app/operations/mutations/Results/createAssessmentResult';
import { useAssessmentResults } from '@app/operations/queries/Results/getAssessmentResults';
import { openSnackbar } from '@app/components/Snackbar/openSnackbar';
import {
    useUpdateAssessmentResult,
    UpdatedAssessmentInput,
} from '@app/operations/mutations/Results/updateAssessmentResult';
import { AssessmentSubheader } from './AssessmentSubheader';
import { ChildListCompactContainer } from './ChildListCompactContainer';
import { NoAssessmentView } from './NoAssessmentsView';
import { openAddNoteDialog } from './AddNoteDialog';
import { ChildListContainer } from './ChildListContainer';
import { ChildListHeader } from './ChildListHeader';
import { GroupsSubheader } from './GroupsModal/GroupsSubheader';

export default function InstructorAddResultsPage() {
    const { assessments, areAssessmentsLoading } = useAssessments({ withChildren: true });
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [selectedKindergarten, setSelectedKindergarten] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [fullNameSortType, setFullNameSortType] = useState('asc');
    const [ageSortType, setAgeSortType] = useState('');
    const [creationDateSortType, setCreationDateSortType] = useState('');
    const { t } = useTranslation();
    const history = useHistory();
    const device = useIsDevice();
    const { createAssessmentResult } = useCreateAssessmentResult();
    const { updateAssessmentResult } = useUpdateAssessmentResult();
    const { kindergartenResults } = useAssessmentResults(selectedKindergarten, selectedAssessment);

    const currentAssessment = assessments.find((a) => a._id === selectedAssessment);

    const currentChildren =
        currentAssessment?.kindergartens
            .filter((k) => !!k.kindergarten)
            .find((k) => k.kindergarten?._id === selectedKindergarten)?.kindergarten!.children || []; // we need intersection with selectedGroup.children

    useEffect(() => {
        activePage(['instructor-menu.results-table']);
    }, []);

    useEffect(() => {
        const [assessment] = assessments;

        if (assessment) {
            setSelectedAssessment(assessment._id);

            setSelectedKindergarten(assessment.kindergartens[0]?.kindergarten?._id!);
        }
    }, [assessments]);

    const childList = getFilteredAndSortedChildList();
    const maxResults = currentChildren.length * 4;

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
            <CustomContainer
                header={
                    <ChildListHeader
                        assessments={assessments}
                        onChange={handleFilterChanged}
                        searchTerm={searchTerm}
                        selectedAssessment={selectedAssessment}
                        selectedKindergarten={selectedKindergarten}
                        compact={device.isSmallMobile}
                    />
                }
                subheader={
                    <AssessmentSubheader
                        assessment={currentAssessment}
                        max={maxResults}
                        results={kindergartenResults}
                    />
                }
                subsubheader={
                    <GroupsSubheader
                        assessments={assessments}
                        onChange={handleFilterChanged}
                        selectedAssessment={selectedAssessment}
                        selectedGroup={selectedGroup}
                        selectedKindergarten={selectedKindergarten}
                    />
                }
                container={
                    device.isSmallMobile ? (
                        <ChildListCompactContainer
                            assessment={currentAssessment}
                            childList={childList}
                            compact
                            onChange={handleFilterChanged}
                            onClick={handleClick}
                            results={kindergartenResults}
                            searchTerm={searchTerm}
                            selectedGroup={selectedGroup}
                        />
                    ) : (
                        <ChildListContainer
                            ageSortType={ageSortType}
                            assessment={currentAssessment}
                            childList={childList}
                            creationDateSortType={creationDateSortType}
                            fullNameSortType={fullNameSortType}
                            onClick={handleClick}
                            results={kindergartenResults}
                            selectedGroup={selectedGroup}
                        />
                    )
                }
            />

            {currentChildren[0] && (
                <SecondaryFab text={t('add-results-page.add-result')} icon={<BarChart />} onClick={onFabClick} />
            )}
        </PageContainer>
    );

    function getMeasurementStatus(assessment: Assessment | undefined) {
        if (!assessment || assessment.firstMeasurementStatus === 'active') {
            return 'first';
        }

        return 'last';
    }

    function handleFilterChanged(type: string, value: string) {
        if (type === 'assessment') {
            setSelectedGroup('');
            setSelectedAssessment(value);

            return;
        }

        if (type === 'searchTerm') {
            setSearchTerm(value);

            return;
        }

        if (type === 'group') {
            setSelectedGroup(value);

            return;
        }

        if (type === 'kindergarten') {
            setSelectedGroup('');
            setSelectedKindergarten(value);
        }
    }

    async function handleClick(type: string, value: string) {
        if (type === 'add-first-assessment-result') {
            history.push(`/instructor/result/add/first/${selectedAssessment}/${selectedKindergarten}/all/${value}`);
        }

        if (type === 'add-last-assessment-result') {
            history.push(`/instructor/result/add/last/${selectedAssessment}/${selectedKindergarten}/all/${value}`);
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
            setCreationDateSortType('');
        }

        if (type === 'age') {
            setAgeSortType((prev) => (prev === 'asc' ? 'dsc' : 'asc'));
            setFullNameSortType('');
            setCreationDateSortType('');
        }

        if (type === 'created-at') {
            setCreationDateSortType((prev) => (prev === 'asc' ? 'dsc' : 'asc'));
            setFullNameSortType('');
            setAgeSortType('');
        }

        if (type === 'see-results') {
            history.push(`/instructor/results/${value}`);
        }
    }

    function onFabClick() {
        const measurementStatus = getMeasurementStatus(currentAssessment);

        history.push(
            `/instructor/result/add/${measurementStatus}/${selectedAssessment}/${selectedKindergarten}/all/${currentChildren[0]._id}`,
        );
    }

    function getFilteredAndSortedChildList() {
        const fullName = (firstName: string, lastName: string) => {
            return `${lastName}, ${firstName}`;
        };

        const filteredChildList = currentChildren.filter((c) => {
            return fullName(c.lastname, c.firstname).toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (fullNameSortType !== '') {
            const collator = new Intl.Collator('pl', { sensitivity: 'base' });

            filteredChildList.sort((a, b) => {
                const fullNameA = fullName(a.firstname, a.lastname).toLowerCase();
                const fullNameB = fullName(b.firstname, b.lastname).toLowerCase();

                if (fullNameSortType === 'asc') {
                    return collator.compare(fullNameA, fullNameB);
                }

                return collator.compare(fullNameB, fullNameA);
            });
        }

        if (ageSortType !== '') {
            filteredChildList.sort((a, b) => {
                const childAgeA = parseDateToAge(a.birthYear, a.birthQuarter);
                const childAgeB = parseDateToAge(b.birthYear, b.birthQuarter);

                if (ageSortType === 'asc') {
                    return childAgeA - childAgeB;
                }

                return childAgeB - childAgeA;
            });
        }

        if (creationDateSortType !== '') {
            filteredChildList.sort((a, b) => {
                if (creationDateSortType === 'asc') {
                    return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? 1 : -1;
                }

                return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1;
            });
        }

        return filteredChildList;
    }

    async function createOrUpdateResult(update: Partial<UpdatedAssessmentInput>) {
        const childResult = kindergartenResults.find((r) => r.childId === update.childId);

        if (childResult) {
            await updateAssessmentResult({ _id: childResult._id, ...update });
        } else {
            await createAssessmentResult(update);
        }
    }

    function getFirstMeasurementNote(childId: string) {
        return kindergartenResults.find((r) => r.childId === childId)?.firstMeasurementNote || '';
    }

    function getLastMeasurementNote(childId: string) {
        return kindergartenResults.find((r) => r.childId === childId)?.lastMeasurementNote || '';
    }
}
