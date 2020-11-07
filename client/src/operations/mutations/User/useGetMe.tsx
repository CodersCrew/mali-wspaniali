import { useQuery } from '@apollo/client';
import { GET_ME } from '../../../graphql/userRepository';
import { Me } from '../../../graphql/types';

export function useGetMe() {
    const { data } = useQuery<{ me: Me }>(GET_ME);


    return { user: data?.me }
}