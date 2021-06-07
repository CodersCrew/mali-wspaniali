import { gql, useMutation } from '@apollo/client';
import { Child, UpdatedChildInput, Kindergarten } from '../../../graphql/types';
import { client } from '../../../apollo_client';
import { GET_ME, useGetMe } from './useGetMe';
import { useKindergartens } from '../../queries/Kindergartens/getKindergartens';

export interface EditChildResponse {
    status: boolean;
}

const EDIT_CHILD = gql`
    mutation editChild($child: UpdatedChildInput!) {
        editChild(child: $child) {
            status
        }
    }
`;

export function useEditChild() {
    const [editChild] = useMutation<EditChildResponse, { child: UpdatedChildInput }>(EDIT_CHILD);
    const { user } = useGetMe();
    const { kindergartenList } = useKindergartens();

    return {
        editChild: (update: UpdatedChildInput) => {
            const updatedKindergarten = kindergartenList?.find((k) => k._id === update.kindergartenId);

            if (!updatedKindergarten) return;

            return editChild({
                variables: {
                    child: update,
                },
            }).then(() => {
                if (!user || !kindergartenList) return;

                client.writeQuery({
                    query: GET_ME,
                    data: {
                        me: {
                            ...user,
                            children: user.children.map((c) => updateEditedChild(c, updatedKindergarten, update)),
                        },
                    },
                });
            });
        },
    };
}

function updateEditedChild(cachedChild: Child, kindergarten: Kindergarten, update: UpdatedChildInput) {
    // eslint-disable-next-line
    const { childId, kindergartenId, ...updatedChild } = update;

    if (cachedChild._id === childId) {
        return { ...cachedChild, ...updatedChild, kindergarten };
    }

    return cachedChild;
}
