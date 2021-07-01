import { gql, useMutation } from '@apollo/client';

import { KeyCode } from '../../../graphql/types';

export interface CreateKeyCodeSeriesResponse {
    createKeyCodeBulk: KeyCode[];
}

export const CREATE_KEYCODES = gql`
    mutation createKeyCodeBulk($target: String!, $amount: Int!) {
        createKeyCodeBulk(target: $target, amount: $amount) {
            _id
            createdAt
            createdBy
            target
            series
            keyCode
        }
    }
`;

export function useCreateKeyCodes() {
    const [createKeyCodes, { data }] = useMutation<CreateKeyCodeSeriesResponse>(CREATE_KEYCODES, {
        update(cache, { data: newKeyCodeResponse }) {
            if (newKeyCodeResponse) {
                const newKeyCode = newKeyCodeResponse.createKeyCodeBulk[0];

                cache.modify({
                    fields: {
                        keyCodeSeries(keycodes = []) {
                            return [...keycodes, { ...newKeyCode, __typename: 'KeyCodeSeriesDTO' }];
                        },
                    },
                });
            }
        },
    });

    return { createKeyCodes, created: data?.createKeyCodeBulk[0] };
}
