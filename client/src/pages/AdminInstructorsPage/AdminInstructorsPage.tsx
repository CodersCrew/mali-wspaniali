import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { InstructorWithKindergartens } from './types';
import { Toolbar } from './Toolbar';
import { InstructorsSelect } from './InstructorsSelect';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsTableContainer } from './InstructorsTable/InstructorsTableContainer';
import { InstructorsTableRow } from './InstructorsTable/InstructorsTableRow';
import { AssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';
import { activePage } from '../../apollo_client';
import { Loader } from '../../components/Loader';
import { useUsersByRole } from '../../operations/queries/Users/getUsersByRole';
import { useAssessments } from '../../operations/queries/Assessments/getAllAssessments';
import { Assessment } from '../../graphql/types';

interface InstructorModalStatus {
    isOpen: boolean;
    instructor: InstructorWithKindergartens | null;
    assessment: Assessment | null;
}

const initialInstructorModalStatus = {
    isOpen: false,
    instructor: null,
    assessment: null,
};

export function AdminInstructorsPage() {
    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    const { usersList, isUsersListLoading } = useUsersByRole('instructor');
    const { assessmentList, isAssessmentListLoading } = useAssessments();

    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
    const [assignInstructorModalStatus, setAssignInstructorModalStatus] = useState<InstructorModalStatus>(
        initialInstructorModalStatus,
    );

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    useEffect(() => {
        // When assessment data is done fetching, set assessment select value to the most recent test (the data should be sorted by startDate in descending order)
        if (assessmentList.length !== 0) {
            setSelectedAssessment(assessmentList[0]);
        }
    }, [assessmentList]);

    const instructorsWithKindergartens: InstructorWithKindergartens[] = usersList.map(instructor => ({
        ...instructor,
        kindergartens: selectedAssessment?.kindergartens.filter(kindergarten => kindergarten.instructor?._id === instructor._id).map(kind => kind.kindergarten) || null
    }));

    const onAssignInstructorClick = (instructor: InstructorWithKindergartens) => {
        setAssignInstructorModalStatus({
            isOpen: true,
            instructor,
            assessment: selectedAssessment,
        });
    };

    const unassignedKindergartens = selectedAssessment?.kindergartens
        .filter(kindergarten => kindergarten.instructor === null)
        .map(kind => kind.kindergarten);

    if (isUsersListLoading || isAssessmentListLoading) {
        return <Loader />; 
    }  

    return (
        <div className={classes.container}>
            <Toolbar
                assessmentsSelect={
                    <AssessmentsSelect
                        label={t('admin-instructors-page.table-toolbar.select-test')}
                        options={assessmentList}
                        value={selectedAssessment}
                        setSelectedAssessment={setSelectedAssessment}
                    />
                }
                instructorsSelect={
                    <InstructorsSelect
                        label={t('admin-instructors-page.table-toolbar.instructor-search')}
                        options={usersList}
                    />
                }
                unassignedKindergartensCount={unassignedKindergartens?.length || 0}
            />
            <InstructorsTableContainer>
                {instructorsWithKindergartens.map(instructor => (
                    <InstructorsTableRow
                        key={instructor._id}
                        instructor={instructor}
                        onAssignInstructorClick={onAssignInstructorClick}
                    />
                ))}
            </InstructorsTableContainer>
            {assignInstructorModalStatus.isOpen && (
                <AssignInstructorModal
                    onClose={() => setAssignInstructorModalStatus(initialInstructorModalStatus)}
                    onSubmit={() => console.log('modal form submitted!')}
                    kindergartens={unassignedKindergartens || []}
                    instructor={assignInstructorModalStatus.instructor}
                    assessment={assignInstructorModalStatus.assessment}
                />
            )}
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
