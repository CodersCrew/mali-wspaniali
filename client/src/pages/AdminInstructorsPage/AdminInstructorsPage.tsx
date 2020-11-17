import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { InstructorsTable } from './InstructorsTable/InstructorsTable';
import { Toolbar } from './Toolbar';
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
    const classes = useStyles();

    const { usersList } = useUsersByRole('instructor');
    const { kindergartenList } = useKindergartens();
    const { assessmentList } = useAssessments();

    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [assignInstructorModalStatus, setAssignInstructorModalStatus] = useState<InstructorModalStatus>(
        initialInstructorModalStatus,
    );

    const onAssignInstructorClick = (instructor: User | null) => {
        setAssignInstructorModalStatus({
            isOpen: true,
            instructor,
            assessment: assessmentList.find(assess => assess._id === selectedAssessment) || null,
        });
    };

    const unassignedKindergartens = 3; // TODO: hard-coded for now, yet to be calculated based on the populated assessmentList

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    return (
        <div className={classes.container}>
            <Toolbar
                instructorSelectOptions={usersList}
                assessmentSelectOptions={assessmentList}
                assessmentSelectValue={selectedAssessment}
                setSelectedAssessment={setSelectedAssessment}
                unassignedKindergartens={unassignedKindergartens}
            />
            <InstructorsTable instructors={usersList} onAssignInstructorClick={onAssignInstructorClick} />
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
