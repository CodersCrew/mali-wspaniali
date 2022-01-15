import { useTranslation } from 'react-i18next';

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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { Assessment, AssessmentResult, Group } from '../../../graphql/types';
import { OutlinedTextField } from '../../../components/OutlinedTextField';

import { openGroupsDeleteModal } from './GroupsDeleteModal';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';
import { useAssessment } from '../../../operations/queries/Assessment/getAssessment';
import { GroupWithTransferList } from './GroupWithTransferList';
import { NoGroups } from './NoGroups';
import { useAssessments } from '../../../operations/queries/Assessment/getAllAssessments';
import { useAssessmentResults } from '../../../operations/queries/Results/getAssessmentResults';

interface GroupsListProps {
    assessment: Assessment;
    selectedKindergarten: string;
}

export function GroupsList(props: GroupsListProps) {
    const [groupList, setGroupList] = React.useState<Group[]>([]);
    const [editMode, setEditMode] = React.useState(false);
    const [currentlyEdited, setCurrentlyEdited] = React.useState('');
    const [groupTransferList, setGroupTransferList] = React.useState('');
    const { updateAssessment, isUpdatePending } = useUpdateAssessment();
    const { refetchAssessment } = useAssessment(props.assessment._id);
    const { assessments } = useAssessments({ withChildren: true });

    const { t } = useTranslation();

    React.useEffect(() => {
        setGroupList(props.assessment.groups);
    }, [props.assessment, props.selectedKindergarten]);
    const classes = useStyles();

    const setGroupName = (id: string, name: string) => {
        setCurrentlyEdited(name);
        setGroupList(groupList.map((group) => (group.group === id ? { ...group, group: name } : group)));
    };

    const sortedGroups = [...groupList]
        .filter((g) => g.kindergartenId === props.selectedKindergarten)
        .sort((a, b) => (a.group < b.group ? -1 : 1));

    const currentAssessment = assessments.find((a) => a._id === props.assessment._id);

    const currentChildren =
        currentAssessment?.kindergartens
            .filter((k) => !!k.kindergarten)
            .find((k) => k.kindergarten?._id === props.selectedKindergarten)?.kindergarten!.children || [];

    const { kindergartenResults } = useAssessmentResults(props.selectedKindergarten, props.assessment._id);

    if (!currentAssessment) return null;

    if (sortedGroups.length === 0) return <NoGroups />;

    return (
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
            {sortedGroups.map((group) => {
                const isGroupDisabled = isUpdatePending || areChildrenAssingedToGroup(group, kindergartenResults);

                return (
                    <Box key={group.group + group.kindergartenId} width="100%">
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
                                        options={{ autoFocus: true }}
                                    />
                                    <Tooltip title={<>{t('groupsModal.save')}</>}>
                                        <IconButton size="small" onClick={onGroupChange}>
                                            <DoneIcon color="primary" className={classes.button} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={<>{t('groupsModal.close')}</>}>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setCurrentlyEdited('');
                                                setGroupList(props.assessment.groups);
                                            }}
                                        >
                                            <CloseIcon color="disabled" className={classes.button} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ) : (
                                <GroupWithTransferList
                                    isOpen={groupTransferList === group.group}
                                    group={group}
                                    childrenList={currentChildren}
                                    results={kindergartenResults}
                                    assessmentId={currentAssessment._id}
                                />
                            )}
                            {editMode ? (
                                <div>
                                    <Tooltip title={<>{t('groupsModal.edit')}</>}>
                                        <IconButton
                                            size="small"
                                            disabled={isUpdatePending}
                                            onClick={() => setCurrentlyEdited(group.group)}
                                        >
                                            <EditIcon color={isUpdatePending ? 'disabled' : 'inherit'} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        title={
                                            <>
                                                {isGroupDisabled
                                                    ? t('groupsModal.group-with-children-message')
                                                    : t('groupsModal.delete')}
                                            </>
                                        }
                                    >
                                        <span>
                                            <IconButton
                                                size="small"
                                                disabled={isGroupDisabled}
                                                onClick={() => onGroupDelete(group)}
                                            >
                                                <DeleteIcon color={isGroupDisabled ? 'disabled' : 'inherit'} />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </div>
                            ) : (
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        setGroupTransferList((prev) => (prev === group.group ? '' : group.group))
                                    }
                                >
                                    {groupTransferList === group.group ? (
                                        <ChevronRightIcon className={classes.icon} />
                                    ) : (
                                        <ChevronLeftIcon className={classes.icon} />
                                    )}
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                );
            })}
        </Grid>
    );

    function onGroupDelete(group: Group) {
        openGroupsDeleteModal(group).then((response) => {
            if (!response.decision?.accepted) return;

            updateAssessment(props.assessment._id, {
                groups: props.assessment.groups
                    .filter((g) => {
                        if (g.group === group.group && g.kindergartenId === group.kindergartenId) return false;

                        return true;
                    })
                    .map(({ group: name, kindergartenId }) => ({ group: name, kindergartenId })),
            }).then(refetchAssessment);
        });
    }

    function onGroupChange() {
        updateAssessment(props.assessment._id, {
            groups: groupList.map(({ group: name, kindergartenId }) => ({ group: name, kindergartenId })),
        })
            .then(refetchAssessment)
            .then(() => setCurrentlyEdited(''));
    }

    function areChildrenAssingedToGroup(group: Group, results: AssessmentResult[]) {
        return !!results.find((r) => r.firstMeasurementGroup === group.group);
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
        button: {
            margin: theme.spacing(1),
        },
    }),
);
