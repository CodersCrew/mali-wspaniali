import React, { useState } from 'react';
import {
    Typography,
    makeStyles,
    Theme,
    createStyles,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';
import type { UpdatedAssessmentInput } from '../../../operations/mutations/Assessment/updateAssessment';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Kindergarten, Assessment } from '../../../graphql/types';
import { InstructorWithKindergartens } from '../types';
import { KindergartenTable } from './KindergartenTable';

interface Props {
    onClose: () => void;
    kindergartens: Kindergarten[];
    instructor: InstructorWithKindergartens | null;
    assessment: Assessment | null;
}

export const AssignInstructorModal = ({
    onClose,
    kindergartens,
    instructor: selectedInstructor,
    assessment,
}: Props) => {
    const classes = useStyles();
    const [selectedKindergartens, setSelectedKindergartens] = useState<string[]>([]);
    const { t } = useTranslation();

    const select = (kindergartenIds: string[]) => {
        setSelectedKindergartens(kindergartenIds);
    };

    const selectedAssmentId = (assessment && assessment._id) || null;

    const { updateAssessment } = useUpdateAssessment(selectedAssmentId);

    const onSubmitAssignInstructor = (updatedAssessment: Partial<UpdatedAssessmentInput>) => {
        updateAssessment(updatedAssessment);
        onClose();
    };

    const instructorId = (selectedInstructor && selectedInstructor._id) || null;

    const exsistingKindergartemAssignements =
        (assessment &&
            assessment.kindergartens
                .filter(({ instructor }) => instructor)
                .map(({ kindergarten, instructor }) => ({
                    kindergartenId: kindergarten._id,
                    instructorId: instructor?._id,
                }))) ||
        [];
    const newKindergartenAssignment = selectedKindergartens.map((kindergartenId) => ({ kindergartenId, instructorId }));

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() =>
                onSubmitAssignInstructor({
                    kindergartens: [...exsistingKindergartemAssignements, ...newKindergartenAssignment],
                })
            }
            lowerButtonText={t('admin-instructors-page.modal.cancel')}
            upperButtonText={t('admin-instructors-page.modal.assign')}
            isOpen
            onClose={onClose}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t('admin-instructors-page.modal.assign-to-kindergarten')}
                </Typography>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="test-select-label">{t('admin-instructors-page.modal.select-test')}</InputLabel>
                    <Select
                        labelId="test-select-label"
                        id="test-select"
                        label={t('admin-instructors-page.modal.select-test')}
                        value={assessment?._id}
                        disabled
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value={assessment?._id}>{assessment?.title}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="instructor-select-label">
                        {t('admin-instructors-page.modal.select-instructor')}
                    </InputLabel>
                    <Select
                        labelId="instructor-select-label"
                        id="instructor-select"
                        label={t('admin-instructors-page.modal.select-instructor')}
                        value={selectedInstructor?._id}
                        disabled
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value={selectedInstructor?._id}>{selectedInstructor?.mail}</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    {t('admin-instructors-page.modal.assigned-kindergartens')}
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    {t('admin-instructors-page.modal.add-unassigned-kindergarten')}
                </Typography>
                <KindergartenTable kindergartens={kindergartens} onSelect={(value) => select(value)} />
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
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
    }),
);
