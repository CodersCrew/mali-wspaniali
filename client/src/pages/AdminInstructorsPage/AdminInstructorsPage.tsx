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

export function AdminInstructorsPage() {
    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    const { instructors, isInstructorsListLoading } = useInstructors();
    const { assessmentList, isAssessmentListLoading } = useAssessments();
    const filtredAssessments = assessmentList.filter(assessment => assessment.kindergartens.length !== 0);
    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(filtredAssessments[0]);

    const instructorsWithKindergartens: InstructorWithKindergartens[] = instructors.map(instructor => ({
        ...instructor,
        kindergartens:
            selectedAssessment?.kindergartens
                .filter(kindergarten => kindergarten.instructor?._id === instructor._id)
                .map(kind => kind.kindergarten) || null,
    }));

    const onAssessmentSelectChange = (assessmentId: string) => {
        setSelectedAssessment(assessmentList.find(assessment => assessment._id === assessmentId) as Assessment);
    };

    const onAssignInstructorClick = (instructor: InstructorWithKindergartens) => {
        openAssignInstructorModal({
            instructor,
            assessment: selectedAssessment,
            kindergartens: unassignedKindergartens || [],
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
                        options={filtredAssessments}
                        value={selectedAssessment}
                        onChange={onAssessmentSelectChange}
                    />
                }
                instructorsSelect={
                    <InstructorsSelect
                        label={t('admin-instructors-page.table-toolbar.instructor-search')}
                        options={instructors}
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
