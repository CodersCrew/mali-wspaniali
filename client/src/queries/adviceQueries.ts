import { firebase } from '../firebase/firebase';
import { OnSnapshotCallback } from '../firebase/userRepository';
import { Advice } from '../firebase/types';
import { getAgeGroup } from './utils';

export const getAdviceByResultAndAge = async (result: string, age: number, callback: OnSnapshotCallback<Advice>) => {
    const ageGroup = getAgeGroup(age);

    firebase.advice.getAdviceByResultAndAge(result, ageGroup, callback);
};

export const getAdviceByResult = async (result: string, callback: OnSnapshotCallback<Advice>) => {
    firebase.advice.getAdviceByResult(result, callback);
};
