import { Kindergarten } from '../../graphql/types';

export const mapKindergartenToOption = (kindergarten: Kindergarten) => {
    return {
        value: kindergarten._id,
        label: `nr. ${kindergarten.number}, ${kindergarten.name}`,
        helperLabel: `${kindergarten.address}  ${kindergarten.city}`,
    };
};
