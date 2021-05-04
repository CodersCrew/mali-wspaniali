import { createStyles, IconButton, makeStyles, TableCell, TableRow, Theme, fade, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { StatusChip } from '../../../components/StatusChip';
import { Assessment } from '../../../graphql/types';

interface Props {
    value: Assessment;
    onClick: (type: string, id: string) => void;
}

export function AssessmentItem({ value, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const editIconTooltip = t('manage-test-view.test-list.edit-button');

    return (
        <TableRow key={value.title} hover onClick={handleRowClick} className={classes.row}>
            <TableCell component="th" scope="row">
                {value.title}
            </TableCell>
            <TableCell align="left">{value.status === 'done' && <StatusChip value={value.status} />}</TableCell>
            <TableCell>
                {value.firstMeasurementStartDate} - {value.firstMeasurementEndDate}
            </TableCell>
            <TableCell align="left">
                {value.status !== 'done' && <StatusChip value={value.firstMeasurementStatus} />}
            </TableCell>
            <TableCell>
                {value.lastMeasurementStartDate} - {value.lastMeasurementEndDate}
            </TableCell>
            <TableCell align="center">
                <div className={classes.itemRoot}>
                    <div className="actionButtons">
                        <Tooltip title={editIconTooltip}>
                            <IconButton className={classes.editButton} size="medium" onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="status">
                        {value.status !== 'done' && <StatusChip value={value.lastMeasurementStatus} />}
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );

    function handleRowClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
        onClick('details', value._id);
    }

    function handleEditClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();

        onClick('edit', value._id);
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            height: theme.spacing(10.1),
            cursor: 'pointer',
            '& .actionButtons': {
                display: 'none',
            },
            '&:hover .status': {
                display: 'none',
            },
            '&:hover .actionButtons': {
                display: 'block',
            },
        },
        editButton: {
            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: fade(theme.palette.primary.main, 0.2),
            },
        },
        itemRoot: {
            minWidth: 100,
        },
    }),
);
