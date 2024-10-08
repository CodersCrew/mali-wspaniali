import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Box } from '@material-ui/core';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { MeasurementEditorActionType } from '@app/pages/InstructorResultCreatorPage/InstructorResultCreatorPage.types';
import { useIsDevice } from '@app/queries/useBreakpoints';
import { Assessment, Group } from '@app/graphql/types';
import { ButtonSecondary } from '@app/components/Button';

import { openGroupsModal } from './GroupsModal';
import { GroupsChip } from './GroupsChip';

interface GroupsSubheaderProps {
    selectedKindergarten: string;
    selectedAssessment: string;
    selectedGroup: string;
    assessments: Assessment[];
    onChange: (type: string, value: string) => void;
}
export function GroupsSubheader(props: GroupsSubheaderProps) {
    const [groups, setGroups] = useState<Group[]>([]);
    const currentAssessment = props.assessments.find((a) => a._id === props.selectedAssessment);
    const toggleOrSelect = (groupId: string) => {
        props.onChange(MeasurementEditorActionType.GROUP, props.selectedGroup === groupId ? '' : groupId);
    };

    const { t } = useTranslation();

    useEffect(() => {
        if (currentAssessment) {
            setGroups(currentAssessment.groups);
        }
    }, [currentAssessment]);
    const device = useIsDevice();

    const activeGroups = selectGroupsFromKindergarten(groups);

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            wrap="wrap"
            justifyContent={device.isSmallMobile ? 'flex-start' : 'space-between'}
        >
            {device.isDesktop && (
                <Grid item xs={1}>
                    <Typography variant="subtitle1">{t('groupsModal.groups')}</Typography>
                </Grid>
            )}
            <Grid item xs={12} md={9}>
                <GroupsChip
                    label={t('groupsModal.unassigned')}
                    onClick={() => toggleOrSelect('unassigned')}
                    selected={props.selectedGroup === 'unassigned'}
                />
                {activeGroups.map((group) => (
                    <Box key={group.group} display="inline">
                        <Box display="inline-block" mb={1}>
                            <GroupsChip
                                key={group.group}
                                label={group.group}
                                onClick={() => toggleOrSelect(group.group)}
                                selected={props.selectedGroup === group.group}
                            />
                        </Box>
                    </Box>
                ))}
            </Grid>
            {device.isDesktop && (
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="flex-end">
                        <ButtonSecondary
                            aria-label="groups"
                            variant="contained"
                            startIcon={<PermIdentityIcon />}
                            innerText={t('groupsModal.groups')}
                            onClick={onGroupClicked}
                        />
                    </Box>
                </Grid>
            )}
        </Grid>
    );

    function onGroupClicked() {
        // eslint-disable-next-line no-void
        void openGroupsModal({
            ...props,
            assessment: props.assessments.find((a) => a._id === props.selectedAssessment),
        });
    }

    function selectGroupsFromKindergarten(groupList: Group[]) {
        return groupList.filter((g) => g.kindergartenId === props.selectedKindergarten);
    }
}
