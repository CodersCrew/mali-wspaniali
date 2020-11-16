import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { InstructorsTable } from './InstructorsTable/InstructorsTable';
import { Toolbar } from './Toolbar';
import { activePage } from '../../apollo_client';
import { useUsersByRole } from '../../operations/queries/Users/getUsersByRole';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useAssessments } from '../../operations/queries/Assessments/getAllAssessments';
import { AssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';

export function AdminInstructorsPage() {
    const classes = useStyles();

    const { usersList } = useUsersByRole('instructor');
    const { kindergartenList } = useKindergartens();
    const { assessmentList } = useAssessments();

    const [isAssignInstructorModalOpen, setAssignInstructorModalOpen] = useState(false);

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    return (
        <div className={classes.container}>
            <Toolbar
                onButtonClick={() => setAssignInstructorModalOpen(true)}
                instructorSelectOptions={usersList}
                assessmentSelectOptions={assessmentList}
            />
            <InstructorsTable instructors={usersList} />
            {isAssignInstructorModalOpen && (
                <AssignInstructorModal
                    onClose={() => setAssignInstructorModalOpen(false)}
                    onSubmit={() => console.log('modal form submitted!')}
                    instructorSelectOptions={usersList}
                    assessmentSelectOptions={assessmentList}
                    kindergartens={kindergartenList}
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
