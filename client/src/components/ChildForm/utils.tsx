import { Kindergarten } from '../../graphql/types';

export const mapKindergartenToOption = (kindergarten: Kindergarten) => {
    return {
        value: kindergarten._id,
        label: (
            <div>
                <div>
                    nr. {kindergarten.number}, {kindergarten.name}
                </div>
                <div style={{ color: '#bdbdbd', marginLeft: 8 }}>{kindergarten.address}</div>
            </div>
        ),
        helperLabel: kindergarten.address,
    };
};
