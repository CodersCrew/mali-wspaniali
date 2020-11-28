import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TableRow,
    TableCell,
    IconButton,
    Fade,
    Collapse,
    Tooltip,
    Typography,
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
import { InstructorWithKindergartens } from '../types';

interface Props {
    instructor: InstructorWithKindergartens;
    onAssignInstructorClick: (instructor: InstructorWithKindergartens) => void;
    onUnassignKindergartenClick: (kindergartenId: string) => void;
}

export const InstructorsTableRow = ({ instructor, onAssignInstructorClick, onUnassignKindergartenClick }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);

    const { mail, kindergartens } = instructor;

    const instructorKindergartenCount = kindergartens ? kindergartens.length : 0;

    return (
        <>
            <TableRow
                className={classes.root}
                onMouseEnter={() => setShowAddButton(true)}
                onMouseLeave={() => setShowAddButton(false)}
                data-testid="instructor-item"
            >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell>{mail}</TableCell>
                <TableCell data-testid="instructor-mail">{mail}</TableCell>
                <TableCell align="right" className={classes.kindergartenCell}>
                    <Fade in={showAddButton} mountOnEnter unmountOnExit timeout={500}>
                        <div className={classes.iconButtonContainer}>
                            <Tooltip
                                title={t('admin-instructors-page.table.tooltip') as string}
                                aria-label={t('admin-instructors-page.table.tooltip')}
                                placement="top"
                                arrow
                            >
                                <IconButton
                                    onClick={() => onAssignInstructorClick(instructor)}
                                    aria-label="assign instructor"
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Fade>
                    {instructorKindergartenCount}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.collapseCell} colSpan={1}>
                    <Collapse in={open} timeout="auto" unmountOnExit />
                </TableCell>
                <TableCell className={classes.collapseCell} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div className={classes.collapseContainer}>
                            <Typography variant="subtitle2">{instructorKindergartenCount} przedszkola</Typography>
                            {instructor.kindergartens &&
                                instructor.kindergartens.map(kindergarten => (
                                    <Chip
                                        key={kindergarten._id}
                                        label={`${kindergarten.number}/${kindergarten.name}`}
                                        onDelete={() => onUnassignKindergartenClick(kindergarten._id)}
                                    />
                                ))}
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
        collapseCell: {
            padding: theme.spacing(0, 2),
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
        collapseContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: `${theme.spacing(2)}px`,
            alignItems: 'center',
            marginBottom: theme.spacing(1),
        },
    }),
);
