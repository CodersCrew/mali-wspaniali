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
import { Assessment, Kindergarten } from '../../../graphql/types';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';

interface InstructorRowProps {
    relation: InstructorRelation;
    onAssignInstructorClick: (id: InstructorRelation) => void;
    assessment: Assessment | null;
}

const T_PREFIX = 'admin-instructors-page.table';

export function InstructorsTableRow(props: InstructorRowProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);

    const { updateAssessment } = useUpdateAssessment();

    const { mail } = props.relation.instructor;

    function filterKindergartens(kindergarten: Kindergarten) {
        return props.relation.kindergartens
            .filter((kinderGarten) => kinderGarten._id !== kindergarten._id)
            .map((k) => {
                return {
                    kindergartenId: k._id,
                    instructorId: props.relation.instructor._id,
                };
            });
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
                <TableCell>{mail}</TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell data-testid="instructor-mail">{mail}</TableCell>
                <TableCell align="right" className={classes.kindergartenCell}>
                    {props.assessment && (
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
                    {props.relation.kindergartens.length}
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
                                        onDelete={() => {
                                            updateAssessment(props.assessment!._id, {
                                                kindergartens: filterKindergartens(kindergarten),
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
    }),
);
