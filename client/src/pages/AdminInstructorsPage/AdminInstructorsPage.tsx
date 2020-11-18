import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Toolbar } from './Toolbar';
import { InstructorsSelect } from './InstructorsSelect';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsTableContainer } from './InstructorsTable/InstructorsTableContainer';
import { InstructorsTableRow } from './InstructorsTable/InstructorsTableRow';
import { AssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';
import { activePage } from '../../apollo_client';
import { useUsersByRole } from '../../operations/queries/Users/getUsersByRole';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useAssessments } from '../../operations/queries/Assessments/getAllAssessments';
import { User, Assessment } from '../../graphql/types';

interface InstructorModalStatus {
    isOpen: boolean;
    instructor: User | null;
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

    const { usersList } = useUsersByRole('instructor');
    const { kindergartenList } = useKindergartens();
    const { assessmentList } = useAssessments();

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

    const onAssignInstructorClick = (instructor: User) => {
        setAssignInstructorModalStatus({
            isOpen: true,
            instructor,
            assessment: selectedAssessment,
        });
    };

    const unassignedKindergartensCount = selectedAssessment?.kindergartens.map(kindergarten => !kindergarten.instructor ? kindergarten : null).length || 0;

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
                unassignedKindergartensCount={unassignedKindergartensCount}
            />
            <InstructorsTableContainer>
                {usersList.map(instructor => (
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
                    kindergartens={kindergartenList}
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
