import { useMutation } from '@apollo/client';
import { CREATE_KINDERGARTEN, AddKindergartenInput } from '../../../graphql/kindergartensRepository';

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
