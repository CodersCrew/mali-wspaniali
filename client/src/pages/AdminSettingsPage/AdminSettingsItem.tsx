import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { TableRow, TableCell, IconButton, makeStyles, Theme, Typography, fade, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import { useTranslation } from 'react-i18next';

import { AdminSettingsDeleteParent } from './AdminSettingsDeleteParent';
import { User } from '../../graphql/types';

interface AdminSettingsItemProps {
    values: User;
}

export const AdminSettingsItem: FC<AdminSettingsItemProps> = ({ values }) => {
    const [isOpen, setStateIsOpen] = useState(false);

    const classes = useStyles();
    const { t } = useTranslation();
    const childrenData = values?.children.map((child, index) => {
        const coma = index < values.children.length - 1 ? ',' : '';
        const childData = `${child.firstname}${child.lastname}${coma} `;

        return childData;
    });
    const editIconTooltip = t('parent-settings.buton-icon-edti-tooltip');
    const changeIconTooltip = t('parent-settings.buton-icon-change-tooltip');
    const deleteIconTooltip = t('parent-settings.buton-icon-delete-tooltip');

    return (
        <TableRow>
            <AdminSettingsDeleteParent
                onClose={() => {
                    setStateIsOpen(false);
                }}
                isOpen={isOpen}
                mail={values.mail}
            />
            <TableCell className={clsx(classes.parentEmailColumn, classes.rowText)}>{values.mail}</TableCell>
            <TableCell className={classes.childrenColumn}>
                <Typography className={classes.rowText}>{childrenData}</Typography>
                <div className={classes.actionButtons}>
                    <Tooltip title={editIconTooltip}>
                        <IconButton
                            className={classes.editButton}
                            onClick={() => {
                                console.log('do edit actions later');
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={changeIconTooltip}>
                        <IconButton
                            className={classes.editButton}
                            onClick={() => {
                                console.log('do change actions later');
                            }}
                        >
                            <ForwardIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={deleteIconTooltip}>
                        <IconButton
                            aria-label="delete"
                            className={classes.deleteButton}
                            onClick={() => {
                                setStateIsOpen(true);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    rowText: {
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.primary,
    },
    editButton: {
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: fade(theme.palette.primary.main, 0.2),
        },
    },
    deleteButton: {
        '&:hover': {
            color: theme.palette.error.main,
            backgroundColor: fade(theme.palette.error.main, 0.2),
        },
    },
    parentEmailColumn: {
        width: '20%',
    },
    childrenColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'right',
        marginLeft: theme.spacing(20),

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
}));
