import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { InstructorsTableContainer } from './InstructorsTable/InstructorsTableContainer';
import { Toolbar } from './Toolbar';
import { AssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';
import { activePage } from '../../apollo_client';
import { useUsersByRole } from '../../operations/queries/Users/getUsersByRole';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useAssessments } from '../../operations/queries/Assessments/getAllAssessments';
import { User, Assessment } from '../../graphql/types';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsSelect } from './InstructorsSelect';
import { InstructorsTableRow } from './InstructorsTable/InstructorsTableRow';

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

    const { usersList } = useUsersByRole('instructor');
    const { kindergartenList } = useKindergartens();
    const { assessmentList } = useAssessments();

    const [selectedAssessment, setSelectedAssessment] = useState(''); // TODO: refactor this piece of state to keep track of the whole assessment object, not just the id
    const [assignInstructorModalStatus, setAssignInstructorModalStatus] = useState<InstructorModalStatus>(
        initialInstructorModalStatus,
    );

    const onAssignInstructorClick = (instructor: User) => {
        setAssignInstructorModalStatus({
            isOpen: true,
            instructor,
            assessment: assessmentList.find(assess => assess._id === selectedAssessment) || null,
        });
    };

    const unassignedKindergartensCount = 3; // TODO: hard-coded for now, yet to be calculated based on the populated assessmentList

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

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
                    instructorSelectOptions={usersList}
                    assessmentSelectOptions={assessmentList}
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
