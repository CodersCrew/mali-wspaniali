import { gql } from '@apollo/client';

import { KeyCode } from './types';

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
