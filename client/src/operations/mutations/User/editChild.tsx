import { gql, useMutation } from '@apollo/client';
import { UpdatedChildInput } from '../../../graphql/types';
import { client } from '../../../apollo_client';
import { GET_ME } from '../../../graphql/userRepository';
import { useGetMe } from './useGetMe';
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
            editChild({
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
                            children: user.children.map(c => {
                                const { childId, kindergartenId, ...child } = update;

                                if (c._id === childId) {
                                    const newKindergarten = kindergartenList.find(k => k._id === kindergartenId);

                                    if (newKindergarten) {
                                        return { ...c, ...child, kindergarten: newKindergarten };
                                    }

                                    return { ...c, ...child };
                                }

                                return c;
                            }),
                        },
                    },
                });
            });
        },
    };
}
