import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';
import type { UpdatedAssessmentInput } from '../../../operations/mutations/Assessment/updateAssessment';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Assessment } from '../../../graphql/types';
import { InstructorWithKindergartens } from '../types';

interface Props {
    onClose: () => void;
    instructor: InstructorWithKindergartens | null;
    assessment: Assessment;
}

export const DeleteInstructorModal = ({ onClose, instructor: selectedInstructor, assessment }: Props) => {
    const classes = useStyles();

    const { t } = useTranslation();

    const { updateAssessment } = useUpdateAssessment();

    const onSubmitAssignInstructor = (updatedAssessment: Partial<UpdatedAssessmentInput>) => {
        updateAssessment(assessment._id, updatedAssessment);
        onClose();
    };

    const updatedKindergartenAssignements =
        assessment.kindergartens.map(({ kindergarten, instructor }) => ({
            kindergartenId: kindergarten._id,
            instructorId: instructor?._id === selectedInstructor?._id ? null : instructor?._id,
        })) || [];

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() =>
                onSubmitAssignInstructor({
                    kindergartens: [...updatedKindergartenAssignements],
                })
            }
            lowerButtonText={t('admin-instructors-page.modal.cancel')}
            upperButtonText={t('admin-instructors-page.modal.delete')}
            isOpen
            onClose={onClose}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t('admin-instructors-page.modal.delete-instructor')}
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    {`${t('admin-instructors-page.modal.delete-instructor-subtitle')} ${selectedInstructor?.mail}?`}
                </Typography>
            </div>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: 536,
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(2)}px`,
        },
        title: {
            paddingBottom: theme.spacing(2),
        },
        subtitle: {
            padding: theme.spacing(1),
        },
    }),
);
