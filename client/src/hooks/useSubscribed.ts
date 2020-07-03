import { useEffect, useState } from 'react';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const useSubscribed = <T, P = []>(
    action: (callback: OnSnapshotCallback<T>) => void,
    ifEmpty: null | [] = null,
    param: P[] = [],
) => {
    const [state, setState] = useState<T | typeof ifEmpty>(ifEmpty);

    useEffect(() => {
        action((data: T) => {
            if (data) {
                setState(data);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, param);

    return state;
};
