import { ageGroups } from './constants';

export const getAgeGroup = (age: number) => {
    const ageGroup = ageGroups.find(group => age >= group.min && age <= group.max);

    return ageGroup ? `${ageGroup.min}-${ageGroup.max}` : '';
};
