import { Typography } from '@material-ui/core';

import { Group } from '../../../graphql/types';
import { GroupsTransferList } from './GroupsTransferList';

export function GroupWithTransferList({ isOpen, group }: { isOpen: boolean; group: Group }) {
    return isOpen ? <GroupsTransferList group={group} /> : <Typography>{group.group}</Typography>;
}
