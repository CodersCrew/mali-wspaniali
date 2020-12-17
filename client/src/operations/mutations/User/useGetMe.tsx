import { useQuery, gql } from '@apollo/client';
import { Me } from '../../../graphql/types';

export const GET_ME = gql`
    {
        me {
            date
            mail
            children {
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
            agreements {
                _id
                date
                text
                isSigned
            }
            role
            notifications {
                _id
                date
                values
                templateId
                isRead
            }
        }
    }
`;

export function useGetMe() {
    const { data, refetch } = useQuery<{ me: Me }>(GET_ME);

    return { user: data?.me, refetch };
}
