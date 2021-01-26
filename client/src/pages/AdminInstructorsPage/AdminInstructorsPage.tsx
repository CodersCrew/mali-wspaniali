import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InstructorWithKindergartens } from './types';
import { Toolbar } from './Toolbar';
import { InstructorsSelect } from './InstructorsSelect';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsTableContainer } from './InstructorsTable/InstructorsTableContainer';
import { InstructorsTableRow } from './InstructorsTable/InstructorsTableRow';
import { AssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';
import { activePage } from '../../apollo_client';
import { Loader } from '../../components/Loader';
import { useInstructors } from '../../operations/queries/Users/getUsersByRole';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { Assessment, PrivilegedUser } from '../../graphql/types';
import { PageContainer } from '../../components/PageContainer';

interface InstructorModalStatus {
    isOpen: boolean;
    instructor: InstructorWithKindergartens | null;
}

const initialInstructorModalStatus = {
    isOpen: false,
    instructor: null,
};

export default function AdminInstructorsPage() {
    const { t } = useTranslation();

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    const { instructors, isInstructorsListLoading } = useInstructors();
    const { assessments, areAssessmentsLoading } = useAssessments();

    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
    const [selectedInstructor, setSelectedInstructor] = useState<PrivilegedUser | null>(null);
    const [assignInstructorModalStatus, setAssignInstructorModalStatus] = useState<InstructorModalStatus>(
        initialInstructorModalStatus,
    );

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    useEffect(() => {
        if (assessments.length > 0) {
            setSelectedAssessment(assessments[0]);
        }
    }, [assessments, setSelectedAssessment]);

    const instructorsWithKindergartens: InstructorWithKindergartens[] = instructors.map((instructor) => ({
        ...instructor,
        kindergartens:
            selectedAssessment?.kindergartens
                .filter((kindergarten) => kindergarten.instructor?._id === instructor._id)
                .map((kind) => kind.kindergarten) || null,
    }));

    const onAssessmentSelectChange = (assessmentId: string) => {
        const foundAssessment = assessments.find((assessment) => assessment._id === assessmentId);

        if (foundAssessment) {
            setSelectedAssessment(foundAssessment);
        }
    };

    const onInstructorSelectChange = (instructorId: string) => {
        const foundInstructor = instructors.find((instructor) => instructor._id === instructorId);

        if (foundInstructor) {
            setSelectedInstructor(foundInstructor);
        }
    };

    const onAssignInstructorClick = (instructor: InstructorWithKindergartens) => {
        setAssignInstructorModalStatus({
            isOpen: true,
            instructor,
        });
    };

    const unassignedKindergartens = selectedAssessment?.kindergartens
        .filter((kindergarten) => kindergarten.instructor === null)
        .map((kind) => kind.kindergarten);

    if (isInstructorsListLoading || areAssessmentsLoading) {
        return <Loader />;
    }

    if (!selectedAssessment) {
        return null;
    }

    return (
        <PageContainer>
            <Toolbar
                assessmentsSelect={
                    <AssessmentsSelect
                        label={t('admin-instructors-page.table-toolbar.select-test')}
                        options={assessments.filter((assessment) => assessment.kindergartens.length !== 0)}
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
                {instructorsWithKindergartens.map((instructor) => (
                    <InstructorsTableRow
                        key={instructor._id}
                        instructor={instructor}
                        onAssignInstructorClick={onAssignInstructorClick}
                        assessment={selectedAssessment}
                    />
                ))}
            </InstructorsTableContainer>
            {selectedAssessment && assignInstructorModalStatus.isOpen && assignInstructorModalStatus.instructor && (
                <AssignInstructorModal
                    onClose={() => setAssignInstructorModalStatus(initialInstructorModalStatus)}
                    kindergartens={unassignedKindergartens || []}
                    instructor={assignInstructorModalStatus.instructor}
                    assessment={selectedAssessment}
                />
            )}
        </PageContainer>
    );
}
