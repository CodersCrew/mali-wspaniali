import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import { Box, createStyles, Divider, Grid, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { Group } from '../../../graphql/types';
import { OutlinedTextField } from '../../../components/OutlinedTextField';

import { openGroupsDeleteModal } from './GroupsDeleteModal';

export function GroupsList() {
    const [groupList, setGroupList] = useState<Group[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [currentlyEdited, setCurrentlyEdited] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        setGroupList([
            { _id: '123', name: 'motylki', instructor: null, kindergarten: null },
            { _id: '124', name: 'kotki', instructor: null, kindergarten: null },
        ]);
    }, []); // to be deleted
    const classes = useStyles();

    const setGroupName = (id: string, name: string) => {
        setGroupList(groupList.map((group) => (group._id === id ? { ...group, name } : group)));
    };

    return (
        <>
            <Grid container direction="column" alignItems="center" xs={12}>
                <Grid container direction="row" justify="space-between" alignItems="center" xs={12}>
                    <Typography variant="body2">{t('groupsModal.group-name')}</Typography>
                    <Tooltip title={<>{t('groupsModal.edit-groups')}</>}>
                        <EditIcon
                            color={editMode ? 'secondary' : 'disabled'}
                            onClick={() => {
                                setEditMode(!editMode);
                                setCurrentlyEdited('');
                            }}
                        />
                    </Tooltip>
                </Grid>
                <Box mt={2} />
                {groupList.map((group, index) => (
                    <Box key={index} width="100%">
                        <Divider />
                        <Box
                            display="flex"
                            width="100%"
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.row}
                        >
                            {currentlyEdited === group.name ? (
                                <Box
                                    display="flex"
                                    width="60%"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <OutlinedTextField
                                        input={group.name}
                                        label={t('groupsModal.group-name').toString()}
                                        onChange={(value: string) => setGroupName(group._id, value)}
                                    />

                                    <Tooltip title={<>{t('groupsModal.save')}</>}>
                                        <DoneIcon color="primary" className={classes.button} />
                                    </Tooltip>
                                    <Tooltip title={<>{t('groupsModal.close')}</>}>
                                        <CloseIcon
                                            color="disabled"
                                            className={classes.button}
                                            onClick={() => setCurrentlyEdited('')}
                                        />
                                    </Tooltip>
                                </Box>
                            ) : (
                                <Typography>{group.name}</Typography>
                            )}
                            {editMode ? (
                                <div>
                                    <Tooltip title={<>{t('groupsModal.edit')}</>}>
                                        <EditIcon
                                            color="disabled"
                                            className={classes.edit}
                                            onClick={() => setCurrentlyEdited(group.name)}
                                        />
                                    </Tooltip>
                                    <Tooltip title={<>{t('groupsModal.delete')}</>}>
                                        <DeleteIcon color="disabled" onClick={() => openGroupsDeleteModal(group)} />
                                    </Tooltip>
                                </div>
                            ) : (
                                <ChevronRightIcon className={classes.icon} />
                            )}
                        </Box>
                    </Box>
                ))}
            </Grid>
        </>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            padding: theme.spacing(2, 0),
        },
        icon: {
            color: theme.palette.text.secondary,
        },
        edit: {
            marginRight: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);
