import { Typography } from '@material-ui/core';

import { AssessmentResult, Child, Group } from '../../../graphql/types';
import { GroupsTransferList } from './GroupsTransferList';

export function GroupWithTransferList({
    isOpen,
    group,
    childrenList,
    results,
}: {
    isOpen: boolean;
    group: Group;
    childrenList: Child[];
    results: AssessmentResult[];
}) {
    return isOpen ? (
        <GroupsTransferList group={group} childrenList={childrenList} results={results} />
    ) : (
        <Typography>{group.group}</Typography>
    );
}
