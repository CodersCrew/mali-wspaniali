import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { InstructorWithKindergartens } from './types';
import { Toolbar } from './Toolbar';
import { InstructorsSelect } from './InstructorsSelect';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsTableContainer } from './InstructorsTable/InstructorsTableContainer';
import { InstructorsTableRow } from './InstructorsTable/InstructorsTableRow';
import { activePage } from '../../apollo_client';
import { Loader } from '../../components/Loader';
import { useInstructors } from '../../operations/queries/Users/getUsersByRole';
import { useAssessments } from '../../operations/queries/Assessments/getAllAssessments';
import { Assessment } from '../../graphql/types';
import { openAssignInstructorModal } from './openAssignInstructorModal';
import { openUnassignKindergartenModal } from './openUnassignKindergartenModal';

export function AdminInstructorsPage() {
    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    const { instructors, isInstructorsListLoading } = useInstructors();
    const { assessmentList, isAssessmentListLoading } = useAssessments();

    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
    const [selectedInstructor, setSelectedInstructor] = useState('');

    const filteredAssessments = assessmentList.filter(assessment => assessment.kindergartens.length !== 0);

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    useEffect(() => {
        if (filteredAssessments.length !== 0) {
            setSelectedAssessment(filteredAssessments[0]);
        }
    }, [filteredAssessments]);

    // const instructorsWithKindergartens: InstructorWithKindergartens[] = instructors.map(instructor => ({
    //     ...instructor,
    //     kindergartens:
    //         selectedAssessment?.kindergartens
    //             .filter(kindergarten => kindergarten.instructor?._id === instructor._id)
    //             .map(kind => kind.kindergarten) || null,
    // }));

    const instructorsWithKindergartens: InstructorWithKindergartens[] = instructors.map(instructor => ({
        ...instructor,
        kindergartens: [
            {
                _id: '5f2b063d4f145e2a8c4e3ae3',
                name: 'Przedszkole Agatka',
                number: 4,
                address: 'xyz2',
                city: 'Wrocław'
            },
            {
                _id: '5f0894f44075fd62bb9e3df3',
                name: 'Przedszkole Agatka5',
                number: 5,
                address: 'ujn2',
                city: 'aaaa'
            },
        ]
    }));

    const onAssessmentSelectChange = (assessmentId: string) => {
        setSelectedAssessment(assessmentList.find(assessment => assessment._id === assessmentId) as Assessment);
    };

    const onInstructorSelectChange = (instructorId: string) => {
        setSelectedInstructor(instructorId);
    };

    const onAssignInstructorClick = (instructor: InstructorWithKindergartens) => {
        openAssignInstructorModal({
            instructor,
            assessment: selectedAssessment,
            kindergartens: unassignedKindergartens || [],
        }).then(e => console.log(e));
    };

    const onUnassignKindergartenClick = (kindergartenId: string) => {
        openUnassignKindergartenModal({
            kindergartenId
        }).then(e => console.log(e));
    };

    const unassignedKindergartens = selectedAssessment?.kindergartens
        .filter(kindergarten => kindergarten.instructor === null)
        .map(kind => kind.kindergarten);

    if (isInstructorsListLoading || isAssessmentListLoading) {
        return <Loader />;
    }

    return (
        <div className={classes.container}>
            <Toolbar
                assessmentsSelect={
                    <AssessmentsSelect
                        label={t('admin-instructors-page.table-toolbar.select-test')}
                        options={filteredAssessments}
                        value={selectedAssessment}
                        onChange={onAssessmentSelectChange}
                    />
                }
                instructorsSelect={
                    <InstructorsSelect
                        label={t('admin-instructors-page.table-toolbar.instructor-search')}
                        options={instructors}
                        value={selectedInstructor}
                        onChange={onInstructorSelectChange}
                    />
                }
                unassignedKindergartensCount={unassignedKindergartens?.length || 0}
            />
            <InstructorsTableContainer>
                {instructorsWithKindergartens.filter(instructor => instructor._id.includes(selectedInstructor)).map(instructor => (
                    <InstructorsTableRow
                        key={instructor._id}
                        instructor={instructor}
                        onAssignInstructorClick={onAssignInstructorClick}
                        onUnassignKindergartenClick={onUnassignKindergartenClick}
                    />
                ))}
            </InstructorsTableContainer>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
        },
    }),
);
