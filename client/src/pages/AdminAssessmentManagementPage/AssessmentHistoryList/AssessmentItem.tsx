import { createStyles, IconButton, makeStyles, TableCell, TableRow, Theme, alpha, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';

import { StatusChip } from '../../../components/StatusChip';
import { Assessment } from '../../../graphql/types';

dayjs.extend(utc);

interface Props {
    value: Assessment;
    onClick: (type: string, id: string) => void;
}

export function AssessmentItem({ value, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableRow key={value.title} hover onClick={handleRowClick} className={classes.row}>
            <TableCell component="th" scope="row">
                {value.title}
            </TableCell>
            <TableCell>
                {parseDate(value.firstMeasurementStartDate)} - {parseDate(value.firstMeasurementEndDate)}
            </TableCell>
            <TableCell align="left">
                {value.firstMeasurementStatus !== 'done' && <StatusChip value={value.firstMeasurementStatus} />}
            </TableCell>
            <TableCell>
                {parseDate(value.lastMeasurementStartDate)} - {parseDate(value.lastMeasurementEndDate)}
            </TableCell>
            <TableCell align="center">
                <div className={classes.itemRoot}>
                    <div className="actionButtons">
                        <Tooltip title={<>{t('manage-test-view.test-list.edit-button')}</>}>
                            <IconButton className={classes.editButton} size="small" onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="status">
                        {value.lastMeasurementStatus !== 'done' && <StatusChip value={value.lastMeasurementStatus} />}
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );

    function handleRowClick() {
        onClick('details', value._id);
    }

    function handleEditClick(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();

        onClick('edit', value._id);
    }

    function parseDate(date: string): string {
        return dayjs.utc(date).format('l');
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            height: theme.spacing(8),
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
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
        },
        itemRoot: {
            minWidth: 100,
        },
    }),
);
