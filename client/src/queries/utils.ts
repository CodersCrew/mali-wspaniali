import { ageGroups } from './constants';

export type GetAgeGroup = (age: number) => string;

export const getAgeGroup: GetAgeGroup = (age) => {
    const ageGroup = ageGroups.find((group) => age >= group.min && age <= group.max);

    return ageGroup ? `${ageGroup.min}-${ageGroup.max}` : '';
};
