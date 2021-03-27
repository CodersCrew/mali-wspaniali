import { useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import type { UpdatedAssessmentInput } from '../../../operations/mutations/Assessment/updateAssessment';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Kindergarten, Assessment } from '../../../graphql/types';
import { InstructorRelation } from '../types';
import { KindergartenTable } from './KindergartenTable';
import { openDialog, ActionDialog } from '../../../utils/openDialog';

interface ModalProps {
    kindergartens: Kindergarten[];
    relations: InstructorRelation[];
    instructorId: string;
    assessment: Assessment;
}

const T_PREFIX = 'admin-instructors-page.modal';

export function openAssignInstructorModal(props: ModalProps) {
    return openDialog<ModalProps, { updates: Partial<UpdatedAssessmentInput> }>(AssignInstructorModal, props);
}

function AssignInstructorModal(props: ModalProps & ActionDialog<{ updates: Partial<UpdatedAssessmentInput> }>) {
    const classes = useStyles();
    const currentRelation = props.relations.find((relation) => relation.instructor._id === props.instructorId);
    const [selectedKindergartens, setSelectedKindergartens] = useState<string[]>(getSelectedKindergartens());
    const { t } = useTranslation();

    const select = (kindergartenIds: string[]) => {
        setSelectedKindergartens(kindergartenIds);
    };

    const onSubmitAssignInstructor = (updatedAssessment: Partial<UpdatedAssessmentInput>) => {
        props.makeDecision({ accepted: true, updates: updatedAssessment });
        props.onClose();
    };

    // const instructorId = props.relations.instructor._id;

    if (!currentRelation) return null;

    const currentInstructor = currentRelation.instructor;

    const exsistingKindergartemAssignements = props.assessment.kindergartens
        // .filter(({ kindergarten }) => !selectedKindergartens.includes(kindergarten?._id)) // filter out selected kindergartend that will be updated on save
        .map(({ kindergarten, instructor }) => ({
            kindergartenId: kindergarten?._id,
            instructorId: instructor?._id,
        }));

    return (
        <TwoActionsModal
            lowerButtonOnClick={props.onClose}
            upperButtonOnClick={() =>
                onSubmitAssignInstructor({
                    kindergartens: exsistingKindergartemAssignements
                        .filter((k) => !!k.kindergartenId)
                        .map((relation) => {
                            if (selectedKindergartens.includes(relation.kindergartenId!)) {
                                return { ...relation, instructorId: currentInstructor._id };
                            }

                            if (relation.instructorId === currentInstructor._id) {
                                return { ...relation, instructorId: undefined };
                            }

                            return relation;
                        }),
                })
            }
            lowerButtonText={t(`${T_PREFIX}.cancel`)}
            upperButtonText={t(`${T_PREFIX}.assign`)}
            isOpen
            onClose={props.onClose}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t('admin-instructors-page.modal.assign-to-kindergarten')}
                </Typography>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="test-select-label">{t(`${T_PREFIX}.select-test`)}</InputLabel>
                    <Select
                        labelId="test-select-label"
                        id="test-select"
                        label={t(`${T_PREFIX}.select-test`)}
                        value={props.assessment?._id}
                        disabled
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value={props.assessment?._id}>{props.assessment?.title}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="instructor-select-label">{t(`${T_PREFIX}.select-instructor`)}</InputLabel>
                    <Select
                        labelId="instructor-select-label"
                        id="instructor-select"
                        label={t(`${T_PREFIX}.select-instructor`)}
                        value={props.instructorId}
                        disabled
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value={props.instructorId}>{currentInstructor.mail}</MenuItem>
                    </Select>
                </FormControl>
                <KindergartenTable
                    defaultKindergartens={getDefaultItems()}
                    selected={selectedKindergartens}
                    onSelect={(value) => select(value)}
                />
            </div>
        </TwoActionsModal>
    );

    function getDefaultItems() {
        return props.kindergartens
            .filter((kindergarten) => !!kindergarten)
            .map((kindergarten) => {
                return {
                    kindergarten,
                    selected: !!currentRelation!.kindergartens.find(
                        (selectedKindergarten) => selectedKindergarten._id === kindergarten._id,
                    ),
                    disabled: !!props.relations
                        .filter((relation) => relation.instructor._id !== props.instructorId)
                        .some((relation) => {
                            return relation.kindergartens.find(
                                (selectedKindergarten) => selectedKindergarten._id === kindergarten._id,
                            );
                        }),
                };
            });
    }

    function getSelectedKindergartens() {
        return getDefaultItems()
            .filter((kindergarten) => kindergarten.selected)
            .map((kindergarten) => kindergarten.kindergarten._id);
    }
}

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
    }),
);
