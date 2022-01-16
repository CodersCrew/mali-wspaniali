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
    Grid,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import type { UpdatedAssessmentInput } from '../../../operations/mutations/Assessment/updateAssessment';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Kindergarten, Assessment } from '@app/graphql/types';
import { InstructorRelation } from '../types';
import {
    KindergartenTransferList,
    SelectableKindergarten,
} from '../../../components/TransferList/KindergartenTransferList';
import { openDialog, ActionDialog } from '../../../utils/openDialog';

interface ModalProps {
    kindergartens: Kindergarten[];
    relations: InstructorRelation[];
    instructorId: string;
    instructorFullName: string;
    assessment: Assessment;
}

const T_PREFIX = 'admin-instructors-page.modal';

export function openAssignInstructorModal(props: ModalProps) {
    return openDialog<ModalProps, { updates: Partial<UpdatedAssessmentInput> }>(AssignInstructorModal, props);
}

function AssignInstructorModal(props: ModalProps & ActionDialog<{ updates: Partial<UpdatedAssessmentInput> }>) {
    const classes = useStyles();
    const currentRelation = props.relations.find((relation) => relation.instructor._id === props.instructorId);
    const [selectedKindergartens, setSelectedKindergartens] = useState<SelectableKindergarten[]>([]);
    const { t } = useTranslation();

    const select = (kindergartens: SelectableKindergarten[]) => {
        setSelectedKindergartens(kindergartens);
    };

    const onSubmitAssignInstructor = (updatedAssessment: Partial<UpdatedAssessmentInput>) => {
        props.makeDecision({ accepted: true, updates: updatedAssessment });
        props.onClose();
    };

    if (!currentRelation) return null;

    const currentInstructor = currentRelation.instructor;

    const exsistingKindergartemAssignements = props.assessment.kindergartens.map(({ kindergarten, instructor }) => ({
        kindergartenId: kindergarten?._id,
        instructorId: instructor?._id,
    }));

    return (
        <TwoActionsModal
            lowerButtonOnClick={props.onClose}
            upperButtonOnClick={onActionButtonClick}
            lowerButtonText={t(`${T_PREFIX}.cancel`)}
            upperButtonText={t(`${T_PREFIX}.assign`)}
            isOpen
            onClose={props.onClose}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t('admin-instructors-page.modal.assign-to-kindergarten')}
                </Typography>
                <KindergartenTransferHeader
                    instructorId={props.instructorId}
                    instructorFullName={props.instructorFullName}
                    assessment={props.assessment}
                />
                <KindergartenTransferList
                    defaultKindergartens={getDefaultItems()}
                    labels={{
                        leftLabel: t('admin-instructors-page.modal.unassigned-kindergartens'),
                        rightLabel: props.instructorFullName,
                        leftInputLabel: t('admin-instructors-page.modal.search-kindergarten'),
                        rightInputLabel: t('admin-instructors-page.modal.search-kindergarten'),
                    }}
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

    function onActionButtonClick() {
        onSubmitAssignInstructor({
            kindergartens: exsistingKindergartemAssignements
                .filter((k) => !!k.kindergartenId)
                .map((relation) => {
                    const changedRelation = selectedKindergartens.find(
                        (k) => k.kindergarten._id === relation.kindergartenId && !k.disabled,
                    );

                    if (changedRelation) {
                        return {
                            ...relation,
                            instructorId: changedRelation.selected ? currentInstructor._id : undefined,
                        };
                    }

                    return relation;
                }),
        });
    }
}

function KindergartenTransferHeader(props: {
    instructorId: string;
    instructorFullName: string;
    assessment: Assessment;
}) {
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
                        <MenuItem value={props.instructorId}>{props.instructorFullName}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(2)}px`,
        },
        title: {
            paddingBottom: theme.spacing(2),
        },
    }),
);
