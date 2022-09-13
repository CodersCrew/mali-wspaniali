import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TableRow,
    TableCell,
    IconButton,
    Fade,
    Box,
    Collapse,
    Tooltip,
    makeStyles,
    createStyles,
    Theme,
    Chip,
} from '@material-ui/core';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    AddCircle as AddIcon,
} from '@material-ui/icons';

import { InstructorRelation } from '../types';
import { Assessment, Kindergarten, User } from '../../../graphql/types';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';
import { openQuestionDialog } from '../../../components/QuestionDialog';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { useAssessments } from '../../../operations/queries/Assessment/getAllAssessments';

interface InstructorRowProps {
    relation: InstructorRelation;
    onAssignInstructorClick: (id: InstructorRelation) => void;
    assessment: Assessment | null;
    isActive: boolean;
}

const T_PREFIX = 'admin-instructors-page.table';

export function InstructorsTableRow(props: InstructorRowProps) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { refetchAssessments } = useAssessments();

    const [open, setOpen] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);

    const { updateAssessment } = useUpdateAssessment();

    const { mail, firstname, lastname } = props.relation.instructor;

    function filterKindergartens(kindergarten: Kindergarten) {
        return props.assessment?.kindergartens.map(toSimpleRelation).map(removeSelectedKindergarten(kindergarten));
    }

    return (
        <>
            <TableRow
                className={classes.root}
                onMouseEnter={() => setShowAddButton(true)}
                onMouseLeave={() => setShowAddButton(false)}
                data-testid="instructor-item"
            >
                <TableCell>
                    {props.relation.kindergartens.length > 0 && (
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    )}
                </TableCell>
                <TableCell>{firstname}</TableCell>
                <TableCell>{lastname}</TableCell>
                <TableCell data-testid="instructor-mail">{mail}</TableCell>
                <TableCell align="right" className={classes.kindergartenCell}>
                    {(props.isActive || props.relation.kindergartens.length > 0) && (
                        <Fade in={showAddButton} mountOnEnter unmountOnExit timeout={500}>
                            <div className={classes.iconButtonContainer}>
                                <Tooltip
                                    title={t(`${T_PREFIX}.tooltip`).toString()}
                                    aria-label={t(`${T_PREFIX}.tooltip`)}
                                    placement="top"
                                    arrow
                                >
                                    <IconButton
                                        onClick={() => props.onAssignInstructorClick(props.relation)}
                                        aria-label="assign instructor"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Fade>
                    )}
                    <span className={classes.countKindergarten}>{props.relation.kindergartens.length}</span>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell></TableCell>
                <TableCell className={classes.collapseCell} colSpan={5}>
                    <Collapse in={open && props.relation.kindergartens.length > 0} timeout="auto" unmountOnExit>
                        <Box display="flex" alignItems="center" flexWrap="wrap">
                            {t(`${T_PREFIX}.kindergartens-count`, { count: props.relation.kindergartens.length })}
                            {props.relation.kindergartens.map((kindergarten) => (
                                <Box m={1} ml={2} mb={1} key={kindergarten._id}>
                                    <Chip
                                        label={kindergarten.name}
                                        onDelete={() => {
                                            openQuestionDialog({
                                                title: t(`${T_PREFIX}.unassign-dialog-title`),
                                                description: t(`${T_PREFIX}.unassign-kindergarten-question`),
                                                primaryButtonLabel: t(`${T_PREFIX}.unassign`),
                                                color: 'primary',
                                            }).then((result) => {
                                                if (result.close) return;

                                                if (result.decision?.accepted) {
                                                    updateAssessment(props.assessment!._id, {
                                                        kindergartens: filterKindergartens(kindergarten),
                                                    })
                                                        .then(refetchAssessments)
                                                        .then(() =>
                                                            openSnackbar({
                                                                text: t(`${T_PREFIX}.unassign-kindergarten`, {
                                                                    name: kindergarten.name,
                                                                    mail: props.relation.instructor.mail,
                                                                }),
                                                            }),
                                                        );
                                                }
                                            });
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );

    function toSimpleRelation(kindergartenRelation: { instructor: User | null; kindergarten: Kindergarten | null }) {
        return {
            instructorId: kindergartenRelation.instructor?._id,
            kindergartenId: kindergartenRelation.kindergarten?._id,
        };
    }

    function removeSelectedKindergarten(selectedKindergarten: Kindergarten) {
        return (kindergartenRelation: { instructorId: string | undefined; kindergartenId: string | undefined }) => {
            const instructorId =
                kindergartenRelation.kindergartenId !== selectedKindergarten._id
                    ? kindergartenRelation.instructorId
                    : undefined;

            return { ...kindergartenRelation, instructorId };
        };
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
        collapseCell: {
            padding: 0,
        },
        kindergartenCell: {
            position: 'relative',
            paddingRight: theme.spacing(10),
        },
        iconButtonContainer: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: theme.palette.background.paper,
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: theme.spacing(8),
        },
        countKindergarten: {
            cursor: 'default',
            userSelect: 'none',
        },
    }),
);
