import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InstructorRelation } from './types';
import { Toolbar } from './Toolbar';
import { InstructorsSelect } from './InstructorsSelect';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsTableContainer } from './InstructorsTable/InstructorsTableContainer';
import { InstructorsTableRow } from './InstructorsTable/InstructorsTableRow';
import { openAssignInstructorModal } from './AssignInstructorModal/AssignInstructorModal';
import { activePage } from '../../apollo_client';
import { useInstructors } from '../../operations/queries/Users/getUsersByRole';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { PrivilegedUser, Kindergarten } from '../../graphql/types';
import { PageContainer } from '../../components/PageContainer';
import { useUpdateAssessment } from '../../operations/mutations/Assessment/updateAssessment';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';

const T_PREFIX = 'admin-instructors-page.table-toolbar';
const T_PREFIX_SNACKBAR = 'admin-instructors-page.snackbars';

export default function AdminInstructorsPage() {
    const { t } = useTranslation();

    useEffect(() => {
        activePage(['admin-menu.tests.instructors']);
    }, []);

    const { instructors, isInstructorsListLoading } = useInstructors();
    const { assessments, areAssessmentsLoading, refetchAssessments } = useAssessments();
    const { updateAssessment } = useUpdateAssessment();

    const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
    const [selectedInstructor, setSelectedInstructor] = useState<PrivilegedUser[]>([]);

    useEffect(() => {
        if (assessments.length > 0) {
            setSelectedAssessment(getAvailableAssessments()[0]?._id);
        }
    }, [assessments.length]);

    if (isInstructorsListLoading || areAssessmentsLoading || !getSelectedAssessment()) return null;

    return (
        <PageContainer>
            <Toolbar
                AssessmentsSelect={
                    <AssessmentsSelect
                        label={t(`${T_PREFIX}.select-test`)}
                        options={getAvailableAssessments()}
                        value={getSelectedAssessment()}
                        onChange={onAssessmentChange}
                    />
                }
                InstructorsSelect={
                    <InstructorsSelect
                        label={t(`${T_PREFIX}.instructor-search`)}
                        options={instructors}
                        values={selectedInstructor}
                        onChange={onInstructorChange}
                    />
                }
                count={countUnassigned()}
            />
            <InstructorsTableContainer>
                {getInstructorsRelations().map((relation) => (
                    <InstructorsTableRow
                        key={relation.instructor._id}
                        relation={relation}
                        onAssignInstructorClick={onAssignClick}
                        assessment={getSelectedAssessment()}
                        isActive={countUnassigned() > 0}
                    />
                ))}
            </InstructorsTableContainer>
        </PageContainer>
    );

    function onAssessmentChange(title: string) {
        const selected = assessments.find((assessment) => assessment.title === title);

        if (selected) {
            setSelectedAssessment(selected._id);
        }
    }

    function onInstructorChange(mailList: string[]) {
        const selected = mailList
            .map((mail) => instructors.find((instructor) => instructor.mail === mail))
            .filter((instructor) => !!instructor);

        setSelectedInstructor(selected as PrivilegedUser[]);
    }

    async function onAssignClick(instructor: InstructorRelation) {
        if (!selectedAssessment) return;

        const result = await openAssignInstructorModal({
            kindergartens: getKindergartens(),
            instructorId: instructor.instructor._id,
            instructorFullName: getFullnameOrEmail(instructor.instructor),
            relations: getInstructorsRelations(),
            assessment: getSelectedAssessment(),
        });

        if (result.decision) {
            updateAssessment(getSelectedAssessment()._id, result.decision.updates).then((e) => {
                refetchAssessments();
                openSnackbar({
                    text: t(`${T_PREFIX_SNACKBAR}.assessment-updated`, { name: instructor.instructor.mail }),
                });
            });
        }
    }

    function getFullnameOrEmail(instructor: InstructorRelation['instructor']) {
        return instructor.firstname && instructor.lastname
            ? `${instructor.firstname} ${instructor.lastname}`
            : instructor.mail;
    }

    function countUnassigned() {
        return getSelectedAssessment().kindergartens.filter((kindergarten) => !kindergarten.instructor).length || 0;
    }

    function getKindergartens() {
        return (
            (getSelectedAssessment()
                .kindergartens.filter((kindergarten) => !!kindergarten)
                .map((kind) => kind.kindergarten) as Kindergarten[]) || []
        );
    }

    function getSelectedAssessment() {
        return getAvailableAssessments().find((assessment) => assessment._id === selectedAssessment)!;
    }

    function getAvailableAssessments() {
        return assessments.filter((assessment) => assessment.kindergartens.length > 0);
    }

    function getInstructorsRelations() {
        if (!selectedAssessment) {
            return [];
        }

        const relations = getSelectedAssessment().kindergartens;

        return instructors
            .filter((instructor) => {
                if (selectedInstructor.length > 0) {
                    return selectedInstructor.find((selected) => selected._id === instructor._id);
                }

                return true;
            })
            .map((instructor) => {
                const kindergartens = relations
                    .filter((r) => {
                        if (!r.instructor) return false;

                        return r.instructor._id === instructor._id && r.kindergarten;
                    })
                    .map((r) => r.kindergarten)
                    .filter((k) => !!k) as Kindergarten[];

                return {
                    instructor,
                    kindergartens,
                };
            });
    }
}
