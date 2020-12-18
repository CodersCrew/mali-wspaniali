import { gql, useMutation } from '@apollo/client';
import { ApolloError } from 'apollo-boost';
import { Child, ChildInput } from '../../../graphql/types';
import { useGetMe } from './useGetMe';

interface AddChildReturn {
    addChild: (props: ChildInput) => void;
    error: ApolloError | undefined;
}

export const ADD_CHILD = gql`
    mutation addChild($child: ChildInput!) {
        addChild(child: $child) {
            _id
            firstname
            lastname
            sex
            birthYear
            birthQuarter
            results {
                _id
                date
                test
                rootResultId
            }
            kindergarten {
                _id
                name
                number
            }
        }
    }
`;

export function useAddChild(): AddChildReturn {
    const [mutate, { error }] = useMutation<{ addChild: Child }>(ADD_CHILD);
    const { refetch } = useGetMe();

    return {
        addChild: (props: ChildInput) => {
            mutate({
                variables: {
                    child: props,
                },
            }).then(() => {
                refetch();
            });
        },
        error,
    };
}
