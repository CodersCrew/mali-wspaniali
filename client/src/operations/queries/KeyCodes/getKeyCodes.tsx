import { gql, useLazyQuery } from '@apollo/client';

import { KeyCode } from '../../../graphql/types';

interface KeyCodeResponse {
    keyCodes: KeyCode[];
}

const KEYCODES = gql`
    query KeyCodes($series: String!) {
        keyCodes(series: $series) {
            id
            date
            createdBy
            keyCode
            target
        }
    }
`;

export function useKeyCodes() {
    const [getKeyCodeSeries, { data }] = useLazyQuery<KeyCodeResponse>(KEYCODES);

    return {
        getKeyCodes: (series: string) => {
            getKeyCodeSeries({
                variables: {
                    series,
                },
            });
        },
        keyCodes: data?.keyCodes || [],
    };
}
