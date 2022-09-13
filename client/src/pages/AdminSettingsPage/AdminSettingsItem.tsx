import { TableRow, TableCell, IconButton, makeStyles, Theme, Typography, alpha, Tooltip } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Delete as DeleteIcon, Edit as EditIcon, Forward as ForwardIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { openAdminSettingsDeleteParent } from './AdminSettingsDeleteParentModal';
import { openAdminSettingsEditModal } from '../../components/ChilModals/EditChildModal';
import { openChanageChildrenKindergarten } from '../../components/ChilModals/ChangeChildKindergarten';
import { User } from '@app/graphql/types';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { useAnonymizeUser } from '../../operations/mutations/User/anonymizeUser';
import { useEditChild } from '../../operations/mutations/User/editChild';

interface AdminSettingsItemProps {
    user: User;
    onChange: () => void;
}

export function AdminSettingsItem({ user, onChange }: AdminSettingsItemProps) {
    const classes = useStyles();

    const { t } = useTranslation();
    const { kindergartenList } = useKindergartens();
    const { anonymizeUser } = useAnonymizeUser();
    const { editChild } = useEditChild();
    const childrenData = user.children.map((c) => `${c.firstname} ${c.lastname}`).join(', ');

    const editIconTooltip = t('user-settings.button-icon-edit-tooltip');
    const changeIconTooltip = t('user-settings.button-icon-change-tooltip');
    const deleteIconTooltip = t('user-settings.button-icon-delete-tooltip');

    return (
        <TableRow>
            <TableCell className={classes.parentEmailColumn}>
                <Typography variant="body1">{user.mail}</Typography>
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
                                    user,
                                    kindergartens: kindergartenList,
                                }).then((result) => {
                                    if (!result.close) {
                                        editChild(result.decision!.child)?.then(onChange);
                                        openSnackbar({
                                            text: t('user-settings.modal-edit-account.success-message'),
                                        });
                                    }
                                });
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    {user.role === 'parent' && (
                        <Tooltip title={changeIconTooltip}>
                            <IconButton
                                aria-label="edit"
                                className={classes.editButton}
                                onClick={() => {
                                    openChanageChildrenKindergarten({
                                        preventClose: false,
                                        isCancelButtonVisible: true,
                                        user,
                                        kindergartens: kindergartenList,
                                    }).then((result) => {
                                        if (!result.close && result.decision?.childDetailsList?.length !== 0) {
                                            const editChildPromises =
                                                result.decision?.childDetailsList.map((childDetails) =>
                                                    editChild(childDetails),
                                                ) || [];

                                            Promise.all(editChildPromises as Promise<void>[]).then(onChange);
                                            openSnackbar({
                                                text: t('user-settings.modal-change-kindergarden.success-message'),
                                            });
                                        }
                                    });
                                }}
                            >
                                <ForwardIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title={deleteIconTooltip}>
                        <IconButton
                            aria-label="delete"
                            className={classes.deleteButton}
                            onClick={() => {
                                openAdminSettingsDeleteParent({
                                    preventClose: false,
                                    isCancelButtonVisible: true,
                                    user,
                                }).then((result) => {
                                    if (!result.close) {
                                        openSnackbar({
                                            text: t('user-settings.success-message', user.mail),
                                        });

                                        anonymizeUser(user._id);
                                    }
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

export function AdminSettingsLoadingItem() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton variant="rect" height={118} />
            </TableCell>
            <TableCell>
                <Skeleton variant="rect" height={118} />
            </TableCell>
        </TableRow>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    editButton: {
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
    },
    deleteButton: {
        '&:hover': {
            color: theme.palette.error.main,
            backgroundColor: alpha(theme.palette.error.main, 0.2),
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
