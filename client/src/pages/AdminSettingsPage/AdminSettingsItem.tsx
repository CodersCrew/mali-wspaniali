import React from 'react';
import { TableRow, TableCell, IconButton, makeStyles, Theme, Typography, fade, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import { useTranslation } from 'react-i18next';

import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { openAdminSettingsEditModal } from '../../components/ChilModals/EditChildModal';
import { User } from '../../graphql/types';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';

import { openAdminSettingsDeleteParent } from './AdminSettingsDeleteParentModal';

interface AdminSettingsItemProps {
    parent: User;
}

export function AdminSettingsItem({ parent }: AdminSettingsItemProps) {
    const classes = useStyles();

    const { t } = useTranslation();
    const { kindergartenList } = useKindergartens();
    const childrenData = parent.children.map((c) => `${c.firstname} ${c.lastname}`).join(', ');

    const editIconTooltip = t('parent-settings.button-icon-edit-tooltip');
    const changeIconTooltip = t('parent-settings.button-icon-change-tooltip');
    const deleteIconTooltip = t('parent-settings.button-icon-delete-tooltip');

    return (
        <TableRow>
            <TableCell className={classes.parentEmailColumn}>
                <Typography variant="body1">{parent.mail}</Typography>
            </TableCell>
            <TableCell className={classes.secondColumn}>
                <Typography variant="body1">{childrenData}</Typography>

                <div className={classes.actionButtons}>
                    <Tooltip title={editIconTooltip}>
                        <IconButton
                            className={classes.editButton}
                            onClick={() => {
                                openAdminSettingsEditModal({
                                    preventClose: false,
                                    isCancelButtonVisible: true,
                                    parent,
                                    kindergartens: kindergartenList,
                                }).then((result) => {
                                    if (!result.close)
                                        openSnackbar({
                                            text: t('parent-settings.modal-edit-account.success-message'),
                                        });
                                });
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={changeIconTooltip}>
                        <IconButton aria-label="edit" className={classes.editButton} onClick={() => null}>
                            <ForwardIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={deleteIconTooltip}>
                        <IconButton
                            aria-label="delete"
                            className={classes.deleteButton}
                            onClick={() => {
                                openAdminSettingsDeleteParent({
                                    preventClose: false,
                                    isCancelButtonVisible: true,
                                    parent,
                                }).then((result) => {
                                    if (!result.close)
                                        openSnackbar({
                                            text: t('parent-settings.success-message', parent.mail),
                                        });
                                });
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
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
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0, 0, 0, 0.6),
        },
    },
    secondColumn: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2, 0),
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            padding: theme.spacing(1, 0),
        },
    },

    actionButtons: {
        display: 'flex',
        justifyItems: 'right',
    },
}));
