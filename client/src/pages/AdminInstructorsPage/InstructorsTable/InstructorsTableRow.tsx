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
} from '@material-ui/core';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    AddCircle as AddIcon,
} from '@material-ui/icons';
import { InstructorWithKindergartens } from '../types';
import { Assessment } from '../../../graphql/types';

interface Props {
    instructor: InstructorWithKindergartens;
    onAssignInstructorClick: (instructor: InstructorWithKindergartens) => void;
    assessment: Assessment | null;
}

export const InstructorsTableRow = ({ instructor, onAssignInstructorClick, assessment }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);

    const { mail } = instructor;

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
                    {assessment && (
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
                    )}
                    {instructor.kindergartens?.length}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.collapseCell} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>Some content</Box>
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
