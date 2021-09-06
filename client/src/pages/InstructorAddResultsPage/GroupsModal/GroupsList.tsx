import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import {
    Box,
    createStyles,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { Assessment, Group } from '../../../graphql/types';
import { OutlinedTextField } from '../../../components/OutlinedTextField';

import { openGroupsDeleteModal } from './GroupsDeleteModal';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';
import { useAssessment } from '../../../operations/queries/Assessment/getAssessment';

interface GroupsListProps {
    assessment: Assessment;
}

export function GroupsList(props: GroupsListProps) {
    const [groupList, setGroupList] = useState<Group[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [currentlyEdited, setCurrentlyEdited] = useState('');
    const { updateAssessment, isUpdatePending } = useUpdateAssessment();
    const { refetchAssessment } = useAssessment(props.assessment._id);

    const { t } = useTranslation();

    useEffect(() => {
        setGroupList(props.assessment.groups);
    }, [props.assessment]);
    const classes = useStyles();

    const setGroupName = (id: string, name: string) => {
        setGroupList(groupList.map((group) => (group.group === id ? { ...group, name } : group)));
    };

    const sortedGroups = [...groupList].sort((a, b) => (a.group < b.group ? -1 : 1));

    return (
        <>
            <Grid container direction="column" alignItems="center" xs={12}>
                <Grid container direction="row" justify="space-between" alignItems="center" xs={12}>
                    <Typography variant="subtitle2">{t('groupsModal.group-name')}</Typography>
                    <Tooltip title={<>{t('groupsModal.edit-groups')}</>}>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setEditMode(!editMode);
                                setCurrentlyEdited('');
                            }}
                        >
                            <EditIcon color={editMode ? 'secondary' : 'disabled'} />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Box mt={2} />
                {sortedGroups.map((group, index) => (
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
                            {currentlyEdited === group.group ? (
                                <Box
                                    display="flex"
                                    width="60%"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <OutlinedTextField
                                        value={group.group}
                                        label={t('groupsModal.group-name').toString()}
                                        onChange={(value: string) => setGroupName(group.group, value)}
                                    />

                                    <Tooltip title={<>{t('groupsModal.save')}</>}>
                                        <IconButton size="small">
                                            <DoneIcon color="primary" className={classes.button} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={<>{t('groupsModal.close')}</>}>
                                        <IconButton size="small" onClick={() => setCurrentlyEdited('')}>
                                            <CloseIcon color="disabled" className={classes.button} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ) : (
                                <Typography>{group.group}</Typography>
                            )}
                            {editMode ? (
                                <div>
                                    <Tooltip title={<>{t('groupsModal.edit')}</>}>
                                        <IconButton
                                            size="small"
                                            disabled={isUpdatePending}
                                            onClick={() => setCurrentlyEdited(group.group)}
                                        >
                                            <EditIcon color="disabled" className={classes.edit} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={<>{t('groupsModal.delete')}</>}>
                                        <IconButton
                                            size="small"
                                            disabled={isUpdatePending}
                                            onClick={() => onGroupDelete(group)}
                                        >
                                            <DeleteIcon color="disabled" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            ) : (
                                <IconButton size="small">
                                    <ChevronRightIcon className={classes.icon} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                ))}
            </Grid>
        </>
    );

    function onGroupDelete(group: Group) {
        openGroupsDeleteModal(group).then((response) => {
            if (response.decision?.accepted) {
                updateAssessment(props.assessment._id, {
                    groups: sortedGroups
                        .filter((g) => g.group !== group.group)
                        .map(({ group: name, kindergartenId }) => ({ group: name, kindergartenId })),
                }).then(refetchAssessment);
            }
        });
    }
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
