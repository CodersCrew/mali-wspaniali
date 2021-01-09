import React from 'react';
import { createStyles, IconButton, makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
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
            <TableCell classes={{ root: classes.statusCell }} align="center">
                <div className={classes.itemRoot}>
                    <div className="actionButtons">
                        <IconButton size="small" onClick={handleEditClick}>
                            <Edit classes={{ root: classes.icon }} titleAccess={t('manage-test-view.test-list.edit')} />
                        </IconButton>
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
            cursor: 'pointer',
        },
        icon: {
            color: theme.palette.text.secondary,
        },
        statusCell: {
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
        itemRoot: {
            minWidth: 100,
        },
    }),
);
