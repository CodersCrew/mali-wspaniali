import { gql, useMutation } from '@apollo/client';
import { ApolloError } from 'apollo-boost';
import { ChildInput } from '../../../graphql/types';

interface AddChildReturn {
    addChild: (props: ChildInput) => void;
    error: ApolloError | undefined;
}

export const ADD_CHILD = gql`
    mutation addChild($child: ChildInput!) {
        addChild(child: $child) {
            status
        }
    }
`;

export function useAddChild(): AddChildReturn {
    const [mutate, { error }] = useMutation<ChildInput>(ADD_CHILD);

    return {
        addChild: (props: ChildInput) => {
            mutate({
                variables: props,
            });
        },
        error,
    };
}
