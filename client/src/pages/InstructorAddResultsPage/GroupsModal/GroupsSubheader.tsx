import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import { Grid, Typography, Box } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { useIsDevice } from '../../../queries/useBreakpoints';
import { Assessment, Group } from '../../../graphql/types';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';

import { openGroupsModal } from './GroupsModal';
import { GroupsChip } from './GroupsChip';

interface GroupsSubheaderProps {
    selectedKindergarten: string;
    selectedAssessment: string;
    assessments: Assessment[];
    onChange: (type: string, value: string) => void;
}
export function GroupsSubheader(props: GroupsSubheaderProps) {
    const [groups, setGroups] = useState<Group[]>([]);
    const currentAssessment = props.assessments.find((a) => a._id === props.selectedAssessment);
    const [selectedGroup, setSelectedGroup] = useState('unassigned');
    const toggleOrSelect = (groupId: string) => {
        if (selectedGroup === groupId) {
            setSelectedGroup('');
            props.onChange('group', '');
        } else {
            setSelectedGroup(groupId);
            props.onChange('group', groupId);
        }
    };

    const { t } = useTranslation();

    useEffect(() => {
        if (currentAssessment) {
            setGroups(currentAssessment.groups);
        }
    }, [currentAssessment]); // to be deleted
    const device = useIsDevice();

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            wrap="wrap"
            justify={device.isSmallMobile ? 'flex-start' : 'space-between'}
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
                    selected={selectedGroup === 'unassigned'}
                />
                {groups.map((group) => (
                    <Box key={group.group} display="inline">
                        <Box display="inline-block" mb={1}>
                            <GroupsChip
                                key={group.group}
                                label={group.group}
                                onClick={() => toggleOrSelect(group.group)}
                                selected={selectedGroup === group.group}
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
        openGroupsModal({
            ...props,
            assessment: props.assessments.find((a) => a._id === props.selectedAssessment),
        });
    }
}
