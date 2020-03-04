import { useEffect, useState } from 'react';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const useSubscribed = <T>(
  action: (callback: OnSnapshotCallback<T>) => void,
  ifEmpty: null | [] = null,
) => {
  const [state, setState] = useState<T | typeof ifEmpty>(ifEmpty);

  useEffect(() => {
    action((data: T) => {
      if (data) {
        setState(data);
      }
    });
  }, [action]);

  return state;
};
