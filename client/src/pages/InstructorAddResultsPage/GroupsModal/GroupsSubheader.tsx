import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import { Grid, Typography, Box } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { useIsDevice } from '../../../queries/useBreakpoints';
import { Assessment, Group } from '../../../graphql/types';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';

import { openGroupsModal } from './GroupsModal';
import { GroupsChip } from './GroupsChip';

interface Props {
    selectedKindergarten: string;
    selectedAssessment: string;
    assessments: Assessment[];
    onChange: (type: string, value: string) => void;
}
export function GroupsSubheader(props: Props) {
    const [groups, setGroups] = useState<Group[]>([]);
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
        setGroups([
            { _id: '123', name: 'motylki', instructor: null, kindergarten: null },
            { _id: '124', name: 'kotki', instructor: null, kindergarten: null },
        ]);
    }, []); // to be deleted
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
                {groups.map((group, index) => (
                    <GroupsChip
                        key={index}
                        label={group.name}
                        onClick={() => toggleOrSelect(group._id)}
                        selected={selectedGroup === group._id}
                    />
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
                            onClick={() => openGroupsModal({ ...props })}
                        />
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}
