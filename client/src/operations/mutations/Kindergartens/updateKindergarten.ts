import { gql, useMutation } from '@apollo/client';
import { AddKindergartenInput } from '../../../graphql/kindergartensRepository';

export const UPDATE_KINDERGARTEN = gql`
    mutation updateKindergarten($id: String!, $kindergarten: EditKindergartenInput!) {
        updateKindergarten(id: $id, kindergarten: $kindergarten) {
            _id
            name
            number
            address
            city
        }
    }
`;

export const useUpdateKindergarten = () => {
    const [updateKindergarten, { data }] = useMutation<AddKindergartenInput>(UPDATE_KINDERGARTEN);

    return { updateKindergarten, updated: data };
};
