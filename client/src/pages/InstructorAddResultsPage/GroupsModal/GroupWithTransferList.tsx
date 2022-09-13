import { Typography } from '@material-ui/core';

import { AssessmentResult, Child, Group } from '../../../graphql/types';
import { GroupsTransferList } from './GroupsTransferList';

export function GroupWithTransferList({
    isOpen,
    group,
    childrenList,
    results,
    assessmentId,
}: {
    isOpen: boolean;
    group: Group;
    childrenList: Child[];
    results: AssessmentResult[];
    assessmentId: string;
}) {
    return isOpen ? (
        <GroupsTransferList group={group} childrenList={childrenList} results={results} assessmentId={assessmentId} />
    ) : (
        <Typography>{group.group}</Typography>
    );
}
