import { gql } from '@apollo/client';

import { KeyCode, KeyCodeSeries } from './types';

export interface KeyCodeResponse {
    keyCodes: KeyCode[];
}

export const KEYCODES = gql`
    query KeyCodes($series: String!) {
        keyCodes(series: $series) {
            id
            date
            createdBy
            keyCode
        }
    }
`;

export interface KeyCodeSeriesResponse {
    keyCodeSeries: KeyCodeSeries[];
}

export const KEYCODE_SERIES = gql`
    {
        keyCodeSeries {
            date
            series
            target
            count
        }
    }
`;

export const CREATE_KEYCODES = gql`
    mutation createKeyCodeBulk($target: String!, $amount: Int!) {
        createKeyCodeBulk(target: $target, amount: $amount) {
            date
            keyCode
            series
        }
    }
`;
