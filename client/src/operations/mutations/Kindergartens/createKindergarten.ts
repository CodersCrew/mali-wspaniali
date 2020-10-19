import { gql, useMutation } from '@apollo/client';
import { AddKindergartenInput } from '../../../graphql/kindergartensRepository';

export const CREATE_KINDERGARTEN = gql`
    mutation createKindergarten($kindergarten: CreateKindergartenInput!) {
        createKindergarten(kindergarten: $kindergarten) {
            name
        }
    }
`;

export const useCreateKindergarten = () => {
    const [createKindergarten, { data }] = useMutation<AddKindergartenInput>(CREATE_KINDERGARTEN, {
        update(cache, { data: newKindergarten }) {
            cache.modify({
                fields: {
                    kindergartens(existingKindergartens = []) {
                        return [...existingKindergartens, { ...newKindergarten, __typename: 'KindergartenDTO' }];
                    },
                },
            });
        },
    });

    return { createKindergarten, created: data };
};
