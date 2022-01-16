import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { KeyCode } from '@app/graphql/types';

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
    const [created, setCreated] = useState<KeyCode | undefined>();

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

    useEffect(() => {
        setCreated(data?.createKeyCodeBulk[0]);
    }, [data]);

    return { createKeyCodes, created, resetCreated: () => setCreated(undefined) };
}
