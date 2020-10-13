import { useMutation } from '@apollo/client';
import { UPDATE_KINDERGARTEN, AddKindergartenInput } from '../../../graphql/kindergartensRepository';

export const useUpdateKindergarten = () => {
    const [updateKindergarten, { data }] = useMutation<AddKindergartenInput>(UPDATE_KINDERGARTEN);

    return { updateKindergarten, updated: data };
};
