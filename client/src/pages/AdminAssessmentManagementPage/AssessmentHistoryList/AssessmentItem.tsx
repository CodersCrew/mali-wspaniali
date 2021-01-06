import React from 'react';
import { createStyles, IconButton, makeStyles, TableCell, TableRow, Theme } from '@material-ui/core';
import { Assessment as AssessmentIcon, Edit } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { StatusChip } from './StatusChip';
import { Assessment } from '../../../graphql/types';

interface Props {
    value: Assessment;
    onClick: (type: string, id: string) => void;
}

export function AssessmentItem({ value, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableRow key={value.title} hover>
            <TableCell component="th" scope="row">
                {value.title}
            </TableCell>
            <TableCell>{value.startDate}</TableCell>
            <TableCell>{value.endDate}</TableCell>
            <TableCell classes={{ root: classes.statusCell }} align="center">
                <div className={classes.itemRoot}>
                    <div className="actionButtons">
                        <IconButton size="small" onClick={() => onClick('details', value._id)}>
                            <AssessmentIcon
                                classes={{ root: classes.icon }}
                                titleAccess={t('manage-test-view.test-list.details')}
                            />
                        </IconButton>
                        <IconButton size="small" onClick={() => onClick('edit', value._id)}>
                            <Edit classes={{ root: classes.icon }} titleAccess={t('manage-test-view.test-list.edit')} />
                        </IconButton>
                    </div>
                    <div className="status">
                        <StatusChip value={value.status} />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
