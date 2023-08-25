import { gql, useLazyQuery } from '@apollo/client';

import { useEffect, useMemo, useState } from 'react';
import { KeyCode } from '@app/graphql/types';

interface KeyCodeResponse {
    keyCodes: KeyCode[];
}

const KEYCODES = gql`
    query KeyCodes($series: String!) {
        keyCodes(series: $series) {
            _id
            createdAt
            createdBy
            keyCode
            target
        }
    }
`;

export function useKeyCodes() {
    const [getKeyCodeSeries, { data }] = useLazyQuery<KeyCodeResponse>(KEYCODES);

    const [keyCodeSeries, setKeyCodeSeries] = useState<string>('');

    const getKeyCodes = (series: string) => {
        getKeyCodeSeries({
            variables: {
                series,
            },
        });
    };

    const keyCodes = useMemo(() => data?.keyCodes || [], [data]);

    useEffect(() => {
        if (keyCodeSeries) {
            getKeyCodes(keyCodeSeries);
            setKeyCodeSeries(() => '');
        }
    }, [keyCodeSeries]);

    return {
        getKeyCodes,
        keyCodes,
        setKeyCodeSeries,
    };
}
